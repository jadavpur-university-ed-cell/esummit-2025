'use client'
import React, {useState} from "react";
import { editUserReq } from "@/app/(routes)/admin/queries";
import {User} from "@/lib/types";

function EditUser({ user }: { user: User }) {

	const [formData, setFormData] = useState(user);
	const [editStatus, setEditStatus ] = useState(" ");
	const [messageColor, setMessageColor] = useState("bg-transparent");

	async function handleFormSubmit(e: React.FormEvent) {
		e.preventDefault();
		const data = await editUserReq(formData);
		data.success? setEditStatus("User edited successfully!") : setEditStatus("Error in editing user.");
		data.success? setMessageColor(" bg-transparent text-green-500") : setMessageColor("bg-transparent text-red-500");
	}

	function handleFormEdit(e:React.ChangeEvent<HTMLInputElement>, formField: string){
		setFormData({
			...formData,
			[formField] : e.target.value
		})
	}

	function handleSelectChange(e:React.ChangeEvent<HTMLSelectElement>, formField: string){
		setFormData({
			...formData,
			[formField] : e.target.value
		})
	}

	function handleReset(e:React.FormEvent){
		e.preventDefault();
		setFormData(user);
	}

	return (
		<div className="flex flex-col text-white h-full">
			<div className="w-full flex justify-center">
			<h1 className="text-3xl my-5 font-bold text-[#fcbf49]">Edit Details</h1>
			</div>
			<form className="grid grid-cols-1 md:grid-cols-2 h-full justify-items-center gap-y-3">
				<div className="flex flex-col w-1/2">
					<label htmlFor="name" className="text-[#eae2b7]">Name</label>
					<input type="text" name="name" id="name" value={formData.name} onChange={(e)=>handleFormEdit(e,"name")} className="bg-transparent outline-none border-b" autoComplete="off"/>
				</div>
				<div className="flex flex-col w-1/2">
					<label htmlFor="email" className="text-[#eae2b7]">Email</label>
					<input type="email" name="email" id="email" value={formData.email} className="bg-transparent outline-none border-b" autoComplete="off" readOnly />
				</div>
				<div className="flex flex-col w-1/2">
					<label htmlFor="phone" className="text-[#eae2b7]">Phone Number</label>
					<input type="text" name="phone" id="phone" value={formData.phone} onChange={(e)=>handleFormEdit(e,"phone")} className="bg-transparent outline-none border-b" autoComplete="off"/>
				</div>
				<div className="flex flex-col w-1/2">
					<label htmlFor="college" className="text-[#eae2b7]">College</label>
					<input type="text" name="college" id="college" value={formData.college} onChange={(e)=>handleFormEdit(e,"college")} className="bg-transparent outline-none border-b" autoComplete="off"/>
				</div>
				<div className="flex flex-col w-1/2">
					<label htmlFor="branch" className="text-[#eae2b7]">Branch</label>
					<input type="text" name="branch" id="branch" value={formData.branch} onChange={(e)=>handleFormEdit(e,"branch")} className="bg-transparent outline-none border-b" autoComplete="off"/>
				</div>
				<div className="flex flex-col w-1/2">
					<label htmlFor="year" className="text-[#eae2b7]">Year of Study</label>
					<input type="text" name="year" id="year" value={formData.year} onChange={(e)=>handleFormEdit(e,"year")} className="bg-transparent outline-none border-b" autoComplete="off"/>
				</div>
				<div className="flex flex-col w-1/2">
					<label htmlFor="rollNo" className="text-[#eae2b7]">Roll Number</label>
					<input type="text" name="rollNo" id="rollNo" value={formData.rollNo} onChange={(e)=>handleFormEdit(e,"rollNo")} className="bg-transparent outline-none border-b" autoComplete="off" />
				</div>
				<div className="flex flex-col w-1/2">
					<label htmlFor="gender" className="text-[#eae2b7]">Gender</label>
					<input type="text" name="gender" id="gender" value={formData.gender} onChange={(e)=>handleFormEdit(e,"gender")} className="bg-transparent outline-none border-b" autoComplete="off"/>
				</div>
				<div className="flex flex-col w-1/2">
					<label htmlFor="foodPreference" className="text-[#eae2b7]">Food Preference</label>
					{/* <input type="text" name="foodPreference" id="foodPreference" value={formData.foodPreference} onChange={(e)=>handleFormEdit(e,"foodPreference")} className="bg-transparent outline-none border-b" autoComplete="off" /> */}
					<select name="foodPreference" className="text-[#101720] font-medium px-2 py-1" value={formData.foodPreference} onChange={(e)=>handleSelectChange(e,"foodPreference")}>
						<option value="Food Preference" hidden>Food Preference</option>
						<option value="Veg">Veg</option>
						<option value="Non Veg">Non Veg</option>
					</select>
				</div>
				<div className="flex flex-col w-1/2">
					<label htmlFor="shirtSize" className="text-[#eae2b7]">Shirt Size</label>
					<select name="shirtSize" id="shirtSize" className="text-[#101720] font-medium px-2 py-1" value={formData.shirtSize} onChange={(e)=>handleSelectChange(e,"shirtSize")}>
						<option value={formData.shirtSize} hidden>{formData.shirtSize}</option>
						<option value="XS">XS</option>
						<option value="S">S</option>
						<option value="M">M</option>
						<option value="L">L</option>
						<option value="XL">XL</option>
						<option value="XXL">XXL</option>
					</select>
				</div>
				<button type="submit" onClick={handleFormSubmit} className="bg-[#fcbf49] rounded-2xl px-2 py-1 h-fit text-[#101720] font-medium">
					Edit Details
				</button>
				<button className="bg-[#fcbf49] text-[#101720] px-2 py-1 h-fit rounded-2xl font-medium" onClick={handleReset}>
					Reset
				</button>
				<input type="text" className={messageColor} value={editStatus} disabled />
			</form>
		</div>
	);
}

export default EditUser;