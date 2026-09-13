"use client";
import React from "react";
import Box from "@mui/material/Box";
import {
  Typography,
  FormControlLabel,
  RadioGroup,
  Stack,
  useTheme,
} from "@mui/material";
import { Grid } from "@mui/material";
import CustomFormLabel from "@/components/ui/forms/theme-elements/CustomFormLabel";
import CustomTextField from "@/components/ui/forms/theme-elements/CustomTextField";
import CustomRadio from "@/components/ui/forms/theme-elements/CustomRadio";
import CustomSlider from "@/components/ui/forms/theme-elements/CustomSlider";

interface PricingCardProps {
  basePrice: number;
  setBasePrice: React.Dispatch<React.SetStateAction<number>>;
  discountType: string;
  setDiscountType: React.Dispatch<React.SetStateAction<string>>;
  discountValue: number;
  setDiscountValue: React.Dispatch<React.SetStateAction<number>>;
  totalPrice: number;
}

const PricingCard = ({
  basePrice,
  setBasePrice,
  discountType,
  setDiscountType,
  discountValue,
  setDiscountValue,
  totalPrice,
}: PricingCardProps) => {
  const theme = useTheme();

  const handleBasePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBasePrice(Number(e.target.value));
  };

  const handleDiscountTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiscountType(e.target.value);
    setDiscountValue(0);
  };

  const handleDiscountValueChange = (
    event: any,
    newValue: number | number[]
  ) => {
    if (Array.isArray(newValue)) {
      setDiscountValue(newValue[0]);
    } else {
      setDiscountValue(newValue);
    }
  };



  return (
    <Box p={3}>
      <Typography variant="h5" mb={3}>
        Pricing
      </Typography>
      <Grid container spacing={3}>
        <Grid size={12}>
          <CustomFormLabel htmlFor="p_price" sx={{ mt: 0 }}>
            Base Price{" "}
            <Typography color="error.main" component="span">
              *
            </Typography>
          </CustomFormLabel>
          <CustomTextField
            id="p_price"
            placeholder="Product Price"
            fullWidth
            value={basePrice}
            onChange={handleBasePriceChange}
          />
          <Typography variant="body2">Set the product price.</Typography>
        </Grid>
        <Grid size={12}>
          <CustomFormLabel htmlFor="p_price" sx={{ mt: 0 }}>
            Discount Type{" "}
            <Typography color="error.main" component="span">
              *
            </Typography>
          </CustomFormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-form-control-label-placement"
            name="position"
            value={discountType}
            onChange={handleDiscountTypeChange}
          >
            <Stack
              direction="row"
              spacing={3}
              width={{ lg: "70%", xs: "100%" }}
              useFlexGap
              flexWrap="wrap"
            >
              <Box
                px={2}
                py={1}
                flexGrow={1}
                sx={{
                  border: `1px dashed ${theme.palette.divider}`,
                  textAlign: "center",
                }}
              >
                <FormControlLabel
                  value="no_discount"
                  control={<CustomRadio />}
                  label="No Discount"
                />
              </Box>
              <Box
                px={2}
                py={1}
                flexGrow={1}
                sx={{
                  border: `1px dashed ${theme.palette.divider}`,
                  textAlign: "center",
                }}
              >
                <FormControlLabel
                  value="percentage"
                  control={<CustomRadio />}
                  label="Percentage %"
                />
              </Box>
              {/* <Box
                px={2}
                py={1}
                flexGrow={1}
                sx={{
                  border: `1px dashed ${theme.palette.divider}`,
                  textAlign: "center",
                }}
              >
                <FormControlLabel
                  value="fixed"
                  control={<CustomRadio />}
                  label="Fixed Price"
                />
              </Box> */}
            </Stack>
          </RadioGroup>

          {discountType === "percentage" && (
            <>
              <CustomFormLabel>
                Set Discount Percentage{" "}
                <Typography color="error.main" component="span">
                  *
                </Typography>
              </CustomFormLabel>
              <CustomSlider
                aria-label="Volume"
                value={discountValue}
                onChange={handleDiscountValueChange}
              />
              <Typography variant="body2">
                Set a percentage discount to be applied on this product.
              </Typography>
            </>
          )}
        </Grid>
      </Grid>
      {discountType === "percentage" && <Grid size={12}>
        <Typography variant="h6" mt={2}>
          Discount Percentage : {discountValue} %
        </Typography>
      </Grid>}
      <Grid size={12}>

        <Typography variant="h6" mt={2}>
          Final Price: EGY {totalPrice.toFixed(2)}
        </Typography>
      </Grid>

    </Box>
  );
};

export default PricingCard;
