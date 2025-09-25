'use client'
import React from 'react';
import {User} from "@/lib/types";

const ExportCSV = ({users}:{users:User[]}) => {
  const downloadCSV = () => {
    // Convert the data array into a CSV string

    const csvString = [
      ["Name", "Email", "Phone","College", "Year", "Branch", "Roll Number", "Gender", "Food Preference","Shirt Size"], // Specify your headers here
      ...users.map((user:User) => [user.name, user.email, user.phone, user.college, user.year, user.branch, user.rollNo, user.gender, user.foodPreference, user.shirtSize]) // Map your data fields accordingly
    ]
    .map(row => row.join(","))
    .join("\n")


    // Create a Blob from the CSV string
    const blob = new Blob([csvString], { type: 'text/csv' });

    // Generate a download link and initiate the download
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'userList';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return <button onClick={downloadCSV} className='text-[#101720] bg-white px-2 py-1 rounded-[4px] w-fit' >Export as CSV</button>;
};


export default ExportCSV;