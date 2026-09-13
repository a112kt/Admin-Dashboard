"use client";
import { useState } from "react";
import Breadcrumb from "@/components/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/components/ui/container/PageContainer";
import ProductTableList from "@/features/brand/productsManagement/components/ProductTableList";
import BlankCard from "@/components/shared/BlankCard";
import { ProductProvider } from "@/context/EcommerceContext/index";
import { useTranslation } from 'react-i18next';
import { Button } from "@mui/material";
import Link from "next/link";
import { IconPlus } from "@tabler/icons-react";
import ProductOffer from "@/features/brand/productsManagement/components/productOffer";


const Products = () => {
  const { t } = useTranslation();
  const [offerDialogOpen, setOfferDialogOpen] = useState(false);
  const [offerProductIds, setOfferProductIds] = useState<string[]>([]);
  const [selectionResetKey, setSelectionResetKey] = useState(0);
  const BCrumb = [
    {
      to: "/",
      title: "Dashboard",
    },
    {
      title: t('Product List'),
    },
  ];
  return (
    <ProductProvider>
      <PageContainer
        title="eCommerce Product List"
        description="this is eCommerce Product List"
      >
        {/* breadcrumb */}
        <Breadcrumb
          title="Products Management"
          items={BCrumb}
          bg="linear-gradient(135deg, #1B2351 0%, #11183D 100%)"
        >
          <Button
            component={Link}
            color="secondary"
            href="/products-management/add-product"
            variant="contained"
            sx={{
              color: 'white',
              backdropFilter: 'blur(10px)',
            }}
            startIcon={<IconPlus size={18} />}
          >
            New Product
          </Button>
        </Breadcrumb>
        <BlankCard>
          {/* ------------------------------------------- */}
          {/* Left part */}
          {/* ------------------------------------------- */}
          <ProductTableList
            selectionResetKey={selectionResetKey}
            onCreateOffer={(ids) => { setOfferProductIds([...ids]); setOfferDialogOpen(true); }} />
        </BlankCard>
        <ProductOffer open={offerDialogOpen} onClose={() => setOfferDialogOpen(false)} productIds={offerProductIds} onSuccess={() => setSelectionResetKey((k) => k + 1)} />

      </PageContainer>
    </ProductProvider>
  );
};

export default Products;
