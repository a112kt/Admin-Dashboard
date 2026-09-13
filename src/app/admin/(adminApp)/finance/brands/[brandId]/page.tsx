"use client";
import Breadcrumb from "@/components/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/components/ui/container/PageContainer";
import BrandFinanceDetail from "@/features/payouts/admin/components/BrandFinanceDetail";
import { useTranslation } from "react-i18next";

const BCrumb = [{ title: "Finance" }, { title: "Brands" }, { title: "Detail" }];

export default function AdminBrandFinanceDetailPage() {
  const { t } = useTranslation();
  return (
    <PageContainer title={t("Brand Finance Detail")} description="View brand finance details and process payouts">
      <Breadcrumb title={t("Brand Detail")} items={BCrumb} />
      <BrandFinanceDetail />
    </PageContainer>
  );
}
