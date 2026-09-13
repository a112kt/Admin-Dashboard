import { logoutUser } from "../services";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "@/context/authContext";


export const useLogout = () => {
    const router = useRouter();
    const { setToken, setRoles } = useContext(AuthContext);
    return useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            setToken(null);
            setRoles(null);
            router.replace("/auth/login");
        },
        onError: () => {
            setToken(null);
            setRoles(null);
            localStorage.removeItem("BrandToken");
            localStorage.removeItem("AlluvoRole");
            localStorage.removeItem("BrandStatus");
            router.replace("/auth/login");
        }
    });
}
