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

        const order = await prisma.merchandiseOrder.findMany({
            where: {
                userId: session.user.id,
            },
            select: {
                status: true,
                size: true,
                amount: true,
                createdAt: true,
                orderId: true
            }
        });

        return NextResponse.json({ order });
    } catch (err) {
        console.error("Error fetching user orders:", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
