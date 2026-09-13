import { adminApiCall } from "@/API/adminApiClient";
import type { AdminDashboardData } from "./types";

export async function getAdminDashboard(year?: number) {
  const params = year ? { year } : {};
  const res = await adminApiCall.get("/Dashboard/admin-stats", { params });
  return res.data as { data: AdminDashboardData };
}

export function exportDashboardCSV(dashboard: AdminDashboardData) {
  const rows: string[] = [];

  rows.push("Admin Dashboard Report");
  rows.push(`Generated,${new Date().toISOString()}`);
  rows.push("");

  rows.push("Overview");
  rows.push(`Total Brands,${dashboard.totalBrands}`);
  rows.push(`Total Users,${dashboard.totalUsers}`);
  rows.push(`Pending Requests,${dashboard.pendingRequests}`);
  rows.push(`Total Orders,${dashboard.totalOrders}`);
  rows.push(`Total Products,${dashboard.totalProducts}`);
  rows.push(`Total Reels,${dashboard.totalReels}`);
  rows.push(`Total Reel Views,${dashboard.totalReelViews}`);
  rows.push(`Engagement Rate,${dashboard.engagementRate}%`);
  rows.push(`Total Revenue,${dashboard.totalRevenue}`);
  rows.push(`Revenue Growth,${dashboard.revenueGrowthPercentage}%`);
  rows.push(`Orders Growth,${dashboard.ordersGrowthPercentage}%`);
  rows.push(`Active Brands,${dashboard.activeBrands}`);
  rows.push(`Active Users,${dashboard.activeUsers}`);
  rows.push("");

  rows.push("Revenue Trend (Month, Year, Revenue)");
  rows.push("Month,Year,Revenue");
  for (const r of dashboard.revenueTrend) {
    rows.push(`${r.month},${r.year},${r.revenue}`);
  }
  rows.push("");

  rows.push("Top Brands");
  rows.push("Brand Name,Orders,Revenue");
  for (const b of dashboard.topBrands) {
    rows.push(`${b.brandName},${b.totalOrders},${b.totalRevenue}`);
  }

  const csvString = rows.join("\n");
  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `admin_dashboard_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
