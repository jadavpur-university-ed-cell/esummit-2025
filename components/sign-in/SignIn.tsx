"use client"
import { SignInButton } from "./signInButton";
import { useSearchParams } from "next/navigation";
import Image from 'next/image';

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
        <div className="min-h-screen bg-gradient-to-tr from-indigo via-lavender to-light-purple flex">
      <div className="flex-1 flex">
        {/* Left Side - Image Container */}
        <div className="hidden lg:flex lg:w-1/2 relative">
          <div className="absolute inset-0 flex items-center justify-center p-2">
            <div className="relative w-full h-full max-w-2xl max-h-screeen">
              <Image
                src="/loginbg.webp" // Replace with your actual image path
                alt="Login Illustration"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 1024px) 0px, 50vw"
              />
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 lg:flex-none">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            {/* Mobile Logo/Header */}
            <div className="lg:hidden text-center mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                E-Summit
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">Welcome back</p>
            </div>

            {/* Desktop Header */}
            <div className="hidden lg:block">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Welcome back
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Sign in to your account to continue
              </p>
            </div>

            <div className="mt-8">
              {/* Error Message */}
              {errorMessage && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700 dark:text-red-300">{errorMessage}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Sign In Buttons */}
              <div className="space-y-4">
                <SignInButton provider="google" />
                <SignInButton provider="linkedin" />
              </div>

              {/* Additional Info */}
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  By signing in, you agree to our{" "}
                  <a href="/terms" className="text-indigo hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="text-indigo hover:underline">
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;