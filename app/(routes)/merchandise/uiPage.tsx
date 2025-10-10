"use client";

import Image from 'next/image';
import { FaXmark } from 'react-icons/fa6';
import { useRef, useState, useEffect } from 'react';
import { Session } from '@/types/all';
import { useRouter } from 'next/navigation';

// Dynamic Pricing from environment variables
const SHIRT_PRICE = parseInt('359');
const CASHFREE_CLIENT_ID = process.env.NEXT_PUBLIC_CASHFREE_CLIENT_ID!;

// Remove all of these conflicting declarations:
/*
interface CashfreeSDK {
  (config: { mode: string }): CashfreeInstance;
}

interface CashfreeInstance {
  checkout(options: CheckoutOptions): Promise<CashfreeResult>;
}

interface CheckoutOptions {
  paymentSessionId: string;
  redirectTarget: '_modal' | '_self';
}

interface CashfreeResult {
  error?: {
    message: string;
    code?: string;
  };
  redirect?: boolean;
  paymentDetails?: {
    orderId: string;
    paymentId: string;
    paymentStatus: string;
  };
}

declare global {
  interface Window {
    Cashfree?: CashfreeSDK;
  }
}
*/

interface OrderResponse {
  success: boolean;
  data?: {
    orderId: string;
    paymentSessionId: string;
    amount: number;
  };
  error?: string;
}

interface PaymentVerificationResponse {
  success: boolean;
  message?: string;
  error?: string;
}

const Merchandise = () => {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [shirtSize, setShirtSize] = useState<string>("");
  const editUserRef = useRef<HTMLDialogElement>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSessionAndUser = async () => {
      try {
        const sessionRes = await fetch("/api/get-session");
        const sessionData = await sessionRes.json();
        setSession(sessionData.session);

        if (sessionData.session) {
          const userRes = await fetch("/api/find-user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ session: sessionData.session }),
          });

          if (!userRes.ok) throw new Error("Failed to load user");
          const userData = await userRes.json();
          setShirtSize(userData.shirtSize);
        }
      } catch (err) {
        console.error("Error fetching session or user:", err);
        setSession(null);
      } finally {
        // Load Cashfree SDK
        const script = document.createElement('script');
        script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
        script.onload = () => {
          console.log('Cashfree SDK loaded successfully');
          setIsScriptLoaded(true);
        };
        script.onerror = () => {
          console.error('Failed to load Cashfree SDK');
        };
        document.head.appendChild(script);
      }
    };

    fetchSessionAndUser();
  }, []);

  const handlePayment = async () => {
    if (!CASHFREE_CLIENT_ID || !isScriptLoaded || typeof window === "undefined" || !window.Cashfree) {
      alert("Payment system not ready. Please refresh.");
      return;
    }

    setIsLoading(true);

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

      const result: OrderResponse = await res.json();

      // Check if the API call was successful
      if (!result.success) {
        console.error("Order creation failed:", result.error);
        alert("Failed to create order: " + (result.error || "Unknown error"));
        return;
      }

      // Check if result.data exists before destructuring
      if (!result.data) {
        console.error("Order creation failed: No data returned");
        alert("Failed to create order: No order data received");
        return;
      }

      const { orderId, paymentSessionId } = result.data;

      if (!orderId || !paymentSessionId) {
        console.error("Missing order details:", result.data);
        alert("Failed to create order: Missing order details");
        return;
      }

      // STEP 2 — Initialize Cashfree
      const cashfree = window.Cashfree({
        mode: "sandbox" // Change to "production" for live
      });

      // STEP 3 — Open Cashfree Checkout
      const checkoutOptions = {
        paymentSessionId: paymentSessionId,
        redirectTarget: "_modal" as const
      };

      const paymentResult = await cashfree.checkout(checkoutOptions);

      if (paymentResult.error) {
        console.error("Payment failed:", paymentResult.error);
        alert("Payment failed: " + paymentResult.error.message);
        return;
      }

      if (paymentResult.redirect) {
        console.log("Redirecting...");
        return;
      }

      if (paymentResult.paymentDetails) {
        console.log("Payment completed:", paymentResult.paymentDetails);
        // Verify payment on backend
        await verifyPayment(orderId);
      }

    } catch (err) {
      console.error("Payment error:", err);
      alert("Failed to start payment. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const verifyPayment = async (orderId: string) => {
    try {
      const verifyRes = await fetch("/api/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_id: orderId,
          merchandise: "SHIRT"
        }),
      });

      const result: PaymentVerificationResponse = await verifyRes.json();
      
      if (result.success) {
        alert("Payment successful! Redirecting to dashboard...");
        router.push("/dashboard");
      } else {
        alert("Payment verification failed: " + (result.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Verification error:", error);
      alert("Payment verification failed!");
    }
  };

  const togglePaymentWindow = () => {
    editUserRef.current?.showModal();
  };

  const getButtonText = () => {
    if (session === undefined || !isScriptLoaded || !shirtSize) {
      return "Loading...";
    }
    if (!session) {
      return "Login";
    }
    if (isLoading) {
      return "Processing...";
    }
    return "Buy";
  };

  const isButtonDisabled = () => {
    return (
      session === undefined ||
      !isScriptLoaded ||
      !shirtSize ||
      isLoading ||
      !CASHFREE_CLIENT_ID
    );
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
          <div className='bg-gradient-to-br backdrop-blur-lg border border-white/20 rounded-2xl p-1 max-w-5xl mx-4 my-10'>
            <h1 className="text-4xl text-[#c085fd] mt-8 justify-center font-bold text-center">
              E-Summit&apos;25 Merchandise
            </h1>
            <div className="container px-5 py-8 mx-auto">
              <div className="lg:w-4/5 mx-auto flex flex-wrap">
                <Image
                  width={500}
                  height={500}
                  alt="E-Summit 25 Official T-Shirt"
                  className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                  src="/shirt.png"
                />
                <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                  <h2 className="text-sm title-font text-[#ffffff] tracking-widest">T-SHIRT</h2>
                  <h1 className="text-[#c085fd] text-2xl title-font font-semibold mb-1">
                    Get the official E-Summit 25 Merchandise
                  </h1>
                  <div className="flex mb-4 text-grey-200">
                    <span className="flex ml-3 pl-3 py-2 space-x-2">
                      Shirt Size: {shirtSize || "Loading..."}
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
                      className={`flex ml-auto font-semibold border-0 py-2 px-6 focus:outline-none rounded-full cursor-pointer transition-colors ${
                        isButtonDisabled()
                          ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                          : 'bg-[#c085fd] text-[#101720] hover:bg-[#EAE2B7]'
                      }`}
                      onClick={() => {
                        if (isButtonDisabled()) return;
                        if (session) handlePayment();
                        else window.location.href = "/sign-in";
                      }}
                      disabled={isButtonDisabled()}
                    >
                      {getButtonText()}
                    </button>
                    <dialog
                      ref={editUserRef}
                      className="relative h-[90vh] w-[70vw] rounded-xl backdrop:bg-[#00000080] bg-[#101720] text-[#c085fd] font-semibold">
                      <button
                        onClick={togglePaymentWindow}
                        className="absolute top-4 right-4 text-white hover:text-red-400 transition-colors"
                        aria-label="Close dialog"
                      >
                        <FaXmark size={24} />
                      </button>
                    </dialog>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Merchandise;
