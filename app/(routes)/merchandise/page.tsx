import  getServerSession from 'next-auth';
import { prisma } from '@/prisma/client';
import MerchandiseClient from '@/components/merchandise/MerchandiseCSR';

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

export default async function MerchandisePage() {
  // TODO: Fix auth logic
//   const session = await getServerSession();
  
//   let userDetails: UserDetails | null = null;

//   if (session?.user?.email) {
//     const user = await prisma.user.findUnique({
//       where: { email: session.user.email },
//       select: {
//         id: true,
//         name: true,
//         email: true,
//         shirtSize: true,
//         college: true,
//         year: true,
//         branch: true,
//       }
//     });


    // if (user) {
    //   userDetails = user;
    // }
//   }

  const merchandiseData = {
    SHIRT: {
      name: "E-Summit'25 T-Shirt",
      description: "Presenting the Official Merch of E-Summit'25. Grab your hands on the exclusive merchandise of E-Summit'25! A round-necked T-Shirt with a 200 GSM fabric, perfect for your casual outings.",
      image: "/shirt.png",
      originalPrice: SHIRT_PRICE
    },
    // CAP: {
    //   name: "E-Summit'25 Cap",
    //   description: "Official E-Summit'25 Cap. High-quality fabric with embroidered logo. Perfect for sunny days and showcasing your E-Summit spirit!",
    //   image: "/cap.png",
    //   originalPrice: CAP_PRICE
    // }
  };

  const pricingConfig = {
    shirtPrice: SHIRT_PRICE,
    capPrice: CAP_PRICE,
    developerCouponCode: DEVELOPER_COUPON_CODE,
    developerPrice: DEVELOPER_PRICE,
    razorpayKeyId: RAZORPAY_KEY_ID,
  };

  return (
    <></>
    // <MerchandiseClient 
    //   userDetails={userDetails}
    //   merchandiseData={merchandiseData}
    //   pricingConfig={pricingConfig}
    // />
  );
}