import React from "react";
import { getTeams } from "../../queries";
import Teams from "./Teams";

async function EventTeams(req: any) {
	const title = req.searchParams.name;
	const teams = await getTeams(req.params.eventName);
	return (
		<>
			<Teams title={title} teams={teams}/>
		</>
	);
}

export default EventTeams;
export const dynamic = 'force-dynamic';