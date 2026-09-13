export type OrderStatus =
  | "Pending"
  | "Processing"
  | "Preparing"
  | "Packed"
  | "Shipped"
  | "Delivered"
  | "Cancelled"
  | "PendingCancellation";

export type PaymentStatus =
  | "Pending"
  | "Paid"
  | "Failed"
  | "Refunded"
  | "Voided"
  | "PayOnDelivery";

export type PaymentMethod =
  | "NotSpecified"
  | "Card"
  | "Wallet"
  | "CashOnDelivery";

export interface OrderItemDto {
  productName: string;
  productImage: string | null;
  quantity: number;
  price: number;
  color: string;
  size: string;
}

export interface LookupItem {
  id: number;
  name: string;
  arName: string | null;
}

export interface BrandOrderDto {
  orderId: number;
  createdAt: string;
  customerName: string;
  itemCount: number;
  totalAmount: number;
  status: number;
  paymentStatus: number;
  paymentMethod: number;
  items: OrderItemDto[];
}

export interface MappedBrandOrderDto extends Omit<BrandOrderDto, "status" | "paymentStatus" | "paymentMethod"> {
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
}

export interface BrandOrdersResDto {
  orders: BrandOrderDto[];
}
