import React from "react";
import { FaSquareMinus } from "react-icons/fa6";
import { deleteTeam } from "../../queries";
export default function DeleteTeam({teamId}:{teamId:string}) {
	return (
		<>
			<button className="text-red-500 hover:text-red-700 transition-colors text-2xl" onClick={()=>{deleteTeam(teamId)}}>
				<FaSquareMinus />
			</button>
		</>
	);
}