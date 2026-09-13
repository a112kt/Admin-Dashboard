"use client";
import Breadcrumb from "@/components/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/components/ui/container/PageContainer";
import WithdrawRequestForm from "@/features/payouts/brand/components/WithdrawRequestForm";
import { useTranslation } from "react-i18next";

const BCrumb = [{ title: "Finance" }, { title: "Request Withdrawal" }];

export default function BrandWithdrawPage() {
  const { t } = useTranslation();
  return (
    <PageContainer title={t("Request Withdrawal")} description="Submit a withdrawal request">
      <Breadcrumb title={t("Request Withdrawal")} items={BCrumb} />
      <WithdrawRequestForm />
    </PageContainer>
  );
}
