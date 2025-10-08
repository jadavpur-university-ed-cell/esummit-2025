
import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { auth } from "@/auth";

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const {
            // razorpay_order_id, razorpay_signature,
            razorpay_payment_id, merchandise, amount } = await req.json();

        // const body = razorpay_order_id + "|" + razorpay_payment_id;
        // const expectedSignature = crypto
        //     .createHmac("sha256", process.env.NEXT_RAZORPAY_KEY_SECRET!)
        //     .update(body)
        //     .digest("hex");

        // if (expectedSignature !== razorpay_signature) {
        //     return NextResponse.json({ success: false, error: "Invalid signature" }, { status: 400 });
        // }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: { id: true, shirtSize: true },
        });

        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

        await prisma.merchandiseOrder.create({
            data: {
                orderId: razorpay_payment_id,
                amount,
                merchandise,
                size: user.shirtSize!,
                userId: user.id,
                status: "paid"
            },
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("Error verifying payment:", err);
        return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
    }
}
