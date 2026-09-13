"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  Grid,
  MenuItem,
  IconButton,
  InputBase,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CustomSelect from "@/components/ui/forms/theme-elements/CustomSelect";
import CustomTextField from "@/components/ui/forms/theme-elements/CustomTextField";
import { IconX, IconPlus } from "@tabler/icons-react";

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

interface ModalSpecItem {
  tempId: number;
  key: string;
  type: number;
  value: string;
}

interface GroupModalProps {
  open: boolean;
  initialName?: string;
  initialSpecs?: { key: string; type: number; value: string }[];
  onSave: (name: string, specs: { key: string; type: number; value: string }[]) => void;
  onClose: () => void;
}

const GroupModal = ({ open, initialName, initialSpecs, onSave, onClose }: GroupModalProps) => {
  const [name, setName] = useState("");
  const [specs, setSpecs] = useState<ModalSpecItem[]>([]);

  useEffect(() => {
    if (open) {
      setName(initialName || "");
      setSpecs(
        (initialSpecs || []).map((s, i) => ({
          tempId: Date.now() + i,
          key: s.key,
          type: s.type,
          value: s.value,
        }))
      );
    }
  }, [open, initialName, initialSpecs]);

  const addSpec = () => {
    setSpecs((prev) => [...prev, { tempId: Date.now(), key: "", type: 1, value: "" }]);
  };

  const removeSpec = (tempId: number) => {
    setSpecs((prev) => prev.filter((s) => s.tempId !== tempId));
  };

  const updateSpec = (tempId: number, field: keyof ModalSpecItem, val: string | number) => {
    setSpecs((prev) =>
      prev.map((s) => (s.tempId === tempId ? { ...s, [field]: val } : s))
    );
  };

  const handleSave = () => {
    if (!name.trim()) return;
    onSave(
      name.trim(),
      specs.map((s) => ({ key: s.key, type: s.type, value: s.value }))
    );
  };

  const renderValueInput = (spec: ModalSpecItem) => {
    switch (spec.type) {
      case 2:
        return (
          <CustomTextField
            type="number"
            placeholder="0"
            fullWidth
            size="small"
            value={spec.value}
            onChange={(e: any) => updateSpec(spec.tempId, "value", e.target.value)}
          />
        );
      case 3:
        return (
          <CustomSelect
            value={spec.value || "true"}
            onChange={(e: any) => updateSpec(spec.tempId, "value", e.target.value)}
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
              value={spec.value || "#000000"}
              onChange={(e: any) => updateSpec(spec.tempId, "value", e.target.value)}
            />
            <CustomTextField
              placeholder="#000000"
              fullWidth
              size="small"
              value={spec.value}
              onChange={(e: any) => updateSpec(spec.tempId, "value", e.target.value)}
            />
          </Box>
        );
      default:
        return (
          <CustomTextField
            placeholder="e.g. Cotton"
            fullWidth
            size="small"
            value={spec.value}
            onChange={(e: any) => updateSpec(spec.tempId, "value", e.target.value)}
          />
        );
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{initialName ? "Edit Group" : "Add Group"}</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 1 }}>
          <TextField
            label="Group Name"
            fullWidth
            required
            value={name}
            onChange={(e: any) => setName(e.target.value)}
            sx={{ mb: 2 }}
            error={!name.trim() && name !== ""}
          />
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Specifications
          </Typography>
          {specs.map((spec) => (
            <Box
              key={spec.tempId}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 1,
                p: 1,
                border: "1px solid",
                borderColor: "grey.200",
                borderRadius: 1,
              }}
            >
              <Grid container spacing={1} alignItems="center" sx={{ flex: 1 }}>
                <Grid size={{ xs: 12, sm: 3 }}>
                  <CustomTextField
                    placeholder="Key"
                    fullWidth
                    size="small"
                    value={spec.key}
                    onChange={(e: any) => updateSpec(spec.tempId, "key", e.target.value)}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 3 }}>
                  <CustomSelect
                    value={String(spec.type)}
                    onChange={(e: any) => updateSpec(spec.tempId, "type", Number(e.target.value))}
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
                  {renderValueInput(spec)}
                </Grid>
              </Grid>
              <IconButton size="small" color="error" onClick={() => removeSpec(spec.tempId)}>
                <IconX size={18} />
              </IconButton>
            </Box>
          ))}
          <Button
            variant="text"
            size="small"
            startIcon={<IconPlus size={16} />}
            onClick={addSpec}
            sx={{ mt: 1 }}
          >
            Add Specification
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave} disabled={!name.trim()}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GroupModal;
