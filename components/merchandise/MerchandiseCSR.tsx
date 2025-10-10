'use client';
import React, { useState, useRef, useEffect } from 'react';
import { FaXmark} from 'react-icons/fa6';
import { FaCheckCircle } from 'react-icons/fa';
import Image from 'next/image';

// Remove the conflicting global declarations
// These will come from the global types file

interface UserDetails {
  id: string;
  name: string;
  email: string;
  shirtSize?: string;
  college: string;
  year: string;
  branch: string;
}

interface MerchandiseItem {
  name: string;
  description: string;
  image: string;
  originalPrice: number;
}

interface MerchandiseData {
  SHIRT: MerchandiseItem;
}

interface PricingConfig {
  shirtPrice: number;
  developerCouponCode: string;
  developerPrice: number;
  cashfreeClientId: string;
}

type PaymentStatus = 'idle' | 'processing' | 'success' | 'failed';

interface MerchandiseClientProps {
  userDetails: UserDetails | null;
  merchandiseData: MerchandiseData;
  pricingConfig: PricingConfig;
}

export default function MerchandiseClient({ 
  userDetails, 
  merchandiseData, 
  pricingConfig 
}: MerchandiseClientProps) {
    const [selectedMerch, setSelectedMerch] = useState<'SHIRT'>('SHIRT');
    const [size, setSize] = useState(userDetails?.shirtSize || 'XL');
    const [couponCode, setCouponCode] = useState('');
    const [discountedPrice, setDiscountedPrice] = useState<number | null>(null);
    const [couponMessage, setCouponMessage] = useState('');
    const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle');
    const [paymentMessage, setPaymentMessage] = useState('');
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);
    const paymentDialogRef = useRef<HTMLDialogElement>(null);
    const statusModalRef = useRef<HTMLDialogElement>(null);

    // Load Cashfree SDK
    useEffect(() => {
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

        return () => {
            // Cleanup script on unmount
            const existingScript = document.querySelector('script[src="https://sdk.cashfree.com/js/v3/cashfree.js"]');
            if (existingScript) {
                document.head.removeChild(existingScript);
            }
        };
    }, []);

    // Auto-close success modal and redirect
    useEffect(() => {
        if (paymentStatus === 'success' && statusModalRef.current) {
            statusModalRef.current.showModal();
            const timer = setTimeout(() => {
                closeStatusModalAndRedirect();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [paymentStatus]);

    const currentMerch = merchandiseData[selectedMerch];

    const validateCoupon = (code: string): { isValid: boolean; discountedPrice: number; message: string } => {
        if (code === pricingConfig.developerCouponCode) {
            return {
                isValid: true,
                discountedPrice: pricingConfig.developerPrice,
                message: 'Developer discount applied!'
            };
        }
        return {
            isValid: false,
            discountedPrice: currentMerch.originalPrice,
            message: 'Invalid coupon code'
        };
    };

    const handleCouponApply = () => {
        if (!couponCode.trim()) {
            setCouponMessage('Please enter a coupon code');
            setDiscountedPrice(null);
            return;
        }

        const validation = validateCoupon(couponCode.trim());
        setDiscountedPrice(validation.isValid ? validation.discountedPrice : null);
        setCouponMessage(validation.message);
    };

    const getFinalPrice = () => {
        return discountedPrice !== null ? discountedPrice : currentMerch.originalPrice;
    };

    const togglePaymentWindow = () => {
        if (!userDetails) {
            alert('Please login to purchase merchandise');
            return;
        }

        if (paymentDialogRef.current) {
            if (paymentDialogRef.current.open) {
                paymentDialogRef.current.close();
            } else {
                paymentDialogRef.current.showModal();
            }
        }
    };

    const closeStatusModalAndRedirect = () => {
        if (statusModalRef.current) {
            statusModalRef.current.close();
        }
        setPaymentStatus('idle');
        window.location.href = '/dashboard';
    };

    const verifyPayment = async (orderId: string) => {
        try {
            const verifyRes = await fetch("/api/verify-payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    order_id: orderId,
                    merchandise: selectedMerch
                }),
            });

            const result = await verifyRes.json();
            
            if (result.success) {
                setPaymentStatus('success');
                setPaymentMessage('Payment completed successfully! Redirecting to dashboard...');
            } else {
                setPaymentStatus('failed');
                setPaymentMessage("Payment verification failed: " + (result.error || "Unknown error"));
            }
        } catch (error) {
            console.error("Verification error:", error);
            setPaymentStatus('failed');
            setPaymentMessage("Payment verification failed!");
        }
    };

    const handlePayment = async () => {
        if (!userDetails || !isScriptLoaded || !window.Cashfree) {
            alert('Payment system not ready. Please wait and try again.');
            return;
        }

        try {
            setPaymentStatus('processing');
            togglePaymentWindow();

            // STEP 1 — Create order on backend
            const res = await fetch("/api/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: getFinalPrice(),
                    merchandise: selectedMerch
                }),
            });
            
            const result = await res.json();
            
            // Check if the API call was successful
            if (!result.success) {
                console.error("Order creation failed:", result.error);
                throw new Error(result.error || "Unknown error");
            }
            
            // Check if result.data exists before destructuring
            if (!result.data) {
                console.error("Order creation failed: No data returned");
                throw new Error("No order data received");
            }

            const { orderId, paymentSessionId } = result.data;
            
            if (!orderId || !paymentSessionId) {
                console.error("Missing order details:", result.data);
                throw new Error("Missing order details");
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
                throw new Error(paymentResult.error.message);
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

        } catch (error) {
            console.error('Payment error:', error);
            setPaymentStatus('failed');
            setPaymentMessage(error instanceof Error ? error.message : 'Payment failed. Please try again.');
        }
    };

    return (
        <>
            <section className="text-gray-600 body-font overflow-hidden bg-[#1b1c3d]">
                <h1 className="text-4xl text-[#c085fd] mt-8 justify-center font-bold text-center">
                    E-Summit&apos;25 Merchandise
                </h1>
                
                {/* Merchandise Selection Tabs */}
                <div className="flex justify-center mt-6">
                    <div className="bg-[#2d2e5a] rounded-lg p-1">
                        <button
                            onClick={() => setSelectedMerch('SHIRT')}
                            className={`px-6 py-2 rounded-md font-semibold transition-colors ${
                                selectedMerch === 'SHIRT' 
                                    ? 'bg-[#c085fd] text-[#101720]' 
                                    : 'text-[#c085fd] hover:bg-[#3a3b6a]'
                            }`}
                        >
                            T-Shirt
                        </button>
                    </div>
                </div>

                <div className="container px-5 py-8 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <Image
                            width={500}
                            height={500}
                            alt="E-Summit 25 Official T-Shirt"
                            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                            src={currentMerch.image}
                        />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-sm title-font text-[#ffffff] tracking-widest">
                                {selectedMerch}
                            </h2>
                            <h1 className="text-[#c085fd] text-2xl title-font font-semibold mb-1">
                                {currentMerch.name}
                            </h1>
                            
                            {/* User Details Display */}
                            <div className="flex mb-4 text-grey-200">
                                <span className="flex ml-3 pl-3 py-2 space-x-2 text-white">
                                    Your Size: {userDetails?.shirtSize || 'Not set'}
                                </span>
                            </div>

                            {/* Size Selection Only */}
                            <div className="flex flex-col gap-4 mb-4">
                                <div className="flex items-center gap-4">
                                    <span className="text-white">Select Size:</span>
                                    <select 
                                        value={size} 
                                        onChange={(e) => setSize(e.target.value)}
                                        className="bg-[#2d2e5a] text-white px-3 py-2 rounded border border-[#c085fd]"
                                    >
                                        <option value="S">S</option>
                                        <option value="M">M</option>
                                        <option value="L">L</option>
                                        <option value="XL">XL</option>
                                        <option value="XXL">XXL</option>
                                    </select>
                                </div>
                                <p className="text-sm text-[#eae2b7]">
                                    All merchandise is unisex. Your selected size will be saved to your profile.
                                </p>
                            </div>

                            <p className="leading-relaxed text-[#eae2b7]">
                                {currentMerch.description}
                                <br /><br />
                                <span className='font-semibold text-[#ffffff]'>Note:</span> This is a unisex T-Shirt. Organizing Committee Members are asked to contact the Logistic Team for their Customized Shirts.
                            </p>

                            {/* Coupon Code Section */}
                            <div className="mt-6">
                                <div className="flex items-center gap-2 mb-2">
                                    <input
                                        type="text"
                                        placeholder="Enter coupon code"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                        className="flex-1 bg-[#2d2e5a] text-white px-3 py-2 rounded border border-[#c085fd] placeholder-gray-400"
                                    />
                                    <button
                                        onClick={handleCouponApply}
                                        className="bg-[#c085fd] text-[#101720] font-semibold px-4 py-2 rounded hover:bg-[#EAE2B7] transition-colors"
                                    >
                                        Apply
                                    </button>
                                </div>
                                {couponMessage && (
                                    <p className={`text-sm ${discountedPrice ? 'text-green-400' : 'text-red-400'}`}>
                                        {couponMessage}
                                    </p>
                                )}
                            </div>

                            {/* Price and Buy Button */}
                            <div className="flex items-center mt-6">
                                <div className="flex items-center gap-4">
                                    {discountedPrice !== null ? (
                                        <>
                                            <span className="title-font font-medium text-2xl text-green-400">
                                                ₹{discountedPrice}
                                            </span>
                                            <span className="title-font font-medium text-lg text-gray-400 line-through">
                                                ₹{currentMerch.originalPrice}
                                            </span>
                                        </>
                                    ) : (
                                        <span className="title-font font-medium text-2xl text-white">
                                            ₹{currentMerch.originalPrice}
                                        </span>
                                    )}
                                </div>
                                <button
                                    className={`flex ml-auto font-semibold border-0 py-2 px-6 focus:outline-none rounded-full transition-colors ${
                                        !userDetails || !isScriptLoaded || paymentStatus === 'processing'
                                            ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                                            : 'bg-[#c085fd] text-[#101720] hover:bg-[#EAE2B7]'
                                    }`}
                                    onClick={togglePaymentWindow}
                                    disabled={!userDetails || !isScriptLoaded || paymentStatus === 'processing'}
                                >
                                    {!userDetails 
                                        ? 'Login to Purchase' 
                                        : !isScriptLoaded 
                                        ? 'Loading...' 
                                        : paymentStatus === 'processing' 
                                        ? 'Processing...' 
                                        : 'Buy Now'
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Confirmation Dialog */}
                <dialog
                    ref={paymentDialogRef}
                    className="relative h-[90vh] w-[70vw] rounded-xl backdrop:bg-[#00000080] bg-[#101720] text-[#c085fd] font-semibold p-6"
                >
                    <div className="h-full flex flex-col">
                        <button
                            onClick={togglePaymentWindow}
                            className="absolute top-4 right-4 text-white text-xl hover:text-[#EAE2B7] transition-colors"
                        >
                            <FaXmark />
                        </button>
                        
                        <h2 className="text-2xl mb-6 text-center">Confirm Your Order</h2>
                        
                        <div className="flex-1 grid grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h3 className="text-xl border-b border-[#c085fd] pb-2">Order Details</h3>
                                <div className="space-y-2 text-white">
                                    <p><strong>Item:</strong> {currentMerch.name}</p>
                                    <p><strong>Size:</strong> {size}</p>
                                    <p><strong>Original Price:</strong> ₹{currentMerch.originalPrice}</p>
                                    {discountedPrice && (
                                        <p className="text-green-400"><strong>Discounted Price:</strong> ₹{discountedPrice}</p>
                                    )}
                                    <p className="text-lg font-bold border-t border-[#c085fd] pt-2">
                                        <strong>Final Amount:</strong> ₹{getFinalPrice()}
                                    </p>
                                </div>

                                <h3 className="text-xl border-b border-[#c085fd] pb-2 mt-6">Delivery Info</h3>
                                <div className="space-y-2 text-white">
                                    <p><strong>Name:</strong> {userDetails?.name}</p>
                                    <p><strong>Email:</strong> {userDetails?.email}</p>
                                    <p><strong>College:</strong> {userDetails?.college}</p>
                                    <p><strong>Shirt Size:</strong> {userDetails?.shirtSize || 'Not set'}</p>
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <h3 className="text-xl border-b border-[#c085fd] pb-2">Payment</h3>
                                <p className="text-white">You will be redirected to Cashfree secure payment gateway to complete your purchase.</p>
                                
                                <button
                                    onClick={handlePayment}
                                    disabled={paymentStatus === 'processing' || !isScriptLoaded}
                                    className="w-full bg-[#c085fd] text-[#101720] font-semibold py-3 px-6 rounded-lg hover:bg-[#EAE2B7] transition-colors mt-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    {paymentStatus === 'processing' 
                                        ? 'Processing...' 
                                        : !isScriptLoaded 
                                        ? 'Loading Payment Gateway...' 
                                        : `Proceed to Pay ₹${getFinalPrice()}`
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </dialog>

                {/* Payment Status Modal */}
                <dialog
                    ref={statusModalRef}
                    className="relative rounded-xl backdrop:bg-[#00000080] bg-[#101720] text-white p-8 max-w-md"
                >
                    <div className="text-center">
                        {paymentStatus === 'success' && (
                            <>
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FaCheckCircle className="w-8 h-8 text-green-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-green-400 mb-2">Payment Successful!</h3>
                                <p className="text-gray-300 mb-6">{paymentMessage}</p>
                                <div className="text-sm text-gray-400 mb-4">
                                    Redirecting to dashboard in 3 seconds...
                                </div>
                                <button
                                    onClick={closeStatusModalAndRedirect}
                                    className="bg-[#c085fd] text-[#101720] font-semibold py-2 px-6 rounded-lg hover:bg-[#EAE2B7] transition-colors"
                                >
                                    Go to Dashboard Now
                                </button>
                            </>
                        )}
                        
                        {paymentStatus === 'failed' && (
                            <>
                                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FaXmark className="w-8 h-8 text-red-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-red-400 mb-2">Payment Failed</h3>
                                <p className="text-gray-300 mb-6">{paymentMessage}</p>
                                <button
                                    onClick={() => {
                                        if (statusModalRef.current) {
                                            statusModalRef.current.close();
                                        }
                                        setPaymentStatus('idle');
                                    }}
                                    className="bg-[#c085fd] text-[#101720] font-semibold py-2 px-6 rounded-lg hover:bg-[#EAE2B7] transition-colors"
                                >
                                    Try Again
                                </button>
                            </>
                        )}

                        {paymentStatus === 'processing' && (
                            <>
                                <div className="w-16 h-16 border-4 border-[#c085fd] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                <h3 className="text-2xl font-bold text-[#c085fd] mb-2">Processing Payment</h3>
                                <p className="text-gray-300">Please wait while we process your payment...</p>
                            </>
                        )}
                    </div>
                </dialog>
            </section>
        </>
    );
}
