"use client";
import { useState } from "react";
import { checkUser, editTeamQuery } from "../../queries";

interface User {
	id: string;
	name: string;
	phone: string;
	email: string;
}

export default function EditTeam({
	teamId,
	eventName,
	teamName,
}: {
	teamId: string;
	eventName: string;
	teamName: string;
}) {
	const [formData, setFormData] = useState({
		eventName: eventName,
		teamName: teamName,
		member1Email: "",
		member2Email: "",
		member3Email: "",
		member4Email: "",
	});

	const [members, setMembers] = useState<{
		member1: User | null;
		member2: User | null;
		member3: User | null;
		member4: User | null;
	}>({
		member1: null,
		member2: null,
		member3: null,
		member4: null,
	});

	// variable to display status of team creation after submission of form
	const [teamEditStatus, setTeamEditStatus] = useState("");

	// object to store error messages related to verification of each user
	const [errors, setErrors] = useState<{
		member1?: string;
		member2?: string;
		member3?: string;
		member4?: string;
	}>({});

	const handleEmailSubmit = async (currentMember: string, email: string) => {
		setErrors((prev) => ({ ...prev, [currentMember]: undefined }));

		try {
			const response = await checkUser(
				email,
				formData.eventName,
				false,
				teamId
			);

			if (response.ok) {
				setMembers((prev) => ({ ...prev, [currentMember]: response.user }));
			} else {
				setErrors((prev) => ({ ...prev, [currentMember]: response.error }));
			}
		} catch (error) {
			setErrors((prev) => ({ ...prev, [currentMember]: "An error occurred" }));
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const { eventName, teamName } = formData;
		const { member1, member2, member3, member4 } = members;

		if (!member1) {
			setTeamEditStatus("Team must have atleast 1 member.");
			return;
		}

		const member1Id = member1.id;
		const member2Id = member2 ? member2.id : null;
		const member3Id = member3 ? member3.id : null;
		const member4Id = member4 ? member4.id : null;

		const response = await editTeamQuery({
			teamId,
			eventName,
			teamName,
			member1Id,
			member2Id,
			member3Id,
			member4Id,
		});

		if (response.ok) {
			setTeamEditStatus("Team edited successfully!");
		} else {
			setTeamEditStatus("Error in editing team");
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="w-[70vw] h-[80vh] bg-[#101720] text-white flex flex-col justify-between p-[5%]">
			<div className="flex justify-around">
				<input
					type="text"
					name="eventName"
					value={formData.eventName}
					placeholder="Event Name"
					disabled
					className="bg-transparent text-white text-2xl"
				/>
				<input
					type="text"
					name="teamName"
					value={formData.teamName}
					onChange={handleInputChange}
					placeholder="Team Name"
					required
					autoComplete="off"
					className="bg-transparent text-white border-b outline-none"
				/>
			</div>

			{/* Member 1 */}
			<div className="grid grid-cols-4 gap-x-4">
				<button
					type="button"
					className="bg-white text-[#101720] font-semibold px-2 py-1 rounded-sm w-fit"
					onClick={() => handleEmailSubmit("member1", formData.member1Email)}>
					Verify Member 1
				</button>
				<input
					type="email"
					name="member1Email"
					value={formData.member1Email}
					onChange={handleInputChange}
					placeholder="Member 1 Email"
					required
					autoComplete="off"
					className="bg-transparent text-white outline-none border-b"
				/>
				{members.member1 ? (
					<p className="text-white col-span-2 flex justify-around">
						<span>{members.member1.name}</span>
						<span>{members.member1.phone}</span>
					</p>
				) : (
					<p className="text-red-500 col-span-2 text-center">
						{errors.member1}
					</p>
				)}
			</div>

			{/* Member 2 */}
			<div className="grid grid-cols-4 gap-x-4">
				<button
					type="button"
					className="bg-white text-[#101720] px-2 py-1 rounded-sm w-fit font-semibold"
					onClick={() => handleEmailSubmit("member2", formData.member2Email)}>
					Verify Member 2
				</button>
				<input
					type="email"
					name="member2Email"
					value={formData.member2Email}
					onChange={handleInputChange}
					placeholder="Member 2 Email"
					autoComplete="off"
					className="bg-transparent text-white outline-none border-b"
				/>
				{members.member2 ? (
					<p className="text-white col-span-2 flex justify-around">
						<span>{members.member2.name}</span>
						<span>{members.member2.phone}</span>
					</p>
				) : (
					<p className="text-red-500 col-span-2 text-center">
						{errors.member2}
					</p>
				)}
			</div>

			{/* Member 3 */}
			<div className="grid grid-cols-4 gap-x-4">
				<button
					type="button"
					className="bg-white text-[#101720] px-2 py-1 rounded-sm w-fit font-semibold"
					onClick={() => handleEmailSubmit("member3", formData.member3Email)}>
					Verify Member 3
				</button>
				<input
					type="email"
					name="member3Email"
					value={formData.member3Email}
					onChange={handleInputChange}
					placeholder="Member 3 Email"
					autoComplete="off"
					className="bg-transparent text-white outline-none border-b"
				/>
				{members.member3 ? (
					<p className="text-white col-span-2 flex justify-around">
						<span>{members.member3.name}</span>
						<span>{members.member3.phone}</span>
					</p>
				) : (
					<p className="text-red-500 col-span-2 text-center">
						{errors.member3}
					</p>
				)}
			</div>

			{/* Member 4 */}
			<div className="grid grid-cols-4 gap-x-4">
				<button
					type="button"
					className="bg-white text-[#101720] px-2 py-1 rounded-sm w-fit font-semibold"
					onClick={() => handleEmailSubmit("member4", formData.member4Email)}>
					Verify Member 4
				</button>
				<input
					type="email"
					name="member4Email"
					value={formData.member4Email}
					onChange={handleInputChange}
					placeholder="Member 4 Email"
					autoComplete="off"
					className="bg-transparent text-white outline-none border-b"
				/>
				{members.member4 ? (
					<p className="text-white col-span-2 flex justify-around">
						<span>{members.member4.name}</span>
						<span>{members.member4.phone}</span>
					</p>
				) : (
					<p className="text-red-500 col-span-2 text-center">
						{errors.member4}
					</p>
				)}
			</div>

			<div className="flex flex-col w-full items-center gap-y-2">
				<button
					type="submit"
					className="bg-white text-[#101720] font-medium px-2 py-1 rounded-md w-fit">
					Edit Team
				</button>
				<input
					className={
						teamEditStatus === "Team edited successfully!"
							? "text-green-500 bg-transparent w-1/2 text-center"
							: "text-red-600 bg-transparent w-1/2 text-center"
					}
					value={teamEditStatus}
					disabled
				/>
			</div>
		</form>
	);
}