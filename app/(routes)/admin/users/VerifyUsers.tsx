"use client";
import React from "react";
import { updateTransactionStatus } from "../queries";

interface Transaction {
	purchaseId: string;
	type: string;
	status: string;
	bankId: string;
	transactionId: string;
}

function VerifyUser({transaction,user}:{transaction:Transaction, user:{name:string|null, email:string|null, transactions:Transaction[]}|null}) {

	if(transaction.status!=="Pending")
		return (
			<div className="cols-span-2 text-[#f77f00] w-full text-center">
				{transaction.status}
			</div>
		)

	async function handleVerify() {
		const transactionType =
			transaction.type === "Merch" ? "Merchandise" : "Hack N Pitch";

		// create function to edit transaction status in db
		const updateStatus = await updateTransactionStatus(transaction,"Verified");
		console.log(updateStatus);

		const mail = await fetch("/api/mail", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				to: user?.email,
				name: user?.name,
				subject: "E-Summit'24: Transaction Verificated",
				body: `<h4>Congratulations ${user?.name}, your transaction for ${transactionType} has been verified successfully!</h4>
                <h3>Transaction Details:</h3>
                <p>Transaction ID: ${transaction.transactionId}</p>
                <p>Vendor ID: ${transaction.bankId}</p>
				<p>In case of any queries/issues, please contact someone from the Tech Team.</p>
				<br>
				<h4>Regards,</h4>
                <h4>E-Cell, Jadavpur University</h4>`,
			}),
		});
		const mailResult = await mail.json();
		console.log(mailResult);
	}
	async function handleReject() {
		const transactionType =
			transaction.type === "Merch" ? "Merchandise" : "Hack N Pitch";

		// create function to edit transaction status in db
		const updateStatus = await updateTransactionStatus(transaction,"Rejected");
		console.log(updateStatus);

		const mail = await fetch("/api/mail", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				to: user?.email,
				name: user?.name,
				subject: "E-Summit'24: Transaction Verification Request Rejected",
				body: `<h4>Hey ${user?.name}, We are sorry to inform you that we were unable to verify your transaction for ${transactionType}. </h4>
                <p> Please check the transaction details on your side, and make sure you provide the correct Transaction ID.</p>
                <h3>Transaction Details: </h3>
                <p>Transaction ID: ${transaction.transactionId}</p>
                <p>Vendor ID: ${transaction.bankId}</p>
				<p>In case of any queries/issues, please contact someone from the Tech Team.</p>
				<br>
				<h4>Regards,</h4>
                <h4>E-Cell, Jadavpur University</h4>`,
			}),
		});
		const mailResult = await mail.json();
		console.log(mailResult);
	}
	return (
		<div className="col-span-2 flex justify-around">
			<button
				className="bg-[#fcbf49] px-2 py-1 rounded-sm text-[#101720] font-medium"
				onClick={handleVerify}>
				Verify
			</button>
			<button
				className="bg-[#d62828] px-2 py-1 rounded-sm text-[#101720] font-medium"
				onClick={handleReject}>
				Reject
			</button>
		</div>
	);
}
export default VerifyUser;