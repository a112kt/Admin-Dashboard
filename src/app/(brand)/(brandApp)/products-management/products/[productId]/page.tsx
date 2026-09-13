"use client"
import { Box, Grid } from "@mui/material";
import ProductCarousel from "@/features/brand/productsManagement/components/productDetail/ProductCarousel";
import Breadcrumb from "@/components/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/components/ui/container/PageContainer";
import ProductDetail from "@/features/brand/productsManagement/components/productDetail";
import ProductDesc from "@/features/brand/productsManagement/components/productDetail/ProductDesc";
import ProductRelated from "@/features/brand/productsManagement/components/productDetail/ProductRelated";
import BlankCard from "@/components/shared/BlankCard";
import { ProductProvider } from "@/context/EcommerceContext/index";
import { useGetProductById } from "@/features/brand/productsManagement/hooks/productsHooks";
import { useParams } from "next/navigation";

import { useTranslation } from 'react-i18next';

const BCrumb = [
  {
    to: "/",
    title: "Dashboard",
  },
  {
    title: "Products",
    to: "/products-management/products",
  },
  {
    title: "detail",
  },
];

const ProductDetails = () => {
  const { productId } = useParams();
  const { data: productData, isSuccess, isLoading } = useGetProductById(Number(productId));
  if (productData) {

    return (
      <ProductProvider>
        <PageContainer title="Product Detail" description="this is Product Detail">
          <Breadcrumb title="Product Detail" items={BCrumb} />
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <BlankCard sx={{ padding: 4 }}>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }} sx={{ minWidth: 0 }}>
                    <Box sx={{ maxWidth: "600px", overflow: "hidden" }}> <ProductCarousel mediaUrls={productData?.data?.mediaUrls?.map(m => m.url) ?? []} /></Box>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6, sm: 12, lg: 6 }}>
                    <ProductDetail productData={productData?.data} />
                  </Grid>
                </Grid>
              </BlankCard>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, lg: 12 }}>
              <ProductDesc productData={productData?.data} />
            </Grid>
          </Grid>
        </PageContainer>
      </ProductProvider>
    );
  }
};

export default ProductDetails;

