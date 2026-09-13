import { adminApiCall } from "@/API/adminApiClient";
import { BrandRequestDetails, PagedResponse, BrandRequestListItem } from "./types";

export async function getBrandRequests(
    status?: string,
    search?: string,
    page: number = 1,
    pageSize: number = 20
): Promise<{ data: PagedResponse<BrandRequestListItem> }> {
    const params = new URLSearchParams();
    if (status) params.append("status", status);
    if (search) params.append("search", search);
    params.append("page", page.toString());
    params.append("pageSize", pageSize.toString());

    const res = await adminApiCall.get(`/admin/brand-requests?${params}`);
    return res.data;
}

export async function getBrandRequestDetails(id: number): Promise<{ data: BrandRequestDetails }> {
    const res = await adminApiCall.get(`/admin/brand-requests/${id}`);
    return res.data;
}

export async function approveBrandRequest(id: number): Promise<void> {
    await adminApiCall.post(`/admin/brand-requests/${id}/approve`);
}

export async function rejectBrandRequest(id: number, reasonId: number): Promise<void> {
    await adminApiCall.post(`/admin/brand-requests/${id}/reject`, { reasonId });
}

export async function banBrandUser(id: number): Promise<void> {
    await adminApiCall.post(`/admin/brand-requests/${id}/ban`);
}

export async function getRejectionReasons(): Promise<{ data: Array<{ id: number; code: string; description: string }> }> {
    const res = await adminApiCall.get("/RejectionReason");
    return res.data;
}

export async function getPendingCount(): Promise<{ data: { count: number } }> {
    const res = await adminApiCall.get("/admin/brand-requests/pending-count");
    return res.data;
}
