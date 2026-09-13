"use client";
import Breadcrumb from "@/components/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/components/ui/container/PageContainer";
import WithdrawalHistory from "@/features/payouts/brand/components/WithdrawalHistory";
import { useTranslation } from "react-i18next";

const BCrumb = [{ title: "Finance" }, { title: "Withdrawal History" }];

export default function BrandWithdrawalsPage() {
  const { t } = useTranslation();
  return (
    <PageContainer title={t("Withdrawal History")} description="View your past withdrawal requests">
      <Breadcrumb title={t("Withdrawal History")} items={BCrumb} />
      <WithdrawalHistory />
    </PageContainer>
  );
}
