"use client"
import { SignInButton } from "./signInButton";
import { useSearchParams } from "next/navigation";

type AuthErrorType =
  | "AccessDenied"
  | "OAuthAccountNotLinked"
  | "Configuration"
  | "Callback"
  | "Verification"
  | "Default"
  | string; 

const SignIn = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error") as AuthErrorType | null;

  const errorMessage = (() => {
    switch (error) {
      case "AccessDenied":
        return "You're not allowed to sign in with this email domain.";
      case "OAuthAccountNotLinked":
        return "This account is already linked with a different provider.";
      case "Configuration":
        return "There was a configuration issue.";
      case "Callback":
        return "Something went wrong during sign-in. Please try again.";
       default:
        return error ? "An unknown error occurred." : null;
    }
  })();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-4">
      <h1 className="text-2xl font-bold">Sign in</h1>
      {errorMessage && (
        <div className="text-destructive bg-red-100 px-4 py-2 rounded text-sm">
          {errorMessage}
        </div>
      )}
      <div className="flex flex-col gap-4">
        <SignInButton provider="google" />
        <SignInButton provider="linkedin" />
      </div>
    </div>
  );
}

export default SignIn;