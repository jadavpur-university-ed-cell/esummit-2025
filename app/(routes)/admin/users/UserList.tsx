"use client";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import UserDetails from "./UserDetails";
import clsx from "clsx";
import {User} from "@/lib/types";

function UserList({ users }: { users: User[] }) {

	const [searchVal, setSearchVal] = useState("");
	const [displayedUsers , setDisplayedUsers] = useState(users);
	
	function handleFormSubmit(e: React.FormEvent) {
		e.preventDefault();
		if(searchVal===""){ 
			setDisplayedUsers(users);
			return;
		}
		const filteredArr = users.filter((user:User)=>{
			if(user.name.toLowerCase().includes(searchVal.toLowerCase()))
				return user;
		})
		setDisplayedUsers(filteredArr);
	}

	return (
		<>
			<div className="w-full flex flex-col gap-y-6 mt-5">
				<div className="w-full flex justify-center">
					<form
						className="flex rounded-xl"
						onSubmit={(e) => handleFormSubmit(e)}
						autoComplete="off">
						<input
							type="text"
							name="searchVal"
							id="searchVal"
							autoComplete="off"
							placeholder="Search"
							className="w-full bg-[#1a2534] px-2 py-1 text-gray-400 placeholder:font-light outline-none rounded-l-[3px] text-lg"
							value={searchVal}
							onChange={(e) => setSearchVal(e.target.value)}
						/>
						<button
							type="submit"
							className="px-2 text-white font-extralight bg-[#1a2534] rounded-r-[3px] text-lg">
							<FaSearch />
						</button>
					</form>
				</div>
					<div className="w-1/4 flex justify-center">
					<button className={clsx("bg-[#192331] text-white w-fit px-3 py-2 text-sm font-light rounded-[3px]",{"hidden": displayedUsers===users})}
					onClick={()=>{setDisplayedUsers(users);setSearchVal("")}}>Clear Search Results</button>
					</div>
				<ul>
					<div className="grid grid-cols-6 gap-x-4 text-white text-2xl w-full text-center my-4">
						<p>Name</p>
						<p>Email</p>
						<p>Phone</p>
						<p>Gender</p>
						<p>Transactions</p>
					</div>
					{displayedUsers.map((user, ind) => {
						return (<UserDetails key={ind} user={user} />)
})}
				</ul>
			</div>
		</>
	);
}

export default UserList;