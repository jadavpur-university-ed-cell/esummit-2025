import React from 'react'
import { Metadata } from 'next';
import TeamPage from './TeamComponent';

export const metadata: Metadata = {
  title: 'Teams | JU E-Summit 2025',
  description: 'Meet the people behind the scenes who make this event possible',
};

const page = () => {
  return (
    <TeamPage/>
  )
}

export default page
