export interface LookupItem {
  id: number;
  name: string;
  arName: string | null;
}

export interface RefundRequestDto {
  orderId: number;
  customerName: string;
  customerEmail: string;
  totalAmount: number;
  paymentMethod: number;
  paymentStatus: number;
  createdAt: string;
  cancellationRequestedAt: string;
  itemCount: number;
  productNames: string[];
}

export interface MappedRefundRequestDto extends Omit<RefundRequestDto, "paymentMethod" | "paymentStatus"> {
  paymentMethod: string;
  paymentStatus: string;
}
