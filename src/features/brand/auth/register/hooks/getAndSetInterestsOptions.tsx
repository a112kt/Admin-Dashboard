import { useQuery, useMutation } from "@tanstack/react-query";
import { getInterests, AddInterests } from "../services";
export  function useGetInterests() {
    return useQuery({
        queryKey: ["interests"],
        queryFn: getInterests,
    });
}
export function useAddInterests(callBack?: () => void) {
    return useMutation({
        mutationFn: AddInterests,
        onSuccess: () => {
            callBack?.();
        },
    });
}
