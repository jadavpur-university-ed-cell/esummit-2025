// app/api/order-by-user/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { auth } from "@/auth";

export async function GET() {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        // Find user first to get the correct user ID
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: { id: true }
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const order = await prisma.merchandiseOrder.findMany({
            where: {
                userId: user.id, // Use the correct user ID from database
            },
            select: {
                status: true,
                size: true,
                amount: true,
                createdAt: true,
                orderId: true,
                merchandise: true, // You might want to include this too
                paymentId: true,   // And this for Cashfree payment IDs
            }
        });

        return NextResponse.json({ order });
    } catch (err) {
        console.error("Error fetching user orders:", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
