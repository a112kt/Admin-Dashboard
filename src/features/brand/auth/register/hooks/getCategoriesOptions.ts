import { useQuery } from "@tanstack/react-query";
import { getCategoriesOptions } from "../services";

export function useGetCategoriesOptions() {
  const { data, isLoading, isError, isSuccess, error } = useQuery({
    queryKey: ["categoriesOptions"],
    queryFn: getCategoriesOptions,
    refetchOnWindowFocus: false,
  });

  const categoriesOptions: { value: string; label: string }[] =
    isSuccess && data?.data
      ? data.data.map((item: any) => ({
          value: String(item.name ?? item),
          label: item.name || item,
        }))
      : [];

  return {
    categoriesOptions,
    categoriesLoading: isLoading,
    categoriesError: isError ? error : null,
  };
}
