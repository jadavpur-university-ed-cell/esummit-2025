"use client"
import { Button } from '@/components/ui/button'
import React from 'react'

function handlePaymentLogic(){
  console.log("Payment logic goes here");
}
const value = 10000;
const Payments = () => {
  return (
    <div><h1>Payments Page</h1>
    <Button onClick={handlePaymentLogic}>Pay Now {value}</Button>
    </div>
  )
}

export default Payments
