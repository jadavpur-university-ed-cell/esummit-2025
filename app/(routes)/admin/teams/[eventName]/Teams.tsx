"use client";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import ExportCSV from "./ExportCSV";
import Link from "next/link";
import clsx from "clsx";
import DeleteTeam from "./DeleteTeam";
import EditTeam from "./EditTeam";

function ShowUserData({ team, eventName }: { team: any; eventName: string }) {
	// console.log(team);
	return (
		<>
			<div className="w-2/3 rounded-xl my-4 p-4 bg-[#17212e]">
				<div className="flex justify-between px-[3%] mb-3">
					<h2 className="text-2xl text-[#eae2b7]">{team.teamName}</h2>
					<div className="flex gap-5 items-center">
						{/* ADD FUNCTIONALITY TO EDIT TEAM BUTTON */}
						<EditTeam
							teamId={team.teamId}
							eventName={eventName}
							teamName={team.teamName}
						/>
						<DeleteTeam teamId={team.teamId} />
					</div>
				</div>
				<div className="text-white px-6 flex flex-col">
					<p className="grid grid-cols-3 bg-[#10182288] py-1 px-2 text-center">
						<span>{team.member1.name}</span>
						<span>{team.member1.email}</span>
						<span>{team.member1.phone}</span>
					</p>
					{team.member2 && (
						<p className="grid grid-cols-3 px-2 py-1 text-center">
							<span>{team.member2?.name}</span>
							<span>{team.member2?.email}</span>
							<span>{team.member2?.phone}</span>
						</p>
					)}
					{team.member3 && (
						<p className="grid grid-cols-3 px-2 py-1 bg-[#10182288] text-center">
							<span>{team.member3?.name}</span>
							<span>{team.member3?.email}</span>
							<span>{team.member3?.phone}</span>
						</p>
					)}
					{team.member4 && (
						<p className="grid grid-cols-3 px-2 py-1 text-center">
							<span>{team.member4?.name}</span>
							<span>{team.member4?.email}</span>
							<span>{team.member4?.phone}</span>
						</p>
					)}
				</div>
			</div>
		</>
	);
}

function filterSearchResults(searchVal: string, searchBy: string, teams: any) {
	let filteredArr;
	if (searchBy === "team") {
		filteredArr = teams.filter((team: any) => {
			if (team.teamName.toLowerCase().includes(searchVal.toLowerCase()))
				return team;
		});
	} else if (searchBy === "member") {
		filteredArr = teams.filter((team: any) => {
			if (
				team.member1.name.toLowerCase().includes(searchVal.toLowerCase()) ||
				(team.member2 &&
					team.member2.name.toLowerCase().includes(searchVal.toLowerCase())) ||
				(team.member3 &&
					team.member3.name.toLowerCase().includes(searchVal.toLowerCase())) ||
				(team.member4 &&
					team.member4.name.toLowerCase().includes(searchVal.toLowerCase()))
			)
				return team;
		});
	}
	return filteredArr;
}

function Teams({ teams, title }: { teams: any; title: string }) {
	const [arr, setArr] = useState(teams);
	const [searchVal, setSearchVal] = useState("");
	const [searchBy, setSearchBy] = useState("member");
	function handleFormSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (searchVal === "") {
			setArr(teams);
			return;
		}
		const filteredArr = filterSearchResults(searchVal, searchBy, teams);
		setArr(filteredArr);
	}
	return (
		<>
			<main className="py-[10vh] flex flex-col items-center">
				<h1 className="text-white text-5xl font-medium">{title}</h1>
				<div className="w-3/5 grid grid-cols-4 gap-x-4 my-[6vh]">
					<div className="col-span-1 text-lg text-white bg-[#192331] rounded-xl px-2 py-6 flex flex-col items-center">
						<h3 className="mb-2 text-center">
							<span className="text-2xl font-medium"> {teams.length} </span>
							Teams
						</h3>
						<Link
							href="/admin/teams/createTeam"
							target="_blank"
							className="bg-[#101720] px-2 py-1 rounded-[4px]">
							Add Team
						</Link>
					</div>
					<div className="col-span-1 text-lg text-white bg-[#192331] rounded-xl px-2 py-6 flex flex-col items-center justify-around">
						<h2>Export as CSV</h2>
						<ExportCSV data={teams} fileName={`${title}.csv`} />
					</div>
					<div className="col-span-2 bg-[#192331] flex flex-col items-center p-4 rounded-xl justify-around">
						<form
							className="flex w-full justify-center rounded-xl"
							onSubmit={(e) => handleFormSubmit(e)}
							autoComplete="off">
							<input
								type="text"
								name="searchVal"
								id="searchVal"
								autoComplete="off"
								placeholder="Search"
								className="w-full bg-[#101720] px-2 py-1 text-gray-400 placeholder:font-light outline-none"
								value={searchVal}
								onChange={(e) => setSearchVal(e.target.value)}
							/>
							<button
								type="submit"
								className="px-2 text-white font-extralight bg-[#101720]">
								<FaSearch />
							</button>
						</form>
						<div className="flex gap-x-3 items-center">
							<p className="text-white">Search by: </p>
							<button
								type="submit"
								className={clsx(
									"py-2 px-3 text-sm text-white rounded-full",
									{ "bg-[#101720]": searchBy === "member" },
									{ "bg-[rgba(16,23,32,0.46)]": searchBy === "team" }
								)}
								onClick={() => setSearchBy("member")}>
								Member Name
							</button>
							<button
								type="submit"
								className={clsx(
									"py-2 px-3 text-sm text-white rounded-full",
									{ "bg-[#101720]": searchBy === "team" },
									{ "bg-[#10172074]": searchBy === "member" }
								)}
								onClick={() => setSearchBy("team")}>
								Team Name
							</button>
						</div>
					</div>
				</div>
				<div className="flex justify-start w-3/5">
					<button
						className={clsx(
							"bg-[#192331] text-white px-3 py-2 text-sm font-light rounded-[3px]",
							{ hidden: arr === teams }
						)}
						onClick={() => {
							setArr(teams);
							setSearchVal("");
						}}>
						Clear Search Results
					</button>
				</div>
				<div className="w-11/12 flex flex-col items-center">
					{arr.map((team: any, ind: number) => (
						<ShowUserData team={team} key={ind} eventName={title} />
					))}
				</div>
			</main>
		</>
	);
}

export default Teams;