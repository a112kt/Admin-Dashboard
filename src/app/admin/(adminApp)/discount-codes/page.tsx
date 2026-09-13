"use client";
import PageContainer from "@/components/ui/container/PageContainer";
import Breadcrumb from "@/components/layout/shared/breadcrumb/Breadcrumb";
import DiscountCodesTable from "@/features/admin/discountCodes/components/DiscountCodesTable";
import { useTranslation } from "react-i18next";

export default function AdminDiscountCodesPage() {
  const { t } = useTranslation();

  const breadcrumbItems = [
    { title: "Admin", to: "/admin" },
    { title: t("Discount Codes"), to: "/admin/discount-codes" },
  ];

  return (
    <PageContainer
      title={t("Discount Codes")}
      description={t("Manage discount codes")}
    >
      <Breadcrumb title={t("Discount Codes")} items={breadcrumbItems} />
      <DiscountCodesTable />
    </PageContainer>
  );
}
