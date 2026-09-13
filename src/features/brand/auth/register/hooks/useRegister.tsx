import { useMutation } from "@tanstack/react-query";
import { register, AddBrandInfo, verifyIdentity } from "../services";
import { useState } from "react";
import { registerApiFormat, brandInfoApiFormat } from "@/utils/helpers/apiFormat";
export function useRegister(callBackOnSuccess: () => void) {
    const [errorMessage, setErrorMessage] = useState<string>("")

    const mutation = useMutation({
        mutationFn: (data: any) => register(registerApiFormat(data)),
        onSuccess: (data) => {
            setErrorMessage("")
            callBackOnSuccess();
        },
        onError: (error: any) => {
            if (error) {
                setErrorMessage(error?.response?.data?.errors[0]?.en || error.response?.message?.en || error.message);
            }
        },
    });
    return { ...mutation, errorMessage }
}
export function useAddBrandInfo(callBackOnSuccess: () => void) {
    const [errorMessage, setErrorMessage] = useState<string>("")

    const mutation = useMutation({
        mutationFn: (data: any) => AddBrandInfo(brandInfoApiFormat(data)),
        onSuccess: (data) => {
            setErrorMessage("")
            callBackOnSuccess();
        },
        onError: (error: any) => {
            if (error) {
                setErrorMessage(error?.response?.data?.errors[0]?.en);
            }
        },
    });
    return { ...mutation, errorMessage }
}
export function useVerifyIdentity(callBackOnSuccess: () => void) {
    const [errorMessage, setErrorMessage] = useState<string>("")

    const mutation = useMutation({
        mutationFn: (data: any) => verifyIdentity(data),
        onSuccess: (data) => {
            setErrorMessage("")
            callBackOnSuccess();
        },
        onError: (error: any) => {
            if (error) {
                setErrorMessage(error?.response?.data?.errors[0]?.en ?? error?.response?.message?.en ?? "Something went wrong");
            }
        },
    });
    return { ...mutation, errorMessage }
}
