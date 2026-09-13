"use client";
import Breadcrumb from "@/components/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/components/ui/container/PageContainer";
import ShippingFinanceDetail from "@/features/payouts/admin/components/ShippingFinanceDetail";
import { useTranslation } from "react-i18next";

const BCrumb = [{ title: "Finance" }, { title: "Shipping" }, { title: "Detail" }];

export default function AdminShippingFinanceDetailPage() {
  const { t } = useTranslation();
  return (
    <PageContainer title={t("Shipping Finance Detail")} description="View shipping company finance details and process payouts">
      <Breadcrumb title={t("Shipping Detail")} items={BCrumb} />
      <ShippingFinanceDetail />
    </PageContainer>
  );
}
