"use client";
import Breadcrumb from "@/components/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/components/ui/container/PageContainer";
import WalletSummary from "@/features/payouts/brand/components/WalletSummary";
import { useTranslation } from "react-i18next";

const BCrumb = [{ title: "Finance" }];

export default function BrandFinancePage() {
  const { t } = useTranslation();
  return (
    <PageContainer title={t("Finance")} description="Manage your wallet and finances">
      <Breadcrumb title={t("Finance")} items={BCrumb} />
      <WalletSummary />
    </PageContainer>
  );
}
