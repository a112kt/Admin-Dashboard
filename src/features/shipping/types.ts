export interface ReadyToShipOrderItemDto {
  productName: string;
  quantity: number;
}

export interface ReadyToShipOrderDto {
  orderId: number;
  createdAt: string;
  totalAmount: number;
  shippingName: string;
  shippingStreet: string;
  shippingCity: string;
  shippingCountry: string;
  shippingPostalCode: string;
  shippingPhoneNumber: string;
  orderStatus: number;
  paymentMethod: number;
  paymentStatus: number;
  items: ReadyToShipOrderItemDto[];
}

export interface LookupItem {
  id: number;
  name: string;
  arName: string | null;
}

export type ShippingSettlementStatus = "Pending" | "ReadyToPay" | "Paid";

export interface ShippingWalletSummaryDto {
  pendingBalance: number;
  availableBalance: number;
  paidBalance: number;
  totalLifetimeEarnings: number;
}

export interface ShippingSettlementDto {
  id: number;
  orderId: number;
  orderReference: string;
  amount: number;
  status: ShippingSettlementStatus;
  statusString: string;
  paidAt: string | null;
  paymentReference: string | null;
  notes: string | null;
  createdAt: string;
}

export interface ShippingPolicyDto {
  paymentSchedule: string;
  settlementRules: string;
  deliveryRequirements: string;
  paymentProcessingTime: string;
  supportedPaymentMethod: string;
  supportContact: string;
}

export interface SettlementFilterDto {
  status?: ShippingSettlementStatus;
  dateFrom?: string;
  dateTo?: string;
  pageIndex?: number;
  pageSize?: number;
}
