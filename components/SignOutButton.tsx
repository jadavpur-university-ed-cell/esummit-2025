import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

export function SignOutButton() {
  return (
    <Button
      onClick={() => signOut()}
      className="px-4 py-2 bg-destructive text-white rounded hover:bg-primary"
    >
      Sign Out
    </Button>
  );
}
