"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, Grid, Tooltip, MenuItem } from "@mui/material";
import { Typography } from "@mui/material";
import CustomFormLabel from "@/components/ui/forms/theme-elements/CustomFormLabel";
import CustomTextField from "@/components/ui/forms/theme-elements/CustomTextField";
import { IconX } from "@tabler/icons-react";
import { IconPlus } from "@tabler/icons-react";
import CustomSelect from "@/components/ui/forms/theme-elements/CustomSelect";
import { useGetColors, useGetSizes } from "../../hooks/productsHooks";
import type { SizeRes, ColorRes, Variation, size } from "../../types";

interface Option {
  value: number;
  label: string;
}

const VariationCard = ({ variations, setVariations }: {
  variations: Variation[],
  setVariations: React.Dispatch<React.SetStateAction<Variation[]>>
}) => {
  const { data: sizes, isSuccess: isSizesSuccess } = useGetSizes();
  const { data: colors, isSuccess: isColorsSuccess } = useGetColors();
  const [colorsOptions, setColorsOptions] = useState<Option[]>([]);
  const [sizesOptions, setSizesOptions] = useState<Option[]>([]);

  const addVariation = () => {
    setVariations([...variations, { id: Date.now(), color: { value: "", label: "", sizes: [{ value: "", label: "", quantity: "" }] } }]);
  };

  const removeVariation = (id: number) => {
    setVariations(variations.filter((variation) => variation.id !== id));
  };

  const handleColorChange = (id: number, newValue: string) => {
    const selected = colorsOptions.find((c) => String(c.value) === newValue);
    setVariations(
      variations.map((v) =>
        v.id === id
          ? { ...v, color: { value: newValue, label: selected?.label || "", sizes: v.color.sizes } }
          : v
      )
    );
  };

  const handleSizeChange = (variationId: number, sizeIndex: number, newSize: string) => {
    const selected = sizesOptions.find((s) => String(s.value) === newSize);
    setVariations(
      variations.map((v) =>
        v.id === variationId
          ? {
              ...v,
              color: {
                ...v.color,
                sizes: v.color.sizes.map((s, i) =>
                  i === sizeIndex ? { ...s, value: newSize, label: selected?.label || "" } : s
                ),
              },
            }
          : v
      )
    );
  };

  const handleQuantityChange = (variationId: number, sizeIndex: number, newValue: string) => {
    setVariations(
      variations.map((v) =>
        v.id === variationId
          ? {
              ...v,
              color: {
                ...v.color,
                sizes: v.color.sizes.map((s, i) =>
                  i === sizeIndex ? { ...s, quantity: newValue } : s
                ),
              },
            }
          : v
      )
    );
  };

  const addSizeToVariation = (id: number) => {
    setVariations(
      variations.map((v) =>
        v.id === id
          ? { ...v, color: { ...v.color, sizes: [...v.color.sizes, { value: "", label: "", quantity: "" }] } }
          : v
      )
    );
  };

  const removeSizeFromVariation = (variationId: number, sizeIndex: number) => {
    setVariations(
      variations.map((v) =>
        v.id === variationId
          ? { ...v, color: { ...v.color, sizes: v.color.sizes.filter((_, i) => i !== sizeIndex) } }
          : v
      )
    );
  };

  useEffect(() => {
    if (isSizesSuccess && isColorsSuccess) {
      const sizesOptions = sizes.data.map((size: SizeRes) => ({ value: size.id, label: size.name }));
      const colorsOptions = colors.data.map((color: ColorRes) => ({ value: color.id, label: color.name }));
      setSizesOptions(sizesOptions);
      setColorsOptions(colorsOptions);
    }
  }, [isSizesSuccess, isColorsSuccess]);

  return (
    <Box p={3}>
      <Typography variant="h5">Variation</Typography>
      <CustomFormLabel sx={{ mt: 3 }}>Add Product Size And Color </CustomFormLabel>
      {variations.map((variation, index) => (
        <Box key={variation.id} sx={{ border: "1px solid #e0e0e0", borderRadius: 2, p: 2, mb: 2 }}>
          <Grid container spacing={2} mb={2} alignItems="center">
            <Grid size={{ xs: 12, lg: 10 }}>
              <CustomSelect
                id={`select-${variation.id}-color`}
                value={variation.color.value}
                onChange={(e: { target: { value: string } }) =>
                  handleColorChange(variation.id, e.target.value)
                }
                fullWidth
              >
                {colorsOptions.map((option: Option) => (
                  <MenuItem key={option.value} value={String(option.value)}>
                    {option.label}
                  </MenuItem>
                ))}
              </CustomSelect>
            </Grid>
            <Grid size={{ xs: 12, lg: 2 }} sx={{ display: "flex", justifyContent: "flex-end" }}>
              {index > 0 && (
                <Tooltip title="Delete Variation">
                  <Button color="error" onClick={() => removeVariation(variation.id)}>
                    <IconX size={21} />
                  </Button>
                </Tooltip>
              )}
            </Grid>
          </Grid>

          {variation.color.sizes.map((s, sizeIndex) => (
            <Grid container spacing={2} mb={2} alignItems="center" key={sizeIndex}>
              <Grid size={{ xs: 12, lg: 4 }}>
                <CustomSelect
                  id={`select-${variation.id}-size-${sizeIndex}`}
                  value={s.value}
                  onChange={(e: { target: { value: string } }) =>
                    handleSizeChange(variation.id, sizeIndex, e.target.value)
                  }
                  fullWidth
                >
                  {sizesOptions.map((option: Option) => (
                    <MenuItem key={option.value} value={String(option.value)}>
                      {option.label}
                    </MenuItem>
                  ))}
                </CustomSelect>
              </Grid>
              <Grid size={{ xs: 12, lg: 4 }}>
                <CustomTextField
                  type="number"
                  placeholder="Quantity"
                  value={s.quantity}
                  onChange={(e: { target: { value: string } }) =>
                    handleQuantityChange(variation.id, sizeIndex, e.target.value)
                  }
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12, lg: 4 }} sx={{ display: "flex", alignItems: "center" }}>
                {sizeIndex > 0 && (
                  <Tooltip title="Delete Size">
                    <Button color="error" onClick={() => removeSizeFromVariation(variation.id, sizeIndex)}>
                      <IconX size={21} />
                    </Button>
                  </Tooltip>
                )}
              </Grid>
            </Grid>
          ))}

          <Button
            variant="text"
            startIcon={<IconPlus size={18} />}
            onClick={() => addSizeToVariation(variation.id)}
          >
            Add another size
          </Button>
        </Box>
      ))}
      <Button
        variant="text"
        startIcon={<IconPlus size={18} />}
        onClick={addVariation}
      >
        Add another variation
      </Button>
    </Box>
  );
};

export default VariationCard;
