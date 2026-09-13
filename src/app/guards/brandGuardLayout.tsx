"use client";
import { useRouter } from "next/navigation";
import { useEffect, useContext } from "react";
import { AuthContext } from "@/context/authContext";
import Loading from "../(brand)/(brandApp)/loading";

export default function BrandGuardLayout({ children }: { children: React.ReactNode }) {
    const { token, initialized, brandStatus } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (initialized && !token) {
            router.replace("/auth/login");
        }
    }, [initialized, token, router]);

    if (!initialized) {
        return <Loading />;
    }

    if (!token) {
        return <Loading />;
    }

    if (brandStatus === "BANNED") {
        router.replace("/auth/login");
        return <Loading />;
    }

    return <>{children}</>;
}
