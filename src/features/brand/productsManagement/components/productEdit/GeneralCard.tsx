"use client";
import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";
import CustomFormLabel from "@/components/ui/forms/theme-elements/CustomFormLabel";
import CustomTextField from "@/components/ui/forms/theme-elements/CustomTextField";

const GeneralCard = ({
  title,
  setTitle,
  titleError,
}: {
  title: string;
  setTitle: (val: string) => void;
  titleError?: string;
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
      </Grid>
    </Box>
  );
};

export default GeneralCard;
