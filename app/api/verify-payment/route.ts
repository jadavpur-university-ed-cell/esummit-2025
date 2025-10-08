import crypto from "crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function POST(req: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ success: false, error: "Invalid signature" }, { status: 400 });
    }

    // Update MerchandiseOrder in DB
    await prisma.merchandiseOrder.update({
      where: { orderId: razorpay_order_id },
      data: { paymentId: razorpay_payment_id, status: "paid" },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error verifying payment:", err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
