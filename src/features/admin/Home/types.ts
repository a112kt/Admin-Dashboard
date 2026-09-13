export interface AdminDashboardData {
  totalBrands: number;
  totalUsers: number;
  pendingRequests: number;
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
  totalReels: number;
  totalReelViews: number;
  engagementRate: number;
  brandSalesRevenue: number;
  deliveryRevenue: number;
  adsRevenue: number;
  activeBrands: number;
  activeUsers: number;
  revenueGrowthPercentage: number;
  ordersGrowthPercentage: number;
  brandGrowth: MonthlyGrowth[];
  userGrowth: MonthlyGrowth[];
  revenueTrend: MonthlyRevenue[];
  monthlyOrdersTrend: MonthlyGrowth[];
  recentBrandRequests: BrandRequest[];
  topBrands: TopBrand[];
  monthlyEngagementTrend: MonthlyEngagement[];
}

export interface MonthlyGrowth {
  year: number;
  month: number;
  count: number;
}

export interface MonthlyRevenue {
  year: number;
  month: number;
  revenue: number;
}

export interface TopBrand {
  brandId: number;
  brandName: string;
  totalRevenue: number;
  totalOrders: number;
}

export interface BrandRequest {
  id: number;
  displayName: string;
  status: string;
  userName: string | null;
}

export interface MonthlyEngagement {
  year: number;
  month: number;
  views: number;
  likes: number;
  comments: number;
  engagementRate: number;
}
