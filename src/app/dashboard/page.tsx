"use client";

import { useAuth } from "../components/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { isAuthenticated, status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Loading...</h2>
                </div>
            </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Dashboard Card 1 */}
        <div className="rounded-lg border p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Profile Overview</h2>
          <p className="text-gray-600">
            View and manage your profile information.
          </p>
          <button className="mt-4 rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-500">
            View Profile
          </button>
        </div>

        {/* Dashboard Card 2 */}
        <div className="rounded-lg border p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Recent Activity</h2>
          <p className="text-gray-600">
            Check your recent account activity and notifications.
          </p>
          <button className="mt-4 rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-500">
            View Activity
                </button>
            </div>

        {/* Dashboard Card 3 */}
        <div className="rounded-lg border p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Settings</h2>
          <p className="text-gray-600">
            Manage your account settings and preferences.
          </p>
          <button className="mt-4 rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-500">
            Manage Settings
          </button>
        </div>
      </div>
    </div>
  );
}