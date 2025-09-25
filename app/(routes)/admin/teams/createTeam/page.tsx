import React, {useState} from 'react'
import Form from './Form';
import Link from 'next/link';

export default function page() {
  return (
    <>
    <main className='flex flex-col pt-[10vmin] px-[10vmin]'>
      <Link href="/admin/teams" className='ml-[3vw] bg-white rounded-md w-fit px-2 py-1'>Events Page</Link>
      <div className='w-full flex flex-col items-center'>
      <h1 className='text-4xl text-white font-medium'>Create New Team</h1>
      <Form />
      </div>
    </main>
    </>
  )
}