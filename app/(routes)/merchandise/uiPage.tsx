import React from 'react';
import { FaXmark } from 'react-icons/fa6';
import Image from 'next/image';

export default function Merchandise() {
    return (
        <>
            <section className="text-gray-600 body-font overflow-hidden bg-[#1b1c3d]">
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

                                {/* //TODO: Apply such a logic where the genderand size of the user is shown and initialised as the order value */}
                                {/* Gender Here  */}
                                <span className="flex ml-3 pl-3 py-2 space-x-2">
                                    Shirt Size: XL
                                    {/* {userDetails.size ? userDetails.size : "Not provided."} */}
                                </span>
                                <span className="flex ml-3 pl-3 py-2 border-l-2 border-[#ffffff] space-x-2">
                                    Gender: M
                                    {/* {userDetails.gender ? userDetails.gender : "Not provided."} */}
                                </span>
                            </div>
                            <p className="leading-relaxed text-[#eae2b7]">
                                Presenting the Official Merch of E-Summit&apos;25. Grab your hands on the exclusive merchandise of E-Summit&apos;25!
                                A round-necked T-Shirt with a 200 GSM fabric, perfect for your casual outings. <br /><br />
                                <span className='font-semibold text-[#ffffff]'>Note:</span> This is a non Customizable Shirt, Organizing Comitee Members are asked to contact the Logistic Team for their Customized Shirts.
                            </p>

                            <div className="flex my-6">
                                <span className="title-font font-medium text-2xl text-white">₹300.00</span>
                                <button
                                    className="flex ml-auto bg-[#c085fd] text-[#101720] font-semibold border-0 py-2 px-6 focus:outline-none hover:bg-[#EAE2B7] rounded-full"
                                    // onClick={togglePaymentWindow}
                                    >
                                    Buy
                                </button>
                                <dialog
                                    // ref={editUserRef}
                                    className="relative h-[90vh] w-[70vw] rounded-xl backdrop:bg-[#00000080] bg-[#101720] text-[#c085fd] font-semibold">
                                    {/* <Payment uid={userDetails.id} /> */}
                                    <button
                                        // onClick={togglePaymentWindow}
                                        className="absolute top-4 right-4 text-white">
                                        <FaXmark />
                                    </button>
                                </dialog>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}