"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "../../components/LanguageContext";

export default function AuthError() {
  const searchParams = useSearchParams();
  const { t } = useLanguage();
  const error = searchParams.get("error");

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case "Configuration":
        return t.auth.error;
      case "AccessDenied":
        return t.auth.accessDenied;
      case "Verification":
        return t.auth.verificationError;
      default:
        return t.auth.error;
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-red-600">
            {getErrorMessage(error)}
          </h2>
          <p className="mt-2 text-center text-sm">
            <Link href="/auth/signin" className="font-medium text-emerald-600 hover:text-emerald-500">
              {t.auth.returnToSignIn}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 