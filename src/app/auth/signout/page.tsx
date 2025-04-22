"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignOut() {
  const router = useRouter();

  useEffect(() => {
    const performSignOut = async () => {
      await signOut({ redirect: false });
      router.push("/");
    };

    performSignOut();
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 text-center">
        <h2 className="mt-6 text-3xl font-bold tracking-tight">
          Signing out...
        </h2>
        <p className="mt-2 text-sm">
          You will be redirected to the home page shortly.
        </p>
      </div>
    </div>
  );
} 