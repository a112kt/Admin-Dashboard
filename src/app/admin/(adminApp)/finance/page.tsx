"use client";
import Breadcrumb from "@/components/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/components/ui/container/PageContainer";
import FinanceDashboard from "@/features/payouts/admin/components/FinanceDashboard";
import { useTranslation } from "react-i18next";

const BCrumb = [{ title: "Finance" }];

export default function AdminFinancePage() {
  const { t } = useTranslation();
  return (
    <PageContainer title={t("Finance")} description="Platform finance overview">
      <Breadcrumb title={t("Finance")} items={BCrumb} />
      <FinanceDashboard />
    </PageContainer>
  );
}
