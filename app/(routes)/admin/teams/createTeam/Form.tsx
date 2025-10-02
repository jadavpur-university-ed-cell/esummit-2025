"use client";
import { useState } from "react";
import { checkUser, createTeamQuery } from "../../queries";

interface User {
	id: string;
	name: string;
	phone: string;
	email: string;
}

export default function CreateTeam() {
	// object to store team data which is to be submitted
	const [formData, setFormData] = useState({
		eventName: "",
		teamName: "",
		member1Email: "",
		member2Email: "",
		member3Email: "",
		member4Email: "",
	});

	// list of verified members
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
	const [teamCreationStatus, setTeamCreationStatus] = useState("");

	// object to store error messages related to verification of each user
	const [errors, setErrors] = useState<{
		member1?: string;
		member2?: string;
		member3?: string;
		member4?: string;
	}>({});

	// function to verify users by taking their email id and checking if they are valid, verified users
	const handleEmailSubmit = async (currentMember: string, email: string) => {
		setErrors((prev) => ({ ...prev, [currentMember]: undefined }));

		try {
			const response = await checkUser(email, formData.eventName, true, " ");

			if (response.ok) {
				setMembers((prev) => ({ ...prev, [currentMember]: response.user }));
			} else {
				setErrors((prev) => ({ ...prev, [currentMember]: response.error }));
			}
		} catch (error) {
			setErrors((prev) => ({ ...prev, [currentMember]: "An error occurred" }));
		}
	};

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		const { eventName, teamName } = formData;
		const { member1, member2, member3, member4 } = members;

		if (!member1) {
			setTeamCreationStatus("Team must have atleast 1 member.");
			return;
		}

		const response = await createTeamQuery(
			eventName,
			teamName,
			member1.id,
			member2?.id,
			member3?.id,
			member4?.id
		);

		if (response.ok) {
			setTeamCreationStatus("Team created successfully!");
		} else {
			setTeamCreationStatus("Error creating team");
		}
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col h-[75vh] justify-between w-4/5 p-5">
			<div className="flex justify-around w-full">
				<select
					name="eventName"
					id="eventName"
					required
					value={formData.eventName}
					onChange={handleSelectChange}
					className="px-2 py-1">
					<option value="" disabled hidden>
						Select Event
					</option>
					<option value="Hack<n>Pitch">Hack&lt;n&gt;Pitch</option>
					<option value="Mock IPL Auction">Mock IPL Auction</option>
					<option value="Diz Mart">Diz Mart</option>
					<option value="LaunchX">LaunchX</option>
					<option value="Mock Stock">Mock Stock</option>
					<option value="Corporate Clash">Corporate Clash</option>
				</select>
				<input
					type="text"
					name="teamName"
					value={formData.teamName}
					onChange={handleInputChange}
					placeholder="Team Name"
					required
					autoComplete="off"
					className="bg-transparent border-b outline-none text-white"
				/>
			</div>

			{/* Member 1 */}
			<div className="grid grid-cols-4 gap-x-8">
				<button
					className="bg-white px-2 py-1 rounded-sm w-fit"
					type="button"
					onClick={() => handleEmailSubmit("member1", formData.member1Email)}>
					Confirm Member 1
				</button>
				<input
					type="email"
					name="member1Email"
					value={formData.member1Email}
					onChange={handleInputChange}
					placeholder="Member 1 Email"
					required
					autoComplete="off"
					className="bg-transparent border-b outline-none text-white"
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
			<div className="grid grid-cols-4 gap-x-8">
				<button
					className="bg-white px-2 py-1 rounded-sm w-fit"
					type="button"
					onClick={() => handleEmailSubmit("member2", formData.member2Email)}>
					Confirm Member 2
				</button>
				<input
					type="email"
					name="member2Email"
					value={formData.member2Email}
					onChange={handleInputChange}
					placeholder="Member 2 Email"
					autoComplete="off"
					className="bg-transparent border-b outline-none text-white"
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
			<div className="grid grid-cols-4 gap-x-8">
				<button
					className="bg-white px-2 py-1 rounded-sm w-fit"
					type="button"
					onClick={() => handleEmailSubmit("member3", formData.member3Email)}>
					Confirm Member 3
				</button>
				<input
					type="email"
					name="member3Email"
					value={formData.member3Email}
					onChange={handleInputChange}
					placeholder="Member 3 Email"
					autoComplete="off"
					className="bg-transparent border-b outline-none text-white"
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
			<div className="grid grid-cols-4 gap-x-8">
				<button
					className="bg-white px-2 py-1 rounded-sm w-fit "
					type="button"
					onClick={() => handleEmailSubmit("member4", formData.member4Email)}>
					Confirm Member 4
				</button>
				<input
					type="email"
					name="member4Email"
					value={formData.member4Email}
					onChange={handleInputChange}
					placeholder="Member 4 Email"
					autoComplete="off"
					className="bg-transparent border-b outline-none text-white"
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
			<div className="flex flex-col w-full items-center justify-between">
				<button type="submit" className="bg-white px-2 py-1 rounded-sm">
					Create Team
				</button>
				<input
					className={
						teamCreationStatus === "Team created successfully!"
							? "text-green-500 bg-transparent w-1/2 text-center"
							: "text-red-600 bg-transparent w-1/2 text-center"
					}
					value={teamCreationStatus}
					disabled
				/>
			</div>
		</form>
	);
}