"use client";
import * as React from "react";
import Breadcrumb from "@/components/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/components/ui/container/PageContainer";
import BrandOrdersTable from "@/features/orders/components/BrandOrdersTable";
import { useTranslation } from 'react-i18next';

const BCrumb = [
  {
    title: "orders-management",
  },
  {
    title: "orders",
  },
];

const OrdersPage = () => {
  const { t } = useTranslation();
  return (
    <PageContainer
      title={t('Orders Table')}
      description="this is Orders Table"
    >
      <Breadcrumb title={t('Orders Table')} items={BCrumb} />
      <BrandOrdersTable />
    </PageContainer>
  );
};

export default OrdersPage;
