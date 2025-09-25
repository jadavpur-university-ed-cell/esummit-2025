import { auth } from "@/auth";
import type { Metadata } from "next";
import { Role } from "@/types/all";

import AdminDashboard from "@/components/dashboard/admin/admin-dashboard";
import SuperAdminDashboard from "@/components/dashboard/super-admin/super-admin-dashboard";
import UserDashboard from "@/components/dashboard/user/user-dashboard";
import NotSigned from "@/components/dashboard/not-signed/not-signed";

import { mockEventData } from "@/mock/mockEventData";
import { mockUserData } from "@/mock/mockUserData";

export const metadata: Metadata = {
  title: "Dashboard | JU E-Summit'25",
};

export default async function DashboardPage() {
  const session = await auth();
  console.log("session is:", session)
  if (!session) {
    <NotSigned />
  }

  if (mockUserData.role === Role.admin) {
    return (
      <AdminDashboard />
    )
  }
  if (mockUserData.role === Role.superadmin) {
    return (
      <SuperAdminDashboard />
    )
  }
  return (
    <UserDashboard
      eventData={mockEventData}
      userData={mockUserData}
    />
  );
}
