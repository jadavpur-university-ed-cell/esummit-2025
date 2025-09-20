import { auth } from "@/auth";

export default async function DashboardPage() {
  const session = await auth();


  if (!session) {
    return <div>Please sign in to view this page.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl">Welcome, {session.user?.name}</h1>
      <p>Email: {session.user?.email}</p>
    </div>
  );
}