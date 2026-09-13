import { useMutation } from "@tanstack/react-query"
import {brandLogin} from "../services"

export function useBrandLogin(callBack?: (data: any) => void){
    return useMutation({
        mutationFn: ({email , password}:{email:string , password:string}) => brandLogin(email , password),
        onSuccess: (data) => {
            callBack?.(data);
        },
    });
}