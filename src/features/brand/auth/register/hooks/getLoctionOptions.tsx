import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getCountriesOptions, getCitiesOptions } from "../services";
import { formatOptions } from "@/utils/helpers/formatters";
export function useGetCountriesOptions() {

    const { data, isLoading, isError, isSuccess, error } = useQuery({
        queryKey: ["countriesOptions"],
        queryFn: getCountriesOptions,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });
    if (isError) {
        console.log(error);
    }
    const [countriesOptions, setCountriesOptions] = useState<{ value: string, label: string }[]>([]);
    useEffect(() => {
        if (isSuccess && data) {
            setCountriesOptions(formatOptions(data.data));
        }
    }, [isSuccess, data]);
    return { countriesOptions, countriesLoading: isLoading, countriesIsError: isError, countriesError: error }

}
export function useGetCitiesOptions(country: string) {
    const { data, isLoading, isError, isSuccess, error } = useQuery({
        queryKey: ["citiesOptions", country],
        queryFn: () => getCitiesOptions(country),
        enabled: country !== "",
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });
    if (isError) {
        console.log(error);
    }
    const [citiesOptions, setCitiesOptions] = useState<{ value: string, label: string }[]>([]);
    useEffect(() => {
        if (isSuccess && data) {
            setCitiesOptions(formatOptions(data.data));
        }
    }, [isSuccess, data]);
    return { citiesOptions, citiesLoading: isLoading, citiesIsError: isError, citiesError: error }
}
