"use client"
import { getServerSession } from 'next-auth';
import { prisma } from '@/prisma/client';
import MerchandiseClient from '@/components/merchandise/MerchandiseCSR';
import Image from 'next/image';
import { FaXmark } from 'react-icons/fa6';
import Script from 'next/script';
import { useRef, useState } from 'react';

// Dynamic Pricing from environment variables
const SHIRT_PRICE = parseInt(process.env.NEXT_PUBLIC_SHIRT_PRICE || '300');
const CAP_PRICE = parseInt(process.env.NEXT_PUBLIC_CAP_PRICE || '200');
const DEVELOPER_COUPON_CODE = process.env.NEXT_PUBLIC_DEVELOPER_COUPON_CODE || 'ESUMMIT_DEV_2025';
const DEVELOPER_PRICE = parseInt(process.env.NEXT_PUBLIC_DEVELOPER_PRICE || '50');
const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!;

interface UserDetails {
  id: string;
  name: string;
  email: string;
  shirtSize?: string;
  college: string;
  year: string;
  branch: string;
}

export default function Merchandise() {
  const editUserRef = useRef(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  const handlePayment = () => {
    console.log('RAZORPAY_KEY_ID:', RAZORPAY_KEY_ID);
    console.log('Script loaded:', isScriptLoaded);
    console.log('Window Razorpay:', typeof window !== 'undefined' ? window.Razorpay : 'undefined');

    if (!RAZORPAY_KEY_ID) {
      alert('Razorpay Key ID is missing! Check your environment variables.');
      return;
    }

    if (!isScriptLoaded) {
      alert('Payment system is loading. Please try again in a moment.');
      return;
    }

    if (typeof window === 'undefined' || !window.Razorpay) {
      alert('Payment system not available. Please refresh the page.');
      return;
    }

    const options = {
      key: RAZORPAY_KEY_ID,
      amount: SHIRT_PRICE * 100, // Convert to paise
      currency: 'INR',
      name: 'E-Summit 25 Merchandise',
      description: 'Official T-Shirt',
      handler: function(response) {
        alert(`Payment Successful! ID: ${response.razorpay_payment_id}`);
        console.log('Payment Response:', response);
      },
      prefill: {
        name: 'Test User',
        email: 'test@example.com',
      },
      theme: { color: '#c085fd' },
      modal: {
        ondismiss: function() {
          console.log('Payment modal closed');
        }
      }
    };

    try {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Razorpay initialization error:', error);
      alert('Payment initialization failed. Please try again.');
    }
  };

  const togglePaymentWindow = () => {
    editUserRef.current?.showModal();
  };

  // Rest of your component logic stays the same...
  const merchandiseData = {
    SHIRT: {
      name: "E-Summit'25 T-Shirt",
      description: "Presenting the Official Merch of E-Summit'25. Grab your hands on the exclusive merchandise of E-Summit'25! A round-necked T-Shirt with a 200 GSM fabric, perfect for your casual outings.",
      image: "/shirt.png",
      originalPrice: SHIRT_PRICE
    },
  };

  const pricingConfig = {
    shirtPrice: SHIRT_PRICE,
    capPrice: CAP_PRICE,
    developerCouponCode: DEVELOPER_COUPON_CODE,
    developerPrice: DEVELOPER_PRICE,
    razorpayKeyId: RAZORPAY_KEY_ID,
  };

  return (
    <>
      <section
        className="text-gray-600 body-font overflow-hidden"
        style={{
          backgroundImage: 'url(/background.png)',
          backgroundSize: 'auto 100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'left',
        }}>
        <div className='min-h-screen flex items-center justify-center'>
          <div className='bg-gradient-to-br backdrop-blur-lg border border-white/20 rounded-2xl p-1 max-w-5xl mx-4'>
            <h1 className="text-4xl text-[#c085fd] mt-8 justify-center font-bold text-center">
              E-Summit&apos;25 Merchandise
            </h1>
            <div className="container px-5 py-8 mx-auto">
              <div className="lg:w-4/5 mx-auto flex flex-wrap">
                <Image
                  width={500}
                  height={500}
                  alt="ecommerce"
                  className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                  src="/shirt.png"
                />
                <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                  <h2 className="text-sm title-font text-[#ffffff] tracking-widest">T-SHIRT</h2>
                  <h1 className="text-[#c085fd] text-2xl title-font font-semibold mb-1">Get the official E-Summit 25 Merchandise</h1>
                  <div className="flex mb-4 text-grey-200">
                    <span className="flex ml-3 pl-3 py-2 space-x-2">
                      Shirt Size: XL
                    </span>
                    <span className="flex ml-3 pl-3 py-2 border-l-2 border-[#ffffff] space-x-2">
                      Gender: M
                    </span>
                  </div>
                  <p className="leading-relaxed text-[#eae2b7]">
                    Presenting the Official Merch of E-Summit&apos;25. Grab your hands on the exclusive merchandise of E-Summit&apos;25!
                    A round-necked T-Shirt with a 200 GSM fabric, perfect for your casual outings. <br /><br />
                    <span className='font-semibold text-[#ffffff]'>Note:</span> This is a non Customizable Shirt, Organizing Committee Members are asked to contact the Logistic Team for their Customized Shirts.
                  </p>

                  <div className="flex my-6">
                    <span className="title-font font-medium text-2xl text-white">₹{SHIRT_PRICE}.00</span>
                    <button
                      className="flex ml-auto bg-[#c085fd] text-[#101720] font-semibold border-0 py-2 px-6 focus:outline-none hover:bg-[#EAE2B7] rounded-full"
                      onClick={handlePayment}
                    >
                      Buy {!isScriptLoaded && '(Loading...)'}
                    </button>
                    <dialog
                      ref={editUserRef}
                      className="relative h-[90vh] w-[70vw] rounded-xl backdrop:bg-[#00000080] bg-[#101720] text-[#c085fd] font-semibold">
                      <button
                        onClick={togglePaymentWindow}
                        className="absolute top-4 right-4 text-white">
                        <FaXmark />
                      </button>
                    </dialog>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Script 
        src="https://checkout.razorpay.com/v1/checkout.js" 
        onLoad={() => {
          console.log('Razorpay script loaded successfully');
          setIsScriptLoaded(true);
        }}
        onError={() => {
          console.error('Failed to load Razorpay script');
        }}
      />
    </>
  )
}
