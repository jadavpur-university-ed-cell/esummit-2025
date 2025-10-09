"use client"
import { SignInButton } from "./signInButton";
import { useSearchParams } from "next/navigation";
import Image from 'next/image';
import Link from "next/link";

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

  // const errorMessage = (() => {
  //   switch (error) {
  //     case "AccessDenied":
  //       return "You're not allowed to sign in with this email domain.";
  //     case "OAuthAccountNotLinked":
  //       return "This account is already linked with a different provider.";
  //     case "Configuration":
  //       return "There was a configuration issue.";
  //     case "Callback":
  //       return "Something went wrong during sign-in. Please try again.";
  //     default:
  //       return error ? "An unknown error occurred." : null;
  //   }
  // })();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center md:flex-row"
      style={{
        backgroundImage: 'url(/background.png)',
        backgroundSize: 'auto 100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left',
      }}>
        
      {/* Left Gallery Absolute */}
      <div className="hidden lg:block absolute inset-y-0 left-0 w-1/2">
        <div className="relative w-full h-full">
          <Image
            src="/loginbg.webp"
            alt="Login Illustration"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 50vw"
          />
        </div>
      </div>


      {/* Right Side - Login Form */}
      <div className="flex w-5/6 items-center justify-center md:justify-end px-8">
        <div className="flex flex-col py-12 px-6 bg-white/10 backdrop-blur-md rounded-xl max-w-sm w-full">
          {/* Mobile Logo/Header */}
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-4xl font-bold text-[#c084fc] bg-clip-text">
              E-Summit
            </h1>
            <h1 className="text-[#afb2f5] font-medium mt-2">Welcome back</h1>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:block">
            <h2 className="text-4xl font-bold text-[#afb2f5]">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-white">
              Sign in to your account to continue
            </p>
          </div>

          <div className="mt-8">
            {/* Sign In Buttons */}
            <div className="space-y-4">
              <SignInButton provider="google" />
              <SignInButton provider="linkedin" />
            </div>

            {/* Additional Info */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                By signing in, you agree to our{" "}
                <Link href="/privacy-policy.pdf" className="text-indigo hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
