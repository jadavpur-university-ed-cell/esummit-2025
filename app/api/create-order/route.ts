import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { auth } from "@/auth";
import { createMerchandiseOrder } from "@/actions/merchandise";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ 
        success: false, 
        error: "Not authenticated" 
      }, { status: 401 });
    }

    const body = await req.json();
    const { amount, merchandise, couponCode } = body;

    if (!amount || !merchandise) {
      return NextResponse.json({ 
        success: false, 
        error: "Missing required fields" 
      }, { status: 400 });
    }

    // Fetch user data from Prisma
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, shirtSize: true },
    });

    if (!user || !user.shirtSize) {
      return NextResponse.json({ 
        success: false, 
        error: "Complete your profile first" 
      }, { status: 422 });
    }

    // Call the server action to create Cashfree order
    const result = await createMerchandiseOrder({
      amount,
      currency: "INR",
      merchandise,
      size: user.shirtSize,
      couponCode,
      userId: user.id,
    });

    if (result.error) {
      return NextResponse.json({ 
        success: false, 
        error: result.error 
      }, { status: 400 });
    }

    // Add explicit check for result.data before accessing its properties
    if (!result.data) {
      return NextResponse.json({ 
        success: false, 
        error: "Order creation failed - no data returned" 
      }, { status: 500 });
    }

    // Now TypeScript knows result.data is defined
    return NextResponse.json({ 
      success: true,
      data: {
        orderId: result.data.orderId,
        paymentSessionId: result.data.paymentSessionId,
        amount: result.data.amount
      }
    });

  } catch (err) {
    console.error("Error creating merchandise order:", err);
    return NextResponse.json({ 
      success: false, 
      error: "Something went wrong" 
    }, { status: 500 });
  }
}
