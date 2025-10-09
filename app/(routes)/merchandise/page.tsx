import React from 'react'
import Merchandise  from './uiPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Merchandise | JU E-Summit 25',
  description: 'Official merchandise for E-Summit 25',
};

export default function MerchandisePage(){
  return (
    <Merchandise />
  )
}
