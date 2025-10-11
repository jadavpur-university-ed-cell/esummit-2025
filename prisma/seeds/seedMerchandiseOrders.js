import {prisma} from "@/prisma/client";

export async function seedMerchandiseOrders() {
  console.log("🌱 Seeding Merchandise Orders...");

  await prisma.merchandiseOrder.deleteMany(); // clear old data

  const users = await prisma.user.findMany();
  if (users.length < 2) {
    console.log("⚠️ Not enough users. Run seedUsers first.");
    return;
  }

  const order1 = await prisma.merchandiseOrder.create({
    data: {
      orderId: "ORD123",
      amount: 499,
      currency: "INR",          // optional, default is INR
      userId: users[0].id,
      merchandise: "SHIRT",     // enum value as string
      size: "M",
      couponUsed: true,
      couponCode: "DISCOUNT50",
      // status, createdAt, updatedAt will use defaults
    },
  });

  const order2 = await prisma.merchandiseOrder.create({
    data: {
      orderId: "ORD456",
      amount: 999,
      userId: users[1].id,
      merchandise: "SHIRT",
      size: "L",
      couponUsed: false,
      // couponCode omitted because couponUsed is false
    },
  });

  console.log("✅ Merchandise Orders seeded:", [order1.id, order2.id]);
}

