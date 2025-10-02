import React from "react";
import { prisma } from "@/prisma/client";
import VerifyUser from "../VerifyUsers";

interface Transaction {
	purchaseId: string;
	type: string;
	status: string;
	bankId: string;
	transactionId: string;
}

async function Transactions({ params }: { params: { id: string } }) {
	const { id } = params;

	const user = await prisma.user.findFirst({
		where: {
			id,
		},
		select: {
			name: true,
			email: true,
			transactions: true,
		},
	});

	const transactions: Transaction[] | undefined = user?.transactions;

	return (
		<div className="h-screen w-screen p-12 flex flex-col items-center gap-y-8">
			<div className="w-full flex justify-center">
				<h1 className="text-3xl font-bold text-[#fcbf49]">
					Transactions for {user?.name}
				</h1>
			</div>
			<div className="grid grid-cols-9 text-xl text-[#eae2b7] w-full">
				<div className="col-span-2">Purchase ID</div>
				<div className="col-span-2">Transaction ID</div>
				<div>Bank ID</div>
				<div>Status</div>
				<div>Type</div>
			</div>
			<ul className="flex flex-col gap-y-6 w-full">
				{transactions?.map((item, ind) => (
					<li key={ind} className="grid grid-cols-9 text-white">
						<span className="col-span-2">{item.purchaseId}</span>
						<span className="col-span-2">{item.transactionId}</span>
						<span>{item.bankId}</span>
						<span>{item.status}</span>
						<span>{item.type}</span>
						<VerifyUser transaction={item} user={user}/>
					</li>
				))}
			</ul>
		</div>
	);
}

export default Transactions;
export const dynamic = 'force-dynamic';