import { apiCall } from "./apiClient";

export const getFetcher = async (url: string) => {

    const response = await apiCall.get(url);
    return response.data;
};
export const postFetcher = async (url: string, data: any) => {
    const response = await apiCall.post(url, data);
    return response.data;
};
export const putFetcher = async (url: string, data: any) => {
    const response = await apiCall.put(url, data);
    return response.data;
};
export const patchFetcher = async (url: string, data: any) => {
    const response = await apiCall.patch(url, data);
    return response.data;
};
export const deleteFetcher = async (url: string) => {
    const response = await apiCall.delete(url);
    return response.data;
};

/// get url from file 
export async function getUrl(file: File | null) {
    if (!file) {
        return "";
    }
    const formData = new FormData();
    formData.append("file", file);
    const response = await apiCall.post("/Media/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
}
