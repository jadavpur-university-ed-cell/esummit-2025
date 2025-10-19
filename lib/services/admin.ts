'use server';
import {prisma} from "@/prisma/client";

export const getAllMerchOrders = async () => {
    const orders = await prisma.merchandiseOrder.findMany({
        select: {
            status: true,
            size: true,
            orderId: true,
            user: {
                select: {
                    name: true,
                    email: true,
                    phone: true              
                }
            },
            amount: true
        }
    });
    const filteredOrders = orders.map(order => {
        const filtered = {
            status: order.status,
            name: order.user.name,
            phone: order.user.phone,
            email: order.user.email,
            size: order.size,
            amount: order.amount,
            orderId: order.orderId
        }
        return filtered;
    })
    return filteredOrders;
}