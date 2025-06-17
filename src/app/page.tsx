"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Redirect to dashboard if authenticated, otherwise to login
    if (isAuthenticated) {
      router.push("/dashboard/home");
    } else {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  // Return null or a loading state while redirecting
  return null;
}
