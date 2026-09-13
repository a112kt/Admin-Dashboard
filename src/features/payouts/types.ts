export type WithdrawalRequestStatus = "Pending" | "Approved" | "Paid" | "Rejected" | "Failed";

export interface LookupItem {
  id: number;
  name: string;
  arName: string | null;
}

export type SettlementStatus =
  | "Pending"
  | "ReadyForWithdrawal"
  | "WithdrawalRequested"
  | "TransferInitiated"
  | "Processing"
  | "Paid"
  | "Failed";

export type ShippingSettlementStatus = "Pending" | "ReadyToPay" | "Paid";

export interface BrandWalletSummaryDto {
  pendingBalance: number;
  availableBalance: number;
  requestedBalance: number;
  paidBalance: number;
  totalLifetimeEarnings: number;
}

export interface BrandSettlementDto {
  id: number;
  orderId: number;
  orderReference: string;
  grossAmount: number;
  platformCommission: number;
  netAmount: number;
  status: SettlementStatus;
  statusString: string;
  availableAt: string | null;
  paidAt: string | null;
  transferId: string | null;
  paymentReference: string | null;
  notes: string | null;
  createdAt: string;
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  pageIndex: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface WithdrawalRequestDto {
  id: number;
  requestedAmount: number;
  status: WithdrawalRequestStatus;
  statusString: string;
  createdAt: string;
  approvedAt: string | null;
  paidAt: string | null;
  paymobTransferId: string | null;
  notes: string | null;
}

export interface CreateWithdrawalReqDto {
  amount: number;
}

export interface SettlementFilterDto {
  status?: SettlementStatus;
  dateFrom?: string;
  dateTo?: string;
  pageIndex?: number;
  pageSize?: number;
}

export interface AdminDashboardDto {
  totalPendingBrandBalance: number;
  totalAvailableBrandBalance: number;
  totalPaidBrandBalance: number;
  totalPendingShippingBalance: number;
  totalPaidShippingBalance: number;
  platformTotalCommission: number;
  ordersWaitingSettlement: number;
}

export interface AdminBrandFinanceSummaryDto {
  brandId: number;
  brandName: string;
  pendingBalance: number;
  availableBalance: number;
  requestedBalance: number;
  paidBalance: number;
  totalSettlements: number;
  pendingWithdrawals: number;
}

export interface AdminBrandFinanceDetailDto {
  summary: AdminBrandFinanceSummaryDto;
  settlements: BrandSettlementDto[];
  withdrawalHistory: WithdrawalRequestDto[];
}

export interface PayBrandSettlementsReqDto {
  settlementIds?: number[];
  withdrawalRequestId?: number;
  reference?: string;
  notes?: string;
}

export interface ShippingWalletSummaryDto {
  pendingBalance: number;
  readyToPayBalance: number;
  paidBalance: number;
  totalLifetimeEarnings: number;
}

export interface ShippingSettlementDto {
  id: number;
  orderId: number;
  amount: number;
  status: ShippingSettlementStatus;
  statusString: string;
  paidAt: string | null;
  paymentReference: string | null;
  notes: string | null;
  createdAt: string;
}

export interface AdminShippingFinanceSummaryDto {
  shippingCompanyId: number;
  shippingCompanyName: string;
  pendingBalance: number;
  readyToPayBalance: number;
  paidBalance: number;
  totalSettlements: number;
}

export interface AdminShippingFinanceDetailDto {
  summary: AdminShippingFinanceSummaryDto;
  settlements: ShippingSettlementDto[];
}

export interface PayShippingSettlementsReqDto {
  settlementIds: number[];
  reference?: string;
  notes?: string;
}

export interface BrandPolicyDto {
  platformCommissionPercentage: number;
  minimumWithdrawalAmount: number;
  withdrawalRules: string;
  settlementConditions: string;
  withdrawalProcessingTime: string;
  paymentProvider: string;
  supportContact: string;
}

export interface FinancialAuditLogDto {
  id: number;
  action: string;
  entityType: string;
  entityId: number;
  oldValues: string | null;
  newValues: string | null;
  performedBy: string | null;
  ipAddress: string | null;
  notes: string | null;
  createdAt: string;
}

export interface AuditLogFilterDto {
  actionType?: string;
  entityType?: string;
  performedBy?: string;
  dateFrom?: string;
  dateTo?: string;
  pageIndex?: number;
  pageSize?: number;
}

export interface PagedAuditLogResult {
  items: FinancialAuditLogDto[];
  totalCount: number;
  pageIndex: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
