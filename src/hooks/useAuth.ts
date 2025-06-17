import { useMutation } from "@tanstack/react-query";
import { login, logout } from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useAuth } from "@/providers/AuthProvider";

export function useLogin() {
  const router = useRouter();
  const { setIsAuthenticated } = useAuth();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      // Store the token in cookies
      Cookies.set("accessToken", data.accessToken, { expires: 7 });
      Cookies.set("refreshToken", data.refreshToken, { expires: 7 });
      setIsAuthenticated(true);
      router.push("/dashboard");
    },
    onError: (error) => {
      console.error("Login error:", error);
      throw error;
    },
  });
}

export function useLogout() {
  const router = useRouter();
  const { setIsAuthenticated } = useAuth();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      setIsAuthenticated(false);
      router.push("/login");
    },
  });
}
