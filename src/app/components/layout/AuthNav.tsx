"use client";

import Link from "next/link";
import { useAuth } from "../AuthContext";
import { signOut } from "next-auth/react";
import { useLanguage } from "../LanguageContext";

export default function AuthNav() {
  const { isAuthenticated, session } = useAuth();
  const { t } = useLanguage();

  return (
    <div className="flex flex-col space-y-4">
      {isAuthenticated ? (
        <>
          <div className="text-center">
            <span className="text-sm font-medium">
              {t.auth.welcome}, {session?.user?.name || "User"}
            </span>
          </div>
          <div className="flex flex-col space-y-2">
            <Link
              href="/dashboard"
              className="rounded bg-emerald-600 px-3 py-2 text-center text-sm text-white hover:bg-emerald-500"
            >
              {t.auth.dashboard}
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="rounded border border-gray-300 px-3 py-2 text-center text-sm hover:bg-gray-100"
            >
              {t.auth.signOut}
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col space-y-2">
          <Link
            href="/auth/signin"
            className="rounded bg-emerald-600 px-3 py-2 text-center text-sm text-white hover:bg-emerald-500"
          >
            {t.auth.signIn}
          </Link>
          <Link
            href="/auth/signup"
            className="rounded border border-gray-300 px-3 py-2 text-center text-sm hover:bg-gray-100"
          >
            {t.auth.signUp}
          </Link>
        </div>
      )}
    </div>
  );
} 