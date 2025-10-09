import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { auth } from "@/auth";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = await req.json();
    const { amount, merchandise, 
      // couponUsed, couponCode 
    }  = body;

    if (!amount || !merchandise ) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Fetch extra user data from Prisma
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, shirtSize: true },
    });

    if (!user || !user.shirtSize) {
      return NextResponse.json({ error: "Complete your profile first" }, { status: 422 });
    }

    // Generate a unique order ID / receipt
    const receipt = `merch_${crypto.randomBytes(8).toString("hex")}`;

    // Create the MerchandiseOrder in Prisma
    return NextResponse.json({ orderId: receipt });
  } catch (err) {
    console.error("Error creating merchandise order:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
