"use client";
import React from "react";
import Box from "@mui/material/Box";
import { Grid, MenuItem, InputBase, Tooltip, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import CustomTextField from "@/components/ui/forms/theme-elements/CustomTextField";
import CustomSelect from "@/components/ui/forms/theme-elements/CustomSelect";
import { IconX, IconGripVertical } from "@tabler/icons-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { SpecItem } from "./InformationManager";

const typeOptions = [
  { value: 1, label: "String" },
  { value: 2, label: "Number" },
  { value: 3, label: "Boolean" },
  { value: 4, label: "Color" },
];

const booleanOptions = [
  { value: "true", label: "True" },
  { value: "false", label: "False" },
];

const ColorInput = styled(InputBase)(() => ({
  width: 40,
  height: 40,
  padding: 0,
  cursor: "pointer",
  "& input": { padding: 0, cursor: "pointer" },
}));

interface UngroupedSpecCardProps {
  id: string;
  keyValue: string;
  type: number;
  value: string;
  onKeyChange: (val: string) => void;
  onTypeChange: (val: number) => void;
  onValueChange: (val: string) => void;
  onDelete: () => void;
}

const UngroupedSpecCard = ({
  id,
  keyValue,
  type,
  value,
  onKeyChange,
  onTypeChange,
  onValueChange,
  onDelete,
}: UngroupedSpecCardProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  const renderValueInput = () => {
    switch (type) {
      case 2:
        return (
          <CustomTextField
            type="number"
            placeholder="0"
            fullWidth
            size="small"
            value={value}
            onChange={(e: any) => onValueChange(e.target.value)}
          />
        );
      case 3:
        return (
          <CustomSelect
            value={value || "true"}
            onChange={(e: any) => onValueChange(e.target.value)}
            fullWidth
            size="small"
          >
            {booleanOptions.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </CustomSelect>
        );
      case 4:
        return (
          <Box display="flex" gap={1} alignItems="center">
            <ColorInput
              type="color"
              value={value || "#000000"}
              onChange={(e: any) => onValueChange(e.target.value)}
            />
            <CustomTextField
              placeholder="#000000"
              fullWidth
              size="small"
              value={value}
              onChange={(e: any) => onValueChange(e.target.value)}
            />
          </Box>
        );
      default:
        return (
          <CustomTextField
            placeholder="e.g. Cotton"
            fullWidth
            size="small"
            value={value}
            onChange={(e: any) => onValueChange(e.target.value)}
          />
        );
    }
  };

  return (
    <Box
      ref={setNodeRef}
      style={style}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        border: "1px solid",
        borderColor: "grey.200",
        borderRadius: 2,
        p: 1.5,
        bgcolor: "background.paper",
      }}
    >
      <Box
        {...attributes}
        {...listeners}
        sx={{
          cursor: "grab",
          display: "flex",
          alignItems: "center",
          color: "text.secondary",
          "&:hover": { color: "text.primary" },
        }}
      >
        <IconGripVertical size={18} />
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ minWidth: 40, fontSize: 12 }}>
        Standalone
      </Typography>
      <Grid container spacing={1} alignItems="center" sx={{ flex: 1 }}>
        <Grid size={{ xs: 12, sm: 3 }}>
          <CustomTextField
            placeholder="Key"
            fullWidth
            size="small"
            value={keyValue}
            onChange={(e: any) => onKeyChange(e.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 3 }}>
          <CustomSelect
            value={String(type)}
            onChange={(e: any) => onTypeChange(Number(e.target.value))}
            fullWidth
            size="small"
          >
            {typeOptions.map((opt) => (
              <MenuItem key={opt.value} value={String(opt.value)}>
                {opt.label}
              </MenuItem>
            ))}
          </CustomSelect>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          {renderValueInput()}
        </Grid>
      </Grid>
      <Tooltip title="Remove">
        <IconButton size="small" color="error" onClick={onDelete}>
          <IconX size={18} />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default UngroupedSpecCard;
