"use client";
import React, { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import {
  createTeamMaps,
  getAllTeams,
  submitUnstopTeams,
} from "@/lib/services/admin";
import { EventTeam, UnstopData } from "@/types/admin";
import Link from "next/link";
import Papa from "papaparse";

function Page() {
  const { eventSlug } = useParams();
  const router = useRouter();
  const [teams, setTeams] = useState<EventTeam[]>([]);
  const [newTeams, setNewTeams] = useState<EventTeam[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [csvData, setCsvData] = useState<UnstopData[]>();
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    if (
      !event.target.files ||
      event.target.files.length <= 0 ||
      !event.target.files[0].type.endsWith("csv")
    ) {
      alert("Invalid file");
      return;
    }
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        if (!Array.isArray(results.data)) return;
        setCsvData(results.data as UnstopData[]);
      },
    });
  };

  const filteredTeams = teams.filter((team) =>
    team.teamName?.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = () => {
    if (!csvData) {
      alert("No CSV Data found!");
      return;
    }
    createTeamMaps(csvData)
    .then((res) => {
      if(!res){
        alert("Error occurred while mapping teams");
        return;
      }
      const {teamNameMap, teamMembersMap} = res;
      const teams: EventTeam[] = [];
      teamMembersMap.forEach((members, id) => {
        const teamName = teamNameMap.get(id);
        if (!teamName) return;
        const fullTeam = {
          teamName,
          members,
          eventSlug: eventSlug?.toString() ?? "",
          id
        };
        teams.push(fullTeam);
      });
      setNewTeams(teams);
      setShowModal(true);
    })
  };

  const submitNewTeams = () => {
    if (!eventSlug) return;
    setSubmitting(true);
    submitUnstopTeams(newTeams)
      .then((res) => {
        alert(`Success: ${res}`);
        setShowModal(false);
        // Refresh teams list
        getAllTeams(eventSlug.toString()).then(data => setTeams(data));
      })
      .catch((err: unknown) => {
        alert(`Error occurred while submitting: ${err}`);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  useEffect(() => {
    if (!eventSlug) return;
    async function fetchTeams() {
      if (!eventSlug || typeof eventSlug !== "string") return;
      try {
        const data = await getAllTeams(eventSlug);
        setTeams(data);
      } catch (error) {
        console.error("Failed to fetch teams:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTeams();
  }, []);

  return (
    <div className="bg-indigo min-h-screen border-b border-b-white/50 pt-28 pb-10 flex flex-col items-center">
      <div className="flex items-center justify-between mb-6 w-4/5">
        <button
          onClick={() => {
            signOut({ redirect: false });
            router.push("/");
          }}
          className="p-3 rounded-lg bg-red-500 cursor-pointer"
        >
          Logout
        </button>
        <Link
          href={"/admin"}
          className="text-white text-lg underline underline-offset-2"
        >
          Payments Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-white uppercase">
          {eventSlug?.toString()} Dashboard
        </h1>
        <input
          type="text"
          placeholder="Search by name, team name or event"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 text-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex w-4/5 justify-between items-center">
        <div className="flex gap-x-3 items-center my-5">
          <label
            className="block text-sm font-medium text-white"
            htmlFor="registrations_csv"
          >
            Upload file
          </label>
          <input
            className="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 p-2"
            id="registrations_csv"
            type="file"
            onChange={handleFileChange}
          />
        </div>

        <button
          className="bg-lavender px-2 py-1 rounded-sm h-fit cursor-pointer"
          onClick={() => handleSubmit()}
        >
          Upload registration data
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex gap-4 bg-white/60 p-3 rounded-t-lg border-2 font-bold">
          <p className="w-70">Team Name</p>
          <p className="w-72">Members</p>
        </div>

        {filteredTeams.map((team, index) => (
          <div
            key={index}
            className="bg-white/20 backdrop-blur-md rounded-xl p-4 flex items-center justify-between text-white shadow-md hover:shadow-lg transition w-full hover:bg-white/30 cursor-pointer"
          >
            {/* User info row */}
            <div className="flex flex-row flex-wrap gap-6 items-center">
              <p className="font-bold w-32">{team.teamName}</p>
              {team.members.map((member) => (
                <div key={member.email}>
                  <p>{member.name}</p>
                  <p>{member.email}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {filteredTeams.length === 0 && !loading && (
          <p className="text-white mt-4">No teams found.</p>
        )}

        {loading && <p className="text-white mt-4">Loading, please wait!</p>}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-indigo rounded-lg shadow-xl w-4/5 max-h-[80vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-white/20">
              <h2 className="text-2xl font-bold text-white">Review New Teams</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-white hover:text-gray-300 text-3xl leading-none"
              >
                X
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="flex flex-col gap-2">
                <div className="flex gap-4 bg-white/60 p-3 rounded-t-lg border-2 font-bold">
                  <p className="w-70">Team Name</p>
                  <p className="w-72">Members</p>
                </div>

                {newTeams.map((team, index) => (
                  <div
                    key={index}
                    className="bg-white/20 backdrop-blur-md rounded-xl p-4 flex items-center justify-between text-white shadow-md hover:shadow-lg transition w-full hover:bg-white/30"
                  >
                    <div className="flex flex-row flex-wrap gap-6 items-center">
                      <p className="font-bold w-32">{team.teamName}</p>
                      {team.members.map((member) => (
                        <div key={member.email}>
                          <p>{member.name}</p>
                          <p>{member.email}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {newTeams.length === 0 && (
                  <p className="text-white mt-4">No teams to display.</p>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-white/20 flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 rounded-lg bg-gray-500 text-white cursor-pointer hover:bg-gray-600"
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                onClick={submitNewTeams}
                className="px-6 py-2 rounded-lg bg-green-500 text-white cursor-pointer hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit Teams"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;