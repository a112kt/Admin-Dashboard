"use client";
import React, { useContext } from "react";
import Box from "@mui/material/Box";
import { Autocomplete, Button, Grid, Typography } from "@mui/material";
import CustomFormLabel from "@/components/ui/forms/theme-elements/CustomFormLabel";
import CustomTextField from "@/components/ui/forms/theme-elements/CustomTextField";
import { ProductContext } from "@/context/EcommerceContext";

const new_tags = [
  { label: "New" },
  { label: "Trending" },
  { label: "Footwear" },
  { label: "Latest" },
];

const ProductDetails = () => {
  const { products, editedProduct, setEditedProduct } = useContext(ProductContext);

  const categoryOptions: { label: string }[] = [];

  return (
    <Box p={3}>
      <Typography variant="h5">Product Details</Typography>
      <Grid container mt={3}>
        <Grid display="flex" alignItems="center" size={12}>
          <CustomFormLabel htmlFor="p_cat" sx={{ mt: 0 }}>Categories</CustomFormLabel>
        </Grid>
        <Grid size={12}>
          <Autocomplete
            multiple
            fullWidth
            id="category"
            options={categoryOptions}
            getOptionLabel={(option) => option.label}
            value={editedProduct?.category?.map((cat: any) => ({ label: cat })) || []}
            onChange={(e, newValue) => {
              const updatedCategories = newValue.map((item) => item.label);
              setEditedProduct((prev: any) => prev ? { ...prev, category: updatedCategories } : null);
            }}
            filterSelectedOptions
            renderInput={(params) => <CustomTextField {...params} placeholder="Categories" />}
          />
          <Typography variant="body2" mb={2}>Add product to a category.</Typography>
        </Grid>
        <Grid display="flex" alignItems="center" size={12}>
          <CustomFormLabel htmlFor="p_tag">Tags</CustomFormLabel>
        </Grid>
        <Grid size={12}>
          <Autocomplete
            multiple
            fullWidth
            id="new-tags"
            options={new_tags}
            getOptionLabel={(option) => option.label}
            defaultValue={[new_tags[1]]}
            filterSelectedOptions
            renderInput={(params) => <CustomTextField {...params} placeholder="Tags" />}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetails;
