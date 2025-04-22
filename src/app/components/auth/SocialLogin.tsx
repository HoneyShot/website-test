"use client";

import { signIn } from "next-auth/react";
import { useLanguage } from "../LanguageContext";
import { FaGoogle, FaGithub } from "react-icons/fa";

interface SocialLoginProps {
  className?: string;
}

export default function SocialLogin({ className = "" }: SocialLoginProps) {
  const { t } = useLanguage();

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };

  const handleGithubSignIn = () => {
    signIn("github", { callbackUrl: "/dashboard" });
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500">{t.auth.orContinueWith}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleGoogleSignIn}
          className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          <FaGoogle className="h-5 w-5 text-red-500" />
          <span>Google</span>
        </button>

        <button
          onClick={handleGithubSignIn}
          className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          <FaGithub className="h-5 w-5 text-gray-900" />
          <span>GitHub</span>
        </button>
      </div>
    </div>
  );
} 