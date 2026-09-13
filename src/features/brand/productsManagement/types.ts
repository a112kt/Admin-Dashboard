export interface ProductType {
  id: number;
  name: string;
  image: string;
  createdAt: string;
  status: string;
  price: string;
  quantity: string;
}

export interface GetBrandProductsRes {
  id: number;
  name: string;
  image: string;
  createdAt: string;
  status: number;
  price: number;
  quantity: number;
}
export interface ProductImageDto {
  id: number;
  url: string;
}

export interface ProducctDetailRes {
  id: number;
  name: string;
  description: string;
  arDescription: string;
  price: number;
  haveOffer: boolean;
  discountedPrice: number;
  discountPercentage: number;
  quantity: number;
  mediaUrl: string[];
  mediaUrls: ProductImageDto[];
  isCustomizable: boolean;
  stockStatus: string;
  brand: Brand;
  category: Category;
  reviewsSummary: ReviewSummary;
  isInWishlist: boolean;
  availableColors: AvailableColor[];
  productInformations: ProductInformation[];
  reviews: ReviewType[];
  relatedProducts: RelatedProduct[];
}
export interface RelatedProduct {
  id: number;
  name: string;
  pictureUrl: string | null;
  price: number;
  discountedPrice: number;
  discountPercentage: number;
  haveOffer: boolean;
}
export interface RatingDistribution {
  "0": number;
  "1": number;
  "2": number;
  "3": number;
  "4": number;
  "5": number;
}

export interface ReviewSummary {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: RatingDistribution;
}

export interface AvailableSize {
  id: number;
  size: string;
  quantity: number;
}

export interface AvailableColor {
  id: number;
  name: string;
  arName: string;
  hexCode: string;
  quantity: number;
  availableSizes: AvailableSize[];
}
export interface ReviewType {
  id: number;
  customerName: string;
  customerImage: string;
  rating: number;
  comment: string;
  createdAt: string;
}
export type ProductInformation = {
  id: number;
  key: string;
  value: string;
  arKey: string;
  arValue: string;
  type: number;
  group: string;
  arGroup: string;
  displayOrder: number;
};

export interface Brand {
  id: number;
  displayName: string;
  description: string;
  logoUrl: string;
  followersCount: number;
  averageRating: number;
}

export interface Category {
  id: number;
  name: string;
  arName: string;
}

export interface ProductDetailResponse {
  id: number;
  name: string;
  description: string;
  arDescription: string;
  price: number;
  haveOffer: boolean;
  discountedPrice: number;
  discountPercentage: number;
  quantity: number;
  mediaUrl: string;
  mediaUrls: ProductImageDto[];
  isCustomizable: boolean;
  stockStatus: string;
  brand: Brand;
  category: Category;
  reviewsSummary: ReviewSummary;
  isInWishlist: boolean;
  availableColors: AvailableColor[];
  productInformations: any[];
  reviews: ReviewType[];
  relatedProducts: RelatedProduct[];
}

export interface ProductColorReq {
  productColorId: number;
  sizes: ProductSizeReq[];
}

export interface ProductSizeReq {
  productSizeId: number;
  quantity: number;
}

export interface ProductInformationReq {
  key: string;
  value: string;
  type: number;
  group?: string;
  displayOrder: number;
}

export interface AddBrandProductReq {
  name: string;
  description: string;
  price: number;
  categoryId: number;
  isCustomizable: boolean;
  discountPercentage?: number;
  colors: ProductColorReq[];
  informations?: ProductInformationReq[];
}

export interface EditProductReq {
  productId: number;
  name?: string;
  description?: string;
  price?: number;
  categoryId?: number;
  isCustomizable?: boolean;
  discountPercentage?: number;
  colors?: ProductColorReq[];
  informations?: ProductInformationReq[];
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: { en: string; ar: string };
  data: T;
  errors: any[];
}

export interface PaginationResponse<T> {
  meta: {
    pageNumber: number;
    pageSize: number;
    totalRecords: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    totalPages: number;
  };
  data: T[];
}

export interface SizeRes {
  id: number;
  name: string;
  arName: string;
}
export interface ColorRes {
  id: number;
  name: string;
  arName: string;
}
export interface CategoryRes {
  id: number;
  name: string;
  arName: string;
  imageUrl: string;
}
export interface StockStatusRes {
  id: number;
  name: string;
  arName: string;
}
export type size = {
  value: string;
  label: string;
  quantity: string;
};

export interface Variation {
  id: number;
  color: {
    value: string;
    label: string;
    sizes: size[];
  };
}
