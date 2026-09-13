"use client";
import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";
import CustomFormLabel from "@/components/ui/forms/theme-elements/CustomFormLabel";
import CustomTextField from "@/components/ui/forms/theme-elements/CustomTextField";

import dynamic from "next/dynamic";

const TiptapEditor = dynamic(
  () => import("@/components/ui/forms/form-tiptap/TiptapEditor"),
  {
    ssr: false,
  }
);

const GeneralCard = ({
  title,
  setTitle,
  titleError,
  description,
  setDescription,
}: {
  title: string;
  setTitle: (val: string) => void;
  titleError?: string;
  description: string;
  setDescription: (val: string) => void;
}) => {
  return (
    <Box p={3}>
      <Typography variant="h5">General</Typography>
      <Grid container mt={3}>
        <Grid display="flex" alignItems="center" size={12}>
          <CustomFormLabel htmlFor="p_name" sx={{ mt: 0 }}>
            Product Name{" "}
            <Typography color="error.main" component="span">
              *
            </Typography>
          </CustomFormLabel>
        </Grid>
        <Grid size={12}>
          <CustomTextField
            id="p_name"
            placeholder="Product Name"
            fullWidth
            value={title}
            onChange={(e: { target: { value: string } }) =>
              setTitle(e.target.value)
            }
            error={!!titleError}
          />
          {titleError && (
            <Typography variant="body2" color="error.main">
              {titleError}
            </Typography>
          )}
          {!titleError && (
            <Typography variant="body2">
              A product name is required and recommended to be unique.
            </Typography>
          )}
        </Grid>
        <Grid display="flex" alignItems="center" size={12}>
          <CustomFormLabel htmlFor="desc">Description</CustomFormLabel>
        </Grid>
        <Grid size={12}>
          <TiptapEditor value={description} onChange={(html) => setDescription(html)} />
          <Typography variant="body2">
            Set a description to the product for better visibility.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GeneralCard;
