"use client";
import Breadcrumb from "@/components/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/components/ui/container/PageContainer";
import AuditTrailTable from "@/features/admin/audit/components/AuditTrailTable";
import { useTranslation } from "react-i18next";

const BCrumb = [{ title: "Finance" }, { title: "Audit Trail" }];

export default function AdminAuditTrailPage() {
  const { t } = useTranslation();
  return (
    <PageContainer title={t("Audit Trail")} description="View system activity and financial audit logs">
      <Breadcrumb title={t("Audit Trail")} items={BCrumb} />
      <AuditTrailTable />
    </PageContainer>
  );
}
