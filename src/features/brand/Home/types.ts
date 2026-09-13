export interface TopReelDto {
  reelId: number;
  title: string;
  thumbnailUrl: string | null;
  views: number;
  likes: number;
}

export interface BrandDashboardData {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  monthlyRevenue: number;
  revenueGrowthPercentage: number;
  ordersGrowthPercentage: number;
  activeCustomers: number;
  customersGrowthPercentage: number;
  salesGrowthPercentage: number;
  reelCounts: {
    all: number;
    published: number;
    draft: number;
  };
  postCounts: {
    all: number;
    published: number;
    draft: number;
  };
  recentOrders: RecentOrder[];
  revenueTrend: Array<{
    year: number;
    month: number;
    revenue: number;
  }>;
  topProducts: TopProduct[];
  totalReelViews: number;
  totalReelLikes: number;
  topViewedReels: TopReelDto[];
  topLikedReels: TopReelDto[];
  orderStatusOverview: OrderStatusOverview;
}

export interface OrderStatusCounts {
  pending: number;
  processing: number;
  preparing: number;
  packed: number;
  shipped: number;
  delivered: number;
  cancelled: number;
  pendingCancellation: number;
}

export interface OrderStatusOverview {
  thisWeek: OrderStatusCounts;
  thisMonth: OrderStatusCounts;
  thisYear: OrderStatusCounts;
}

export type RecentOrder = {
  orderId: number;
  createdAt: string;
  totalAmount: number;
  status: number;
  itemCount: number;
};
export type TopProduct = {
  productId: number;
  name: string;
  imageUrl?: string;
  totalSold: number;
  revenue: number;
};

export interface RegionOrderCount {
  city: string;
  orderCount: number;
}

export interface OrdersByRegionData {
  totalOrders: number;
  regions: RegionOrderCount[];
}
