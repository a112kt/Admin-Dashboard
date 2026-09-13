"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBrandRequests } from "../services";

export function useBrandRequests() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [status, setStatus] = useState<string>("");
    const [search, setSearch] = useState("");

    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ["brandRequests", page, pageSize, status, search],
        queryFn: async () => {
            const res = await getBrandRequests(
                status || undefined,
                search || undefined,
                page,
                pageSize
            );
            return res.data;
        },
    });

    return {
        requests: data?.items ?? [],
        totalCount: data?.totalCount ?? 0,
        page,
        setPage,
        pageSize,
        setPageSize,
        status,
        setStatus,
        search,
        setSearch,
        loading: isLoading,
        error,
        refetch,
    };
}
