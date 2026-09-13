import { useMutation } from "@tanstack/react-query"
import { verification, resendOtp } from "../services"
import { useState } from "react";
export function useVerify(callBackOnSuccess: (data: any) => void) {
    const [errorMessage, setErrorMessage] = useState<string>("")
    const mutation = useMutation({
        mutationFn: (data: any) => verification(data),
        onSuccess: (data: any) => {
            setErrorMessage("");
            callBackOnSuccess(data.data.token);
        },
        onError: (error: any) => {
            if (error.statusCode == 500) {
                setErrorMessage("Something went wrong")
            } else {
                setErrorMessage(error.response?.data?.message.en)
            }
        },
    });
    return { ...mutation, errorMessage };
}
export function useResendCode(callBackOnSuccess: () => void) {
    const [errorMessage, setErrorMessage] = useState<string>("")
    const mutation = useMutation({
        mutationFn: (data: any) => resendOtp(data),
        onSuccess: (data: any) => {
            setErrorMessage("")
            callBackOnSuccess();
        },
        onError: (error: any) => {
            if (error.statusCode == 500) {
                setErrorMessage("Something went wrong")
            } else {
                setErrorMessage(error.response?.data?.message.en)
            }
        },
    });
    return { ...mutation, errorMessage };
}
