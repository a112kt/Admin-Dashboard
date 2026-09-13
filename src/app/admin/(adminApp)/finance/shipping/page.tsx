"use client";
import Breadcrumb from "@/components/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/components/ui/container/PageContainer";
import ShippingFinanceTable from "@/features/payouts/admin/components/ShippingFinanceTable";
import { useTranslation } from "react-i18next";

const BCrumb = [{ title: "Finance" }, { title: "Shipping" }];

export default function AdminShippingFinancePage() {
  const { t } = useTranslation();
  return (
    <PageContainer title={t("Shipping Finance")} description="Manage shipping company payouts">
      <Breadcrumb title={t("Shipping Finance")} items={BCrumb} />
      <ShippingFinanceTable />
    </PageContainer>
  );
}
