import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { auth } from "@/auth";
import { verifyMerchandisePayment } from "@/actions/merchandise";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Remove unused 'amount' variable
    const { order_id, merchandise, couponCode } = await req.json();

    if (!order_id || !merchandise) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, shirtSize: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Call the server action to verify Cashfree payment
    const result = await verifyMerchandisePayment({
      order_id,
      merchandise,
      size: user.shirtSize!,
      couponCode,
      userId: user.id,
    });

    if (result.error) {
      return NextResponse.json({ 
        success: false, 
        error: result.error 
      }, { status: 400 });
    }

    return NextResponse.json({ 
      success: true, 
      message: result.message 
    });

  } catch (err) {
    console.error("Error verifying payment:", err);
    return NextResponse.json({ 
      success: false, 
      error: "Server error" 
    }, { status: 500 });
  }
}
