export interface registerType {
  title?: string;
  subtitle?: React.ReactNode;
  subtext?: React.ReactNode;
}

export interface loginType {
  title?: string;
  subtitle?: React.ReactNode;
  subtext?: React.ReactNode;
  role?: roleType;
}

export interface signInType {
  title?: string;
}
export type roleType = "admin" | "brand";
export type registerData = {
  FirstName: string;
  LastName: string;
  Email: string;
  PhoneNumber: string;
  Password: string;
  DateOfBirth: string;
  Gender: "Male" | "Female";
  ProfileImage: File;
};

export type verigicationData = {
  email: string;
  otp: string;
};
export type BrandInfoData = {
  DisplayName: string;
  Description: string;
  LogoUrl: File;
  ReturnPolicyAsHtml: string;
  category: string;
  country: string;
  Governorate: string;
  district: string;
  numberOfEmployees: number;
};
