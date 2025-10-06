import { auth } from "@/auth";
import type { Metadata } from "next";

import NotSigned from "@/components/dashboard/not-signed/not-signed";
import DashboardClient from "@/components/dashboard/DashboardClient";

export const metadata: Metadata = {
  title: "Dashboard | JU E-Summit'25",
};

export default async function DashboardPage() {
  const session = await auth();
  console.log("Dashboard - session is:", session)
  
  if (!session?.user?.email) {
    console.log("No session found");
    return (
      <NotSigned />
    )}
  
  console.log("Session found bitch");
  return <DashboardClient session={session} />
}
