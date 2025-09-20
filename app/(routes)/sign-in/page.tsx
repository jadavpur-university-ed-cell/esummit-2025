import SignIn from "@/components/sign-in/SignIn";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Sign In | JU E-Summit",
};

export default function SignInPage() {
  return (
    <Suspense fallback={<></>}>
      <SignIn />
    </Suspense>
  );
}