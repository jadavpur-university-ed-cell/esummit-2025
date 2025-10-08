"use client";

import Image from 'next/image';
import { FaXmark } from 'react-icons/fa6';
import Script from 'next/script';
import { useRef, useState, useEffect } from 'react';
import { Session } from '@/types/all';
import { useRouter } from 'next/navigation';

interface Response {
  razorpay_order_id: String,
  razorpay_payment_id: String,
  razorpay_signature: String
}

// Dynamic Pricing from environment variables
const SHIRT_PRICE = parseInt('359');
const CAP_PRICE = parseInt(process.env.NEXT_PUBLIC_CAP_PRICE || '200');
const DEVELOPER_COUPON_CODE = process.env.NEXT_PUBLIC_DEVELOPER_COUPON_CODE || 'ESUMMIT_DEV_2025';
const DEVELOPER_PRICE = parseInt(process.env.NEXT_PUBLIC_DEVELOPER_PRICE || '50');
const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!;

// interface UserDetails {
//   id: string;
//   name: string;
//   email: string;
//   shirtSize?: string;
//   college: string;
//   year: string;
//   branch: string;
// }

export default function Merchandise() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const editUserRef = useRef(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch("/api/get-session");
        const data = await res.json();
        setSession(data.session);
      } catch (err) {
        console.error("Failed to fetch session:", err);
        setSession(null);
      } finally {
        setIsScriptLoaded(true);
      }
    };
    fetchSession();
  }, []);

  const handlePayment = async () => {
    if (!RAZORPAY_KEY_ID || !isScriptLoaded || typeof window === "undefined" || !window.Razorpay) {
      alert("Payment system not ready. Please refresh.");
      return;
    }

    try {
      // STEP 1 — Create order on backend
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: SHIRT_PRICE,
          merchandise: "SHIRT"
        }),
      });
      const { orderId } = await res.json();
      if (!orderId) throw new Error("Order creation failed");

      // STEP 2 — Open Razorpay Checkout
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: SHIRT_PRICE * 100,
        currency: "INR",
        name: "E-Summit 25 Merchandise",
        description: "Official T-Shirt",
        handler: async function (response: Response) {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;

          // if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
          //   alert("Payment failed: incomplete response from Razorpay");
          //   return;
          // }

          const verifyRes = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature,
              merchandise: "SHIRT",
              amount: SHIRT_PRICE
            }),
          });

          const result = await verifyRes.json();
          if (result.success) {
            router.push("/dashboard");
          } else {
            alert("Payment verification failed!");
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Failed to start payment. Try again.");
    }
  };

  const togglePaymentWindow = () => {
    editUserRef.current?.showModal();
  };

  // Rest of your component logic stays the same...
  // const merchandiseData = {
  //   SHIRT: {
  //     name: "E-Summit'25 T-Shirt",
  //     description: "Presenting the Official Merch of E-Summit'25. Grab your hands on the exclusive merchandise of E-Summit'25! A round-necked T-Shirt with a 200 GSM fabric, perfect for your casual outings.",
  //     image: "/shirt.png",
  //     originalPrice: SHIRT_PRICE
  //   },
  // };

  // const pricingConfig = {
  //   shirtPrice: SHIRT_PRICE,
  //   capPrice: CAP_PRICE,
  //   developerCouponCode: DEVELOPER_COUPON_CODE,
  //   developerPrice: DEVELOPER_PRICE,
  //   razorpayKeyId: RAZORPAY_KEY_ID,
  // };

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
          <div className='bg-gradient-to-br backdrop-blur-lg border border-white/20 rounded-2xl p-1 max-w-5xl mx-4 my-10'>
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
                      className="flex ml-auto bg-[#c085fd] text-[#101720] font-semibold border-0 py-2 px-6 focus:outline-none hover:bg-[#EAE2B7] rounded-full cursor-pointer"
                      onClick={() => {
                        if (!isScriptLoaded) return;
                        if (session) handlePayment();
                        else window.location.href = "/sign-in";

                      }}
                    >
                      {session === undefined || !isScriptLoaded
                        ? "Loading..."
                        : session
                          ? "Buy"
                          : "Login"
                      }
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
