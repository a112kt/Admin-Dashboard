"use client";
import { createContext, useState, useEffect, useCallback } from "react";
import { adminLogin as adminLoginApi } from "@/features/admin/auth/services";
import { jwtDecode } from "jwt-decode";

function extractRolesFromToken(token: string): string[] {
  try {
    const decoded: any = jwtDecode(token);
    const roleClaim =
      decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ||
      decoded.role ||
      decoded.roles ||
      decoded.Role ||
      decoded.Roles;
    if (Array.isArray(roleClaim)) return roleClaim;
    if (typeof roleClaim === "string") return [roleClaim];
    return [];
  } catch {
    return [];
  }
}

function extractEmailFromToken(token: string): string | null {
  try {
    const decoded: any = jwtDecode(token);
    return decoded.email || decoded.Email || decoded.sub || decoded.unique_name || null;
  } catch {
    return null;
  }
}

export type AdminAuthContextType = {
    adminToken: string | null;
    adminEmail: string | null;
    adminRoles: string[];
    isAuthenticated: boolean;
    initialized: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
};

export const AdminAuthContext = createContext<AdminAuthContextType>({
    adminToken: null,
    adminEmail: null,
    adminRoles: [],
    isAuthenticated: false,
    initialized: false,
    login: async () => {},
    logout: () => {},
});

export default function AdminAuthContextProvider({ children }: { children: React.ReactNode }) {
    const [adminToken, setAdminToken] = useState<string | null>(null);
    const [adminEmail, setAdminEmail] = useState<string | null>(null);
    const [adminRoles, setAdminRoles] = useState<string[]>([]);
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem("AdminToken");
        const storedEmail = localStorage.getItem("AdminEmail");
        const rolesRaw = localStorage.getItem("AdminRoles");

        if (storedToken) {
            setAdminToken(storedToken);
            if (rolesRaw) {
                try {
                    setAdminRoles(JSON.parse(rolesRaw) as string[]);
                } catch {
                    const decodedRoles = extractRolesFromToken(storedToken);
                    if (decodedRoles.length) setAdminRoles(decodedRoles);
                    localStorage.removeItem("AdminRoles");
                }
            } else {
                const decodedRoles = extractRolesFromToken(storedToken);
                if (decodedRoles.length) setAdminRoles(decodedRoles);
            }
            if (!storedEmail) {
                const decodedEmail = extractEmailFromToken(storedToken);
                if (decodedEmail) setAdminEmail(decodedEmail);
            } else {
                setAdminEmail(storedEmail);
            }
        }

        setInitialized(true);
    }, []);

    const login = useCallback(async (email: string, password: string) => {
        const res = await adminLoginApi(email, password);
        const roles = res.roles?.length ? res.roles : extractRolesFromToken(res.token);
        const emailValue = res.email || extractEmailFromToken(res.token);
        setAdminToken(res.token);
        setAdminEmail(emailValue);
        setAdminRoles(roles);
    }, []);

    const logout = useCallback(() => {
        setAdminToken(null);
        setAdminEmail(null);
        setAdminRoles([]);
        localStorage.removeItem("AdminToken");
        localStorage.removeItem("AdminEmail");
        localStorage.removeItem("AdminRoles");
    }, []);

    useEffect(() => {
        if (!adminToken) {
            localStorage.removeItem("AdminToken");
        } else {
            localStorage.setItem("AdminToken", adminToken);
        }
    }, [adminToken]);

    useEffect(() => {
        if (!adminEmail) {
            localStorage.removeItem("AdminEmail");
        } else {
            localStorage.setItem("AdminEmail", adminEmail);
        }
    }, [adminEmail]);

    useEffect(() => {
        if (!adminRoles || adminRoles.length === 0) {
            localStorage.removeItem("AdminRoles");
        } else {
            localStorage.setItem("AdminRoles", JSON.stringify(adminRoles));
        }
    }, [adminRoles]);

    const value: AdminAuthContextType = {
        adminToken,
        adminEmail,
        adminRoles,
        isAuthenticated: !!adminToken,
        initialized,
        login,
        logout,
    };

    return (
        <AdminAuthContext.Provider value={value}>
            {children}
        </AdminAuthContext.Provider>
    );
}
