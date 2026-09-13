"use client";
import { useRouter } from "next/navigation";
import { useEffect, useContext } from "react";
import { AdminAuthContext } from "@/context/adminAuthContext";
import { AuthContext } from "@/context/authContext";
import Loading from "../(brand)/(brandApp)/loading";

export default function AdminGuardLayout({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, initialized } = useContext(AdminAuthContext);
    const { token: brandToken, initialized: brandInitialized } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (brandInitialized && brandToken) {
            localStorage.removeItem("BrandToken");
            localStorage.removeItem("AlluvoRole");
            localStorage.removeItem("BrandStatus");
            localStorage.removeItem("user");
            localStorage.removeItem("email");
            localStorage.removeItem("step");
            localStorage.removeItem("verificationErrorState");
            window.location.reload();
            return;
        }
        if (initialized && !isAuthenticated) {
            router.replace("/admin/auth/login");
        }
    }, [initialized, isAuthenticated, brandInitialized, brandToken, router]);

    if (!initialized) {
        return <Loading />;
    }

    if (!isAuthenticated) {
        return <Loading />;
    }

    return <>{children}</>;
}
