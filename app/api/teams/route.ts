import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Define a type for the response data
type TeamWithMembers = {
  id: string;
  memberIds: string[];
  members: {
    id: string;
    name: string;
    email: string;
    college?: string | null;
    image?: string | null;
  }[];
};

type ErrorResponse = {
  message: string;
};

// Handle GET requests
export async function GET() {
  try {
    const teams = await prisma.team.findMany({
      include: {
        members: {
          select: {
            id: true,
            name: true,
            email: true,
            college: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json<TeamWithMembers[]>(teams, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch teams:", error);
    return NextResponse.json<ErrorResponse>(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}

// (Optional) Handle other HTTP methods gracefully
export async function POST() {
  return NextResponse.json(
    { message: "Method POST Not Allowed" },
    { status: 405 }
  );
}
