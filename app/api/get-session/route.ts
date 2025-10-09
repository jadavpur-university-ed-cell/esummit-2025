import { NextResponse } from "next/server";
import { auth } from "@/auth"; // your existing auth function

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ session: null });
    }
    return NextResponse.json({ session });
  } catch (err) {
    console.error("Error fetching session:", err);
    return NextResponse.json({ session: null });
  }
}
