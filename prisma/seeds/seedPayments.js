import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function seedPayments() {
  console.log("🌱 Seeding Payments...");

  await prisma.payments.deleteMany(); // clear old data

  const users = await prisma.user.findMany();
  if (users.length < 2) {
    console.log("⚠️ Not enough users. Run seedUsers first.");
    return;
  }

  const payment1 = await prisma.payments.create({
    data: {
      userId: users[0].id,
      amount: 499,
      paymentMethod: "UPI",          // string from enum
      transactionId: "TXN123ABC",
      status: "COMPLETED",           // string from enum
    },
  });

  const payment2 = await prisma.payments.create({
    data: {
      userId: users[1].id,
      amount: 999,
      paymentMethod: "CARD",
      transactionId: "TXN456XYZ",
      status: "PENDING",
    },
  });

  console.log("✅ Payments seeded:", [payment1.id, payment2.id]);
}
