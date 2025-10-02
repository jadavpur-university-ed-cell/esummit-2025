"use server";
import { prisma } from "@/prisma/client";
import { User } from "@/lib/types";
import {PaymentStatus, TransactionType} from "@prisma/client"

interface Event {
	name: string;
	path: string;
}

const eventArr: Event[] = [
	{
		name: "Hack<N>Pitch",
		path: "hacknpitch",
	},
	{
		name: "Corporate Clash",
		path: "corporateclash",
	},
	{
		name: "Mock Stock",
		path: "mockstock",
	},
	{
		name: "Summit Cup",
		path: "summitcup",
	},
	{
		name: "Diz Mart",
		path: "dizmart",
	},
	{
		name: "LaunchX",
		path: "launchx",
	},
    {
		name: "Equity Edge",
		path: "equityedge",
	},
];

export async function getTeams(event: string) {
	// fetching data directly here, check with everyone, if no one else is using the /api/teams/[id]/route.ts handler, it can be deleted
	try {
		const eventName = eventArr.find((item) => item.path === event)?.name;
		const teams = await prisma.team.findMany({
			where: {
				eventName: eventName,
			},
			include: {
				member1: true,
				member2: true,
				member3: true,
				member4: true,
			},
		});
		return teams;
	} catch (error) {
		console.error("Error fetching teams:", error);
		throw error;
	}
}

export async function deleteTeam(teamId: string) {
	try {
		await prisma.team.delete({
			where: {
				teamId: teamId,
			},
		});
	} catch (error) {
		console.log("Error occured: ", error);
		throw error;
	}
}

export async function editUserReq(user: User) {
	try {
		const updatedUser = await prisma.user.update({
			where: {
				id: user.id,
			},
			data: user,
		});
		return { updatedUser, success: true };
	} catch (error) {
		console.log("Error occured: ", error);
		throw error;
	}
}

export async function getUsers() {
	try {
		const data = await prisma.user.findMany({
			select: {
				id: true,
				name: true,
				email: true,
				phone: true,
				isVerified: true,
				rollNo: true,
				gender: true,
				foodPreference: true,
				shirtSize: true,
				college: true,
				year: true,
				branch: true,
			},
		});

		const users = data.map((user) => ({
			id: user.id,
			name: user.name ? user.name : "",
			email: user.email ? user.email : "",
			phone: user.phone ? user.phone : "",
			isVerified: user.isVerified,
			rollNo: user.rollNo ? user.rollNo : "",
			gender: user.gender ? user.gender : "",
			foodPreference: user.foodPreference ? user.foodPreference : "",
			shirtSize: user.shirtSize ? user.shirtSize : "",
			college: user.college ? user.college : "",
			year: user.year ? user.year : "",
			branch: user.branch ? user.branch : "",
		}));

		return users;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function createTeamQuery(
	eventName: string,
	teamName: string,
	member1Id: string,
	member2Id: string | undefined,
	member3Id: string | undefined,
	member4Id: string | undefined
) {
	try {
		const result = await prisma.team.create({
			data: {
				eventName,
				teamName,
				member1Id,
				member2Id,
				member3Id,
				member4Id,
			},
		});
		return { result, ok: true };
	} catch (err) {
		console.log(err);
		return { error: err, ok: false };
	}
}

export async function editTeamQuery({
	teamId,
	eventName,
	teamName,
	member1Id,
	member2Id,
	member3Id,
	member4Id,
}: {
	teamId: string;
	eventName: string;
	teamName: string;
	member1Id: string;
	member2Id: string | null;
	member3Id: string | null;
	member4Id: string | null;
}) {
	try {
		const team = await prisma.team.update({
			where: {
				teamId: teamId, // using teamId to identify team to update
			},
			data: {
				eventName,
				teamName,
				member1Id,
				member2Id,
				member3Id,
				member4Id,
			},
		});
		return { team, ok: true };
	} catch (error) {
		console.log("Error in editing team.");
		return { ok: false };
	}
}

export async function checkUser(
	email: string,
	eventName: string,
	newTeam: boolean,
	teamId: string
) {
	// newTeam checks if the user is being added to a new team or an existing team is being edited. Need to check for user's existing teams accordingly.
	try {
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (!user) return { error: "User not found.", ok: false };

		if (!user.isVerified)
			return { error: "User verification incomplete.", ok: false };

		// checking if user already has a team
		const existingTeam = await prisma.team.findFirst({
			where: {
				eventName,
				OR: [
					{ member1Id: user.id },
					{ member2Id: user.id },
					{ member3Id: user.id },
					{ member4Id: user.id },
				],
			},
		});

		if (newTeam) {
			// newTeam is true, i.e. new Team is being created
			if (existingTeam)
				return {
					error: "User is already part of a team for this event.",
					ok: false,
				};
		} else {
			// newTeam is false,i.e. existing team is being edited
			if (existingTeam && existingTeam.teamId !== teamId)
				return { error: "User is a part of another team.", ok: false };
		}

		return { user, ok: true };
	} catch (err) {
		console.log(err);
		return { error: err, ok: false };
	}
}

interface Transaction {
	purchaseId: string;
	type: string;
	status: string;
	bankId: string;
	transactionId: string;
}

// enum PaymentStatus {
// 	Pending="Pending",
// 	Verified="Verified",
// 	Rejected="Rejected",
// }

// enum TransactionType{
// 	Merch="Merch",
// 	Hackathon="Hackathon"
// }

interface TransactionData {
	purchaseId: string;
	type: string;
	status: PaymentStatus;
	bankId: string;
	transactionId: string;
}

export const updateTransactionStatus = async (
	transaction: Transaction,
	status: string
) => {
	
	try {
		await prisma.transaction.update({
			where: {
				purchaseId: transaction.purchaseId,
			},
			data: {
				...transaction,
				status: PaymentStatus[status as keyof typeof PaymentStatus],
				type: TransactionType[transaction.type as keyof typeof TransactionType]
			},
		});
		return { msg: "Transaction Status Updated." };
	} catch (error) {
		console.log(error);
		return { msg: error };
	}
};