import { signIn } from "next-auth/react";
import { Button } from "../ui/button";

interface SignInButtonProps {
  provider: "google" | "linkedin";
  label?: string;
}

export function SignInButton({ provider, label }: SignInButtonProps) {
  return (
    <Button
      onClick={() => signIn(provider, {callbackUrl: "/dashboard"})}
      className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/10 cursor-pointer"
    >
      {label ?? `Sign in with ${provider.charAt(0).toUpperCase() + provider.slice(1)}`}
    </Button>
  );
}