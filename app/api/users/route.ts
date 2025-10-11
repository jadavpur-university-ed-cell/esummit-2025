import {prisma} from "@/prisma/client";

export async function GET() {
  try {
    const users = await prisma.user.findMany(); // fetch all users
    return new Response(JSON.stringify(users), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch users" }), {
      status: 500,
    });
  }
}
