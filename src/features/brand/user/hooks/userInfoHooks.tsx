"use client";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../services";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "@/context/authContext";
import { AdminAuthContext } from "@/context/adminAuthContext";
import { usePathname } from "next/navigation";

export function useUser() {
  const [token, setToken] = useState<string | null>(null);
  const { token: BrandToken, user, setUser } = useContext(AuthContext);
  const { adminToken } = useContext(AdminAuthContext);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.includes("admin")) {
      console.log(adminToken, "adminToken");
      setToken(adminToken);
    } else {
      console.log(BrandToken, "BrandToken");
      setToken(BrandToken);
    }
  }, [pathname]);


  //  const token = useMemo(() => {
  //         return localStorage.getItem("BrandToken") || "";
  //     }, []);
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["user", token],
    queryFn: () => getUserInfo(),
    enabled: !!token,
    retry: false,
  });

  return {
    user: data?.data || null,
    loading: isLoading,
    error: error ? (error as any)?.response?.data?.message?.en : null,
    refresh: refetch,
  };
}
