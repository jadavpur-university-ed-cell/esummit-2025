'use client';
import React, { useState, useRef, useEffect } from 'react';
import { FaXmark} from 'react-icons/fa6';
import { FaCheckCircle } from 'react-icons/fa';
import Image from 'next/image';
import { createMerchandiseOrder, verifyMerchandisePayment } from '@/actions/merchandise';

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
//   CAP: MerchandiseItem;
}

interface PricingConfig {
  shirtPrice: number;
//   capPrice: number;
  developerCouponCode: string;
  developerPrice: number;
  razorpayKeyId: string;
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
    // const [selectedMerch, setSelectedMerch] = useState<'SHIRT' | 'CAP'>('SHIRT');
    const [selectedMerch, setSelectedMerch] = useState<'SHIRT'>('SHIRT');
    const [size, setSize] = useState(userDetails?.shirtSize || 'XL');
    const [couponCode, setCouponCode] = useState('');
    const [discountedPrice, setDiscountedPrice] = useState<number | null>(null);
    const [couponMessage, setCouponMessage] = useState('');
    const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle');
    const [paymentMessage, setPaymentMessage] = useState('');
    const paymentDialogRef = useRef<HTMLDialogElement>(null);
    const statusModalRef = useRef<HTMLDialogElement>(null);

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

    const handlePayment = async () => {
        if (!userDetails) {
            alert('Please login to purchase merchandise');
            return;
        }

        try {
            setPaymentStatus('processing');
            togglePaymentWindow();

            const paymentData = {
                amount: getFinalPrice(),
                currency: 'INR',
                merchandise: selectedMerch,
                size,
                couponCode: couponCode || undefined,
                userId: userDetails.id
            };

            // Create order via Server Action
            const orderResult = await createMerchandiseOrder(paymentData);

            if (orderResult.error) {
                throw new Error(orderResult.error);
            }

            if (!orderResult.data) {
                throw new Error('No order data received');
            }

            const orderData = orderResult.data;

            // Load Razorpay script
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => {
                const options = {
                    key: pricingConfig.razorpayKeyId,
                    amount: orderData.amount,
                    currency: orderData.currency,
                    name: 'E-Summit 2025',
                    description: `E-Summit'25 ${selectedMerch.toLowerCase()} purchase`,
                    order_id: orderData.id,
                    handler: async function (response: RazorpayResponse) {
                        try {
                            // Verify payment via Server Action
                            const verificationResult = await verifyMerchandisePayment({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                merchandise: selectedMerch,
                                size,
                                couponCode: couponCode || undefined,
                                userId: userDetails.id
                            });

                            if (verificationResult.success) {
                                setPaymentStatus('success');
                                setPaymentMessage('Payment completed successfully! Redirecting to dashboard...');
                            } else {
                                setPaymentStatus('failed');
                                setPaymentMessage(verificationResult.error || 'Payment verification failed');
                            }
                        } catch (error) {
                            console.error('Payment verification error:', error);
                            setPaymentStatus('failed');
                            setPaymentMessage('Error verifying payment. Please contact support.');
                        }
                    },
                    prefill: {
                        name: userDetails.name,
                        email: userDetails.email,
                        contact: '',
                    },
                    theme: {
                        color: '#c085fd',
                    },
                    modal: {
                        ondismiss: function() {
                            setPaymentStatus('idle');
                        }
                    }
                };

                const rzp = new window.Razorpay(options);
                rzp.open();
            };
            document.body.appendChild(script);
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
                        {/* <button
                            onClick={() => setSelectedMerch('CAP')}
                            className={`px-6 py-2 rounded-md font-semibold transition-colors ${
                                selectedMerch === 'CAP' 
                                    ? 'bg-[#c085fd] text-[#101720]' 
                                    : 'text-[#c085fd] hover:bg-[#3a3b6a]'
                            }`}
                        >
                            Cap
                        </button> */}
                    </div>
                </div>

                <div className="container px-5 py-8 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <Image
                            width={500}
                            height={500}
                            alt="ecommerce"
                            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                            src={currentMerch.image}
                        />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-sm title-font text-[#ffffff] tracking-widest">
                                {/* {selectedMerch === 'SHIRT' ? 'T-SHIRT' : 'CAP'} */}
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
                                <span className='font-semibold text-[#ffffff]'>Note:</span> {
                                    selectedMerch === 'SHIRT' 
                                        ? "This is a unisex T-Shirt. Organizing Committee Members are asked to contact the Logistic Team for their Customized Shirts." : ""
                                        // : "This cap comes in one size fits all and is unisex. Organizing Committee Members should contact the Logistic Team for any special requirements."
                                }
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
                                    className="flex ml-auto bg-[#c085fd] text-[#101720] font-semibold border-0 py-2 px-6 focus:outline-none hover:bg-[#EAE2B7] rounded-full transition-colors"
                                    onClick={togglePaymentWindow}
                                >
                                    {userDetails ? 'Buy Now' : 'Login to Purchase'}
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
                                <p className="text-white">You will be redirected to Razorpay secure payment gateway to complete your purchase.</p>
                                
                                <button
                                    onClick={handlePayment}
                                    disabled={paymentStatus === 'processing'}
                                    className="w-full bg-[#c085fd] text-[#101720] font-semibold py-3 px-6 rounded-lg hover:bg-[#EAE2B7] transition-colors mt-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    {paymentStatus === 'processing' ? 'Processing...' : `Proceed to Pay ₹${getFinalPrice()}`}
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