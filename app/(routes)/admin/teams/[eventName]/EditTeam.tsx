"use client";
import React, {useRef} from "react";
import { FaPenToSquare, FaXmark } from "react-icons/fa6";
import EditTeamForm from "./EditTeamForm";

function EditTeam({teamId,eventName, teamName}:{teamId:string, eventName:string, teamName:string}) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    function toggleDialog(){
        if(!dialogRef.current) return;
        dialogRef.current.hasAttribute("open")? dialogRef.current.close() : dialogRef.current.showModal();
    }

	return (
		<>
			<button className="text-2xl text-white" onClick={toggleDialog}>
				<FaPenToSquare />
			</button>
            <dialog ref={dialogRef} className="relative backdrop:bg-[#00000080]">
                <button onClick={toggleDialog} className="absolute top-4 right-4 text-white text-2xl"><FaXmark/></button>
                <EditTeamForm eventName={eventName} teamId={teamId} teamName={teamName}/>
            </dialog>
		</>
	);
}

export default EditTeam;