"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "../../components/LanguageContext";
import { useLegalModal } from "../../components/legal/LegalModalContext";
import { FaGoogle, FaGithub, FaUser } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { FiEye, FiEyeOff } from "react-icons/fi";
import ThreeScene from "../../components/ThreeScene";

export default function SignUp() {
  const router = useRouter();
  const { t } = useLanguage();
  const { openTermsModal, openPrivacyModal } = useLegalModal();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<"credentials" | "social">("credentials");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      // Sign in the user after successful signup
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };

  const handleGithubSignIn = () => {
    signIn("github", { callbackUrl: "/dashboard" });
  };

  return (
    <div className="flex min-h-screen">
      {/* Left panel - Form */}
      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-8 xl:px-12">
        <div className="mx-auto w-full max-w-sm sm:max-w-md">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
              {t.auth.createNewAccount}
            </h2>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              {t.auth.alreadyHaveAccount}{" "}
              <Link href="/auth/signin" className="font-medium text-emerald-600 hover:text-emerald-500">
                {t.auth.signIn}
              </Link>
            </p>
          </div>

          <div className="mt-8">
            {/* Tabs for authentication methods */}
            <div className="mb-6 flex overflow-hidden rounded-md border border-gray-300 dark:border-gray-600">
              <button
                onClick={() => setActiveTab("credentials")}
                className={`flex-1 py-2 text-sm font-medium transition-colors ${activeTab === "credentials"
                    ? "bg-emerald-600 text-white"
                    : "bg-white text-black"
                  }`}
              >
                {t.auth.email}
              </button>
              <button
                onClick={() => setActiveTab("social")}
                className={`flex-1 py-2 text-sm font-medium transition-colors ${activeTab === "social"
                    ? "bg-emerald-600 text-white"
                    : "bg-white text-black"
                  }`}
              >
                {t.auth.continueWith}
              </button>
            </div>

            {activeTab === "credentials" ? (
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[var(--text-primary)]">
                    {t.auth.name}
                  </label>
                  <div className="relative mt-1">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <FaUser className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="block w-full rounded-md border border-gray-300 bg-white pl-10 pr-3 py-2 shadow-sm placeholder:text-gray-500 focus:border-emerald-500 focus:ring-emerald-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400 sm:text-sm"
                      placeholder={t.auth.name}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[var(--text-primary)]">
                    {t.auth.email}
                  </label>
                  <div className="relative mt-1">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <HiOutlineMail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full rounded-md border border-gray-300 bg-white pl-10 pr-3 py-2 shadow-sm placeholder:text-gray-500 focus:border-emerald-500 focus:ring-emerald-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400 sm:text-sm"
                      placeholder={t.auth.email}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-[var(--text-primary)]">
                    {t.auth.password}
                  </label>
                  <div className="relative mt-1">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <RiLockPasswordLine className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      className="block w-full rounded-md border border-gray-300 bg-white pl-10 pr-10 py-2 shadow-sm placeholder:text-gray-500 focus:border-emerald-500 focus:ring-emerald-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400 sm:text-sm"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FiEyeOff className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <FiEye className="h-5 w-5" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Password must be at least 8 characters long
                  </p>
                </div>

                {error && (
                  <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/20">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800 dark:text-red-200">{error}</h3>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      required
                      className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="text-[var(--text-secondary)]">
                      {t.auth.termsAgreement}{" "}
                      <button 
                        type="button"
                        onClick={() => openTermsModal()}
                        className="font-medium text-emerald-600 hover:text-emerald-500"
                      >
                        {t.auth.termsOfService}
                      </button>{" "}
                      {t.auth.and}{" "}
                      <button 
                        type="button"
                        onClick={() => openPrivacyModal()}
                        className="font-medium text-emerald-600 hover:text-emerald-500"
                      >
                        {t.auth.privacyPolicy}
                      </button>
                    </label>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex w-full justify-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isLoading ? t.auth.creatingAccount : t.auth.createAccount}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="space-y-3">
                  <button
                    onClick={handleGoogleSignIn}
                    className="flex w-full items-center justify-center gap-3 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
                  >
                    <FaGoogle className="h-5 w-5 text-red-500" />
                    <span>Google {t.auth.continueWith}</span>
                  </button>

                  <button
                    onClick={handleGithubSignIn}
                    className="flex w-full items-center justify-center gap-3 rounded-md border border-gray-300 bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <FaGithub className="h-5 w-5 text-white" />
                    <span>GitHub {t.auth.continueWith}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right panel - Image/Illustration */}
      <div className="hidden bg-emerald-600 lg:block lg:w-1/2">
        <div className="flex h-full flex-col items-center justify-center px-8 text-white">
          <div className="max-w-md text-center">
            <h2 className="mb-6 text-3xl font-bold">Join Our Community</h2>
            <p className="mb-8 text-lg">
              Create an account to get started with our platform. Access exclusive features and personalized content.
            </p>
            <div className="mx-auto h-64 w-64 overflow-hidden rounded-full bg-emerald-500 p-4 shadow-2xl">
              <ThreeScene />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 