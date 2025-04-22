"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

interface AuthContextType {
  session: Session | null;
  status: "loading" | "authenticated" | "unauthenticated";
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  status: "loading",
  isAuthenticated: false,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(status === "authenticated");
  }, [status]);

  return (
    <AuthContext.Provider
      value={{
        session,
        status,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
} 