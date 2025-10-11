import { NextRequest, NextResponse } from "next/server";
// import { useSession } from "next-auth/react";
import { auth } from "@/auth"; 
import {prisma} from "@/prisma/client";

export async function POST(req: NextRequest) {
  try {
    // Get logged-in user session
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = await req.json();
    const { phone, college, year, branch, rollNo, shirtSize } = body;

    // Basic validation (can be extended)
    if (!phone || !college || !year || !branch) {
      return NextResponse.json(
        { error: "Please fill all required fields" },
        { status: 400 }
      );
    }

    // Update the user record in the DB
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        phone,
        college,
        year,
        branch,
        rollNo: rollNo || null,
        shirtSize: shirtSize || null,
      },
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (err) {
    console.error("Error in editing-profile:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
