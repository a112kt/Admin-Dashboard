import axios from "axios";

export const adminApiCall = axios.create({
    baseURL: process.env.NEXT_PUBLIC_APP_URL + '/api',
    timeout: 5000000,
    headers: { "Content-Type": "application/json", Accept: "text/plain" },
});

adminApiCall.interceptors.response.use(
    (response) => response,
    (error) => {
        const isLoginRequest = error?.config?.url?.includes("/admin/login");
        if (error?.response?.status === 401 && !isLoginRequest) {
            if (typeof window !== "undefined") {
                localStorage.removeItem("AdminToken");
                window.location.href = "/admin/auth/login";
            }
        }
        return Promise.reject(error);
    }
);

adminApiCall.interceptors.request.use((config: any) => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("AdminToken");
        if (token) config.headers.Authorization = `Bearer ${token}`;
        const lang = localStorage.getItem("isLanguage");
        if (lang) config.headers["Accept-Language"] = JSON.parse(lang);
    }
    return config;
});
