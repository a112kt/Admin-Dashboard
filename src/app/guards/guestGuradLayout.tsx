"use client";
import { useRouter } from "next/navigation";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "@/context/authContext";
import Loading from "../(brand)/(brandApp)/loading";


export default function GuestGuardLayout({ children }: { children: React.ReactNode }) {
    const { token, roles, initialized } = useContext(AuthContext);
    const router = useRouter();
    useEffect(() => {
        if (initialized && (token && roles?.includes("Brand Owner"))) {
            router.replace("/home");
        }
    }, [initialized, token, roles, router]);
    if (!initialized) {
        return <Loading />
    }

    if (token && roles?.includes("Brand Owner")) {
        return <Loading />;
    }

    return (
        <>
            {children}
        </>
    );

}