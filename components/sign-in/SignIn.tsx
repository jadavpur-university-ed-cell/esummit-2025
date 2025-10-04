"use client"
import { SignInButton } from "./signInButton";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

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
    <div
      className="min-h-screen flex items-center justify-center pb-5"
      style={{
        backgroundImage: 'url(/background.png)',
        backgroundSize: 'auto 100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left',
      }}
    >
      <div className="flex flex-col items-center justify-center bg-white/20 backdrop-blur-md rounded-xl p-22 text-center text-white">
        <Image
          src="/home/logo.svg"
          alt="E-Summit Logo"
          width={500}
          height={500}
          className="drop-shadow-[0px_32px_32px_rgba(80,0,180,0.45)]"
        />
        <div className="flex flex-col mt-10 gap-4">
          <SignInButton provider="google" />
          <SignInButton provider="linkedin" />
        </div>
      </div>
    </div>
  );
}

export default SignIn;