import { registerData, BrandInfoData } from "@/features/brand/auth/types/auth";

export function registerApiFormat(data: any): registerData {
    return {
        FirstName: data.firstName,
        LastName: data.lastName,
        Email: data.email,
        PhoneNumber: data.phone,
        Password: data.password,
        DateOfBirth: data.birthDate.toISOString(),
        Gender: data.gender == "male" ? "Male" : "Female",
        ProfileImage: data.profileImage,
    };
}
export function brandInfoApiFormat(data: any): BrandInfoData {
    return {
        DisplayName: data.displayName,
        Description: data.description,
        LogoUrl: data.logoUrl,
        ReturnPolicyAsHtml: data.returnPolicyAsHtml,
        category: data.category,
        country: data.country,
        Governorate: data.governorate,
        district: data.district,
        numberOfEmployees: Number(data.numberOfEmployees),
    };
}
