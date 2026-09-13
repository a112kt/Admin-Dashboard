import { apiCall } from "@/API/apiClient";
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;


export async function brandLogin(email: string, password: string) {
    const response = await apiCall.post(`/Auth/Login`, { email, password })
    return response.data;
}