"use client";

import React, { useState } from "react";
import { User } from "@/types/all";

// Define the Team type
type Team = {
  id: string;
  members: {
    id: string;
    name: string;
    email: string;
  }[];
};

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [activeView, setActiveView] = useState<"users" | "teams" | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * --- 1. Reusable Fetch Handler ---
   * This function abstracts the common logic for fetching data,
   * handling loading states, and managing errors gracefully by
   * setting the data to an empty array on failure.
   */
  const handleFetch = async (
    view: "users" | "teams",
    apiUrl: string,
    setData: React.Dispatch<React.SetStateAction<User[]>> | React.Dispatch<React.SetStateAction<Team[]>>
  ) => {
    setActiveView(view);
    setIsLoading(true);
    setData([]); // Clear previous data immediately

    try {
      const res = await fetch(apiUrl);
      if (!res.ok) {
        // If response is not OK, we'll fall through to the finally block
        // with an empty array, achieving the desired "not found" state.
        throw new Error(`Failed to fetch ${view}`);
      }
      const data = await res.json();
      setData(data);
    } catch (error) {
      console.log(error);
      // Data is already set to [] so the UI will show the "not found" message.
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUsers = () => handleFetch("users", "/api/users", setUsers);
  const fetchTeams = () => handleFetch("teams", "/api/teams", setTeams);

  /**
   * --- 2. Simplified Content Rendering ---
   * This function uses a switch statement for clarity and scalability.
   * It handles the loading state first, then renders content based on the active view.
   */
  const renderContent = () => {
    if (isLoading) {
      return <p className="text-center">Loading...</p>;
    }

    switch (activeView) {
      case "users":
        return users.length > 0 ? (
          <ul className="space-y-2">
            {users.map((user) => (
              <li key={user.email} className="bg-gray-700 p-2 rounded">
                {user.name} ({user.email})
              </li>
            ))}
          </ul>
        ) : (
          <p className="bg-gray-700 p-2 rounded">No users found.</p>
        );

      case "teams":
        return teams.length > 0 ? (
          <ul className="space-y-4">
            {teams.map((team) => (
              <li key={team.id} className="bg-gray-800 p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2">Team ID: {team.id}</h3>
                <ul className="space-y-1 pl-4">
                  {team.members.map((member) => (
                    <li key={member.id} className="text-sm bg-gray-700 p-2 rounded">
                      {member.name} ({member.email})
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <h1 className="bg-gray-700 p-2 rounded text-2xl">No teams found.</h1>
        );

      default:
        return <p className="text-center text-gray-400">Select a view to see data</p>;
    }
  };

  return (
    <section className="h-screen flex flex-col p-10">
      <div className="w-full flex justify-center">
        <h1 className="text-white text-4xl font-semibold">Admin Dashboard</h1>
      </div>
      <div className="flex w-full justify-around pt-10">
        <button onClick={fetchTeams} className="bg-white px-4 py-2 rounded-md font-medium">
          Show Teams
        </button>
        <button onClick={fetchUsers} className="bg-white px-4 py-2 rounded-md font-medium">
          Show Users
        </button>
      </div>

      <div className="mt-10 text-white">
        {activeView === "users" && <h2 className="text-2xl mb-4">User List</h2>}
        {activeView === "teams" && <h2 className="text-2xl mb-4">Team List</h2>}
        {renderContent()}
      </div>
    </section>
  );
}