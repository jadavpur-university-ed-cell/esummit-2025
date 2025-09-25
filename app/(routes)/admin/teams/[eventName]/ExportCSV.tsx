"use client";
import React from "react";

const ExportCSV = ({ data, fileName }: any) => {
	const downloadCSV = () => {
		// Convert the data array into a CSV string

		const csvString = [
			[
				"Team Name",
				"Member 1 Name",
				"Member 1 Email",
				"Member 1 Phone",
				"Member 2 Name",
				"Member 2 Email",
				"Member 2 Phone",
				"Member 3 Name",
				"Member 3 Email",
				"Member 3 Phone",
				"Member 4 Name",
				"Member 4 Email",
				"Member 4 Phone",
			], // Specify your headers here
			...data.map((team: any) => {
				return [
					team.teamName,
					team.member1.name,
					team.member1.email,
					team.member1.phone,
					team.member2? team.member2.name:"",
					team.member2? team.member2.email : "",
					team.member2? team.member2.phone : "",
					team.member3? team.member3.name: " ",
					team.member3? team.member3.email : "",
					team.member3? team.member3.phone : "",
					team.member4? team.member4.name: "",
					team.member4? team.member4.email : "",
					team.member4? team.member4.phone : "",
				];
			}),
		] // Map your data fields accordingly

			.map((row) => row.join(","))
			.join("\n");

		// Create a Blob from the CSV string
		const blob = new Blob([csvString], { type: "text/csv" });

		// Generate a download link and initiate the download
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = fileName || "download.csv";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	};

	return (
		<button
			onClick={downloadCSV}
			className="bg-[#101720] px-2 py-1 rounded-[4px]">
			Download
		</button>
	);
};

export default ExportCSV;