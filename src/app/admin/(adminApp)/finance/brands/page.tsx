"use client";
import Breadcrumb from "@/components/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/components/ui/container/PageContainer";
import BrandsFinanceTable from "@/features/payouts/admin/components/BrandsFinanceTable";
import { useTranslation } from "react-i18next";

const BCrumb = [{ title: "Finance" }, { title: "Brands" }];

export default function AdminBrandsFinancePage() {
  const { t } = useTranslation();
  return (
    <PageContainer title={t("Brands Finance")} description="Manage brand payouts">
      <Breadcrumb title={t("Brands Finance")} items={BCrumb} />
      <BrandsFinanceTable />
    </PageContainer>
  );
}
