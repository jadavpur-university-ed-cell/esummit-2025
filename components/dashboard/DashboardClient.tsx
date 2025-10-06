"use client";

import { useEffect, useState } from "react";
import { Role } from "@/types/all";
import { User } from "@prisma/client";

import AdminDashboard from "@/components/dashboard/admin/admin-dashboard";
import SuperAdminDashboard from "@/components/dashboard/super-admin/super-admin-dashboard";
import UserDashboard from "@/components/dashboard/user/user-dashboard";
import NotSigned from "@/components/dashboard/not-signed/not-signed";
import { mockEventData } from "@/mock/mockEventData";
import { DashboardClientProps } from "@/types/all";

export default function DashboardClient({ session }: DashboardClientProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const profileImage = session.user?.image ?? "/default-profile.png";

  useEffect(() => {
    if (!session) return; // wait until session exists

    (async () => {
      try {
        "use server";
        const res = await fetch("/api/find-user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ session }),
          // credentials: "include"
        });
        if (!res.ok) throw new Error("Failed to load user");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [session]);

  if (!session || loading) return <p className="text-black min-h-screen">Loading...</p>;
  if (!user) return <NotSigned />;

  switch (user.role) {
    case Role.ADMIN:
      return <AdminDashboard />;
    case Role.SUPER_ADMIN:
      return <SuperAdminDashboard />;
    default:
      return <UserDashboard
        eventData={mockEventData}
        userData={user}
        profileImage={profileImage}
      />;
  }
}
