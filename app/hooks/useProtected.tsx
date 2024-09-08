import { useRouter } from "next/navigation";
import userAuth from "./userAuth";
import React, { useEffect } from "react";
import Loader from "../components/Loader/Loader"

interface ProtectedProps {
  children: React.ReactNode;
}

export default function Protected({ children }: ProtectedProps) {
  const isAuthenticated = userAuth(); // Assuming userAuth is a custom hook or function
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/"); // Redirect to homepage if not authenticated
    }
  }, [isAuthenticated, router]);

  // Show loading or null while redirecting
  if (!isAuthenticated) return <Loader/>;

  return <>{children}</>;
}
