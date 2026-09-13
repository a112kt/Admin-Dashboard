"use client";
import PageContainer from "@/components/ui/container/PageContainer";
import Breadcrumb from "@/components/layout/shared/breadcrumb/Breadcrumb";
import CategoriesTable from "@/features/admin/categories/components/CategoriesTable";
import { useTranslation } from "react-i18next";

export default function AdminCategoriesPage() {
  const { t } = useTranslation();

  const breadcrumbItems = [
    { title: "Admin", to: "/admin" },
    { title: t("Categories"), to: "/admin/categories" },
  ];

  return (
    <PageContainer
      title={t("Categories")}
      description={t("Manage product categories")}
    >
      <Breadcrumb title={t("Categories")} items={breadcrumbItems} />
      <CategoriesTable />
    </PageContainer>
  );
}
