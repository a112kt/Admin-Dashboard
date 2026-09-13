"use client";
import { useContext } from "react";
import { redirect } from "next/navigation";
import { AdminAuthContext } from "@/context/adminAuthContext";

export default function AdminPage() {
    const { isAuthenticated, initialized } = useContext(AdminAuthContext);

    if (!initialized) return null;

    if (isAuthenticated) {
        redirect('/admin/home');
    } else {
        redirect('/admin/auth/login');
    }
}
