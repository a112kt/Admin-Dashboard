export interface BrandDetailsResponse {
  id: number;
  displayName: string;
  description: string;
  logoUrl: string;
  coverImageUrl?: string;
  returnPolicyAsHtml: string;
  category: string;
  country: string;
  governorate: string;
  district: string;
  numberOfEmployees: number;
  status: string;
  createdAt: string;
  submittedAt?: string;
  averageRating: number;
  numOfReviews: number;
  isVerified: boolean;
  followersCount: number;
  productsCount: number;
  reelsCount: number;
  contactPhone?: string;
  payoutPhoneNumber?: string;
  bankAccountNumber?: string;
  owner: BrandOwnerDetails;
  socialLinks: SocialLinkDto[];
}

export interface BrandOwnerDetails {
  userId: string;
  displayName: string;
  imageUrl: string;
  email?: string;
  phoneNumber?: string;
}

export interface SocialLinkDto {
  id: number;
  platform: string;
  url: string;
}

export interface TopEngagedUserDto {
  userId: string;
  displayName: string;
  imageUrl: string;
  engagementScore: number;
  ordersCount: number;
  reelViewsCount: number;
  reelLikesCount: number;
  commentsCount: number;
  wishlistItemsCount: number;
  isFollowing: boolean;
}

export interface UpdateBrandDetailsReq {
  displayName: string;
  description: string;
  returnPolicyAsHtml: string;
  category: string;
  country: string;
  governorate: string;
  district: string;
  numberOfEmployees: number;
  payoutPhoneNumber?: string;
  bankAccountNumber?: string;
  bankCode?: string;
  socialLinks: SocialLinkReqDto[];
}

export interface SocialLinkReqDto {
  id?: number;
  platform: string;
  url: string;
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: { en: string; ar: string };
  data: T;
  errors: any[];
}
