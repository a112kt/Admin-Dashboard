import axios from "axios";
export const apiCall = axios.create({
    baseURL: process.env.NEXT_PUBLIC_APP_URL + '/api',
    timeout: 5000000,
    headers: { "Content-Type": "application/json", Accept: "text/plain" },
});

const getCurrentToken = () => {
    if (typeof window === "undefined") return null;

    const pathname = window.location.pathname;

    if (pathname.includes("/admin")) {
        return localStorage.getItem("AdminToken");
    } else {
        return localStorage.getItem("BrandToken");
    }
};
apiCall.interceptors.response.use(
    (response) => response,
    (error) => {
        const isLoginRequest = error?.config?.url?.includes("/Auth/Login");
        if (error?.response?.status === 401 && !isLoginRequest) {
            if (typeof window !== "undefined") {
                localStorage.removeItem("BrandToken");
                window.location.href = "/auth/login";
            }
        }
        return Promise.reject(error);
    }
);

apiCall.interceptors.request.use((config: any) => {
    if (typeof window !== "undefined") {
        const token = getCurrentToken();
        if (token) config.headers.Authorization = `Bearer ${token}`;

        const lang = localStorage.getItem("isLanguage");
        if (lang) config.headers["Accept-Language"] = JSON.parse(lang);
    }
    return config;
});
