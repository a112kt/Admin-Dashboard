export interface DiscountCode {
  id: number;
  code: string;
  usageCount: number;
  expirationDate: string;
  discountValue: number;
}

export interface DiscountCodeFormData {
  code: string;
  expirationDate: string;
  discountValue: number;
}
