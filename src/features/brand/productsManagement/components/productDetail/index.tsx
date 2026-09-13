"use client"
import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Box, Grid, Typography, Chip, Button, Rating, Divider,
  Stack, useTheme,
} from "@mui/material";
import { ProducctDetailRes } from "@/features/brand/productsManagement/types";
import { deleteProduct } from "@/features/brand/productsManagement/services";
import { useRouter } from "next/navigation";
import ConfirmDeleteDialog from "@/components/ui/dialog/ConfirmDeleteDialog";


const ProductDetail = ({ productData }: { productData: ProducctDetailRes }) => {
  const router = useRouter()
  const theme = useTheme();
  const { productId } = useParams<{ productId: string }>();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDelete = async () => {
    await deleteProduct(Number(productId));
    setDeleteDialogOpen(false);
    router.push("/products-management/products");
  };

  return (
    <Box p={0}>
      {productData ? (
        <>
          <Box display="flex" alignItems="center">
            <Chip label={productData?.stockStatus === "InStock" ? "In Stock" : productData?.stockStatus} color={productData?.stockStatus === "InStock" || productData?.stockStatus === "In Stock" ? "success" : "error"} size="small" />
            <Typography color="textSecondary" variant="caption" ml={1} textTransform="capitalize">
              {productData?.category?.name}
            </Typography>
          </Box>
          <Typography fontWeight="600" variant="h4" mt={1}>
            {productData?.name}
          </Typography>
          <Typography mt={2} variant="h4" fontWeight={600}>
            {productData?.discountedPrice && <Box component={"small"} color={theme.palette.text.secondary} sx={{ textDecoration: "line-through" }}>
              EGY {productData?.price}
            </Box>}
            {" "}
            EGY{" "}{productData?.discountedPrice ?? productData?.price}
          </Typography>
          <Stack direction={"row"} alignItems="center" gap="10px" mt={2} pb={3}>
            <Rating name="simple-controlled" size="small" value={productData?.reviewsSummary.averageRating} readOnly />
            <Typography component={Link} href="/" fontWeight={500} sx={{ textDecoration: 'none', color: 'primary.main' }}>
              {productData?.reviewsSummary.totalReviews} reviews
            </Typography>
          </Stack>
          <Divider />
          <Grid container spacing={2} mt={0}>
            {productData?.availableColors.length > 0 && productData?.availableColors.map((color, idx) => (
              <Stack key={idx} flexDirection={"column"} gap={1} borderRight={"1px solid " + theme.palette.grey[100]} p={2}>
                <Stack py={0} direction="row" alignItems="center">
                  <Typography variant="h6" mr={1}>Colors:</Typography>
                  <Box sx={{ backgroundColor: color.hexCode, width: 15, height: 15, borderRadius: "50%" }} />
                </Stack>
                <Stack flexDirection={"row"} gap={1} >
                  <Typography variant="h6">QTY : </Typography>
                  <Typography variant="subtitle1">{color.quantity}</Typography>
                </Stack>
              </Stack>
            ))
            }

          </Grid>

          <Divider />
          <Grid container spacing={2} mt={3}>
            <Grid size={{ xs: 12, lg: 4, md: 6 }}>
              <Button color="primary" size="large" fullWidth variant="contained" onClick={() => {
                router.push(`/products-management/edit-product/${productData?.id}`)
              }} sx={{ borderRadius: "10px" }}>
                Edit
              </Button>
            </Grid>
            <Grid size={{ xs: 12, lg: 4, md: 6 }}>
              <Button color="error" size="large" fullWidth variant="contained" onClick={() => setDeleteDialogOpen(true)} sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', borderRadius: "10px" }}>
                Delete
              </Button>
            </Grid>
          </Grid>
          <ConfirmDeleteDialog
            open={deleteDialogOpen}
            onClose={() => setDeleteDialogOpen(false)}
            onConfirm={handleDelete}
            title="Delete Product"
            itemName={productData?.name}
          />
        </>
      ) : (
        "No product"
      )}
    </Box>
  );
};

export default ProductDetail;
