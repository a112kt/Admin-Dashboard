import { adminApiCall } from "@/API/adminApiClient";

export interface AdminLoginResponse {
    token: string;
    email: string;
    roles: string[];
}

export async function adminLogin(email: string, password: string): Promise<AdminLoginResponse> {
    const res = await adminApiCall.post("/admin/login", { email, password });
    return res.data.data;
}
