"use client";
import React, { useContext, useEffect } from "react";
import { Box, Stack, Typography, CardContent, Grid, Rating, Skeleton } from "@mui/material";
import Link from "next/link";
import BlankCard from "@/components/shared/BlankCard";
import Image from "next/image";
import { ProductContext } from "@/context/EcommerceContext/index";

const ProductRelated = () => {
  const { products } = useContext(ProductContext);
  const [isLoading, setLoading] = React.useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box>
      <Typography variant="h4" mb={2} mt={5}>Related Products</Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid display="flex" alignItems="stretch" key={product.name} size={{ xs: 12, lg: 3, sm: 4 }}>
            <BlankCard sx={{ p: 0 }} className="hoverCard">
              <Typography component={Link} href={`/products-management/products/${product.id}`}>
                {isLoading ? (
                  <Skeleton variant="rectangular" animation="wave" width="100%" height={270} />
                ) : (
                  <Image src={product.image} alt="img" width={250} height={268} style={{ width: "100%" }} />
                )}
              </Typography>
              <CardContent sx={{ p: 3, pt: 2 }}>
                <Typography fontWeight={600}>{product.name}</Typography>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mt={1}>
                  <Typography variant="h5">EGP {product.price}</Typography>
                </Stack>
              </CardContent>
            </BlankCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductRelated;
