"use client";
import Breadcrumb from "@/components/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/components/ui/container/PageContainer";
import SettlementsTable from "@/features/payouts/brand/components/SettlementsTable";
import { useTranslation } from "react-i18next";

const BCrumb = [{ title: "Finance" }, { title: "Settlements" }];

export default function BrandSettlementsPage() {
  const { t } = useTranslation();
  return (
    <PageContainer title={t("Settlements")} description="View your order settlements">
      <Breadcrumb title={t("Settlements")} items={BCrumb} />
      <SettlementsTable />
    </PageContainer>
  );
}
