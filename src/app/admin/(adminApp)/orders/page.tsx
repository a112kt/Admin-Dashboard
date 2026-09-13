"use client";
import PageContainer from "@/components/ui/container/PageContainer";
import Breadcrumb from "@/components/layout/shared/breadcrumb/Breadcrumb";
import RefundRequestsTable from "@/features/admin/refunds/components/RefundRequestsTable";
import { useTranslation } from 'react-i18next';

export default function AdminOrdersPage() {
  const { t } = useTranslation();

  const breadcrumbItems = [
    { title: "Admin", to: "/admin" },
    { title: t("Orders"), to: "/admin/orders" },
  ];

  return (
    <PageContainer title={t("Orders")} description={t("Manage orders and refunds")}>
      <Breadcrumb title={t("Orders")} items={breadcrumbItems} />
      <RefundRequestsTable />
    </PageContainer>
  );
}
