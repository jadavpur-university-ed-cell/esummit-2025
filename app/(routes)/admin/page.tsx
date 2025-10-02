import React from "react";
import Link from "next/link";
import clsx from "clsx";
import { useCurrentRole } from "@/hooks/use-current-role";
import { currentRole } from "@/lib/auth";
import { redirect } from "next/navigation";

async function page() {
  const role = await currentRole();
  if(role!=="Admin") redirect("/");
  return (
    <>
    <section className='h-screen flex flex-col p-10'>
      <div className='w-full flex justify-center'>
    <h1 className='text-white text-4xl font-semibold'>Admin Page</h1>
      </div>
      <div className='flex w-full justify-around pt-10'>
        <Link href="/admin/teams" className='bg-white px-2 py-1 rounded-[3px]'>Teams</Link>
        <Link href="/admin/users" className='bg-white px-2 py-1 rounded-[3px]'>Users</Link>
      </div>
    </section>
    </>
  )
}

export default page;