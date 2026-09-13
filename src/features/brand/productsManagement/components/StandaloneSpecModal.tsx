"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Grid,
  MenuItem,
  InputBase,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CustomSelect from "@/components/ui/forms/theme-elements/CustomSelect";
import CustomTextField from "@/components/ui/forms/theme-elements/CustomTextField";

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

interface StandaloneSpecModalProps {
  open: boolean;
  onSave: (data: { key: string; type: number; value: string }) => void;
  onClose: () => void;
}

const StandaloneSpecModal = ({ open, onSave, onClose }: StandaloneSpecModalProps) => {
  const [key, setKey] = useState("");
  const [type, setType] = useState(1);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (open) {
      setKey("");
      setType(1);
      setValue("");
    }
  }, [open]);

  const handleSave = () => {
    if (!key.trim()) return;
    onSave({ key: key.trim(), type, value });
  };

  const renderValueInput = () => {
    switch (type) {
      case 2:
        return (
          <CustomTextField
            type="number"
            placeholder="0"
            fullWidth
            value={value}
            onChange={(e: any) => setValue(e.target.value)}
          />
        );
      case 3:
        return (
          <CustomSelect
            value={value || "true"}
            onChange={(e: any) => setValue(e.target.value)}
            fullWidth
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
              onChange={(e: any) => setValue(e.target.value)}
            />
            <CustomTextField
              placeholder="#000000"
              fullWidth
              value={value}
              onChange={(e: any) => setValue(e.target.value)}
            />
          </Box>
        );
      default:
        return (
          <CustomTextField
            placeholder="e.g. Cotton"
            fullWidth
            value={value}
            onChange={(e: any) => setValue(e.target.value)}
          />
        );
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Information</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 1 }}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <CustomTextField
                label="Key"
                placeholder="e.g. Material"
                fullWidth
                value={key}
                onChange={(e: any) => setKey(e.target.value)}
              />
            </Grid>
            <Grid size={12}>
              <CustomSelect
                label="Type"
                value={String(type)}
                onChange={(e: any) => {
                  setType(Number(e.target.value));
                  setValue("");
                }}
                fullWidth
              >
                {typeOptions.map((opt) => (
                  <MenuItem key={opt.value} value={String(opt.value)}>
                    {opt.label}
                  </MenuItem>
                ))}
              </CustomSelect>
            </Grid>
            <Grid size={12}>
              {renderValueInput()}
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave} disabled={!key.trim()}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StandaloneSpecModal;
