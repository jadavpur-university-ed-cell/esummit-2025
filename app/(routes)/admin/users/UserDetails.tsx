'use client'
import React, {useRef} from "react";
import VerifyUsers from "./VerifyUsers";
import EditUser from "./EditUsers";
import {FaXmark, FaPenToSquare } from "react-icons/fa6"
import {User} from "@/lib/types";
import Link from "next/link";

export default function UserDetails({ user }: { user: User }) {
	const editUserRef = useRef<HTMLDialogElement>(null);
	
	function toggleEditUser(){
        if(!editUserRef.current) return;
        editUserRef.current.hasAttribute("open")? editUserRef.current.close() : editUserRef.current.showModal();
    }

	return (
		<div className="grid grid-cols-6 gap-x-4 text-white text-lg w-full text-center">
			<p>{user.name}</p>
			<p>{user.email}</p>
			<p>{user.phone}</p>
			<p>{user.gender}</p>
			<Link href={`/admin/users/${user.id}`} >Click Here to Verify</Link>
			<button className="flex justify-center text-xl" onClick={toggleEditUser}>
				<FaPenToSquare />
			</button>
			<dialog ref={editUserRef} className="relative h-[80vh] w-[70vw] bg-[#101720] backdrop:bg-[#00000080]">
				<EditUser user={user}/>
				<button onClick={toggleEditUser} className="absolute top-4 right-4"><FaXmark /></button>
			</dialog>
		</div>
	);
}