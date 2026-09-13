export interface BrandRequestListItem {
    id: number;
    brandName: string;
    logoUrl: string;
    ownerName: string;
    ownerPhone: string;
    country: string;
    category: string;
    submittedAt: string;
    status: string;
}

export interface PagedResponse<T> {
    items: T[];
    totalCount: number;
    page: number;
    pageSize: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

export interface BrandRequestDetails {
    id: number;
    status: string;
    currentStep: number;
    lastFailedStep: number | null;
    submittedAt: string | null;
    createdAt: string;
    rejectionReason: RejectionReason | null;
    user: UserInfo;
    brand: BrandInfo;
    verification: VerificationInfo | null;
}

export interface RejectionReason {
    id: number;
    code: string;
    description: string;
}

export interface UserInfo {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    gender: string;
    dateOfBirth: string | null;
    profileImage: string;
    interests: string[];
}

export interface BrandInfo {
    displayName: string;
    logoUrl: string;
    description: string;
    category: string;
    numberOfEmployees: number;
    country: string;
    governorate: string;
    district: string;
    returnPolicyAsHtml: string;
}

export interface VerificationInfo {
    fullName: string;
    nationalId: string;
    taxNumber: string | null;
    phoneNumber: string;
    idFrontImage: string;
    idBackImage: string;
    selfieImage: string;
}
