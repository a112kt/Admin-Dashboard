"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { DiscountCode, DiscountCodeFormData } from "../types";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: DiscountCodeFormData) => void;
  initialData?: DiscountCode | null;
  loading?: boolean;
}

export default function DiscountCodeFormDialog({
  open,
  onClose,
  onSave,
  initialData,
  loading,
}: Props) {
  const { t } = useTranslation();
  const isEdit = !!initialData;

  const [form, setForm] = useState<DiscountCodeFormData>({
    code: "",
    expirationDate: "",
    discountValue: 0,
  });

  const [errors, setErrors] = useState<{
    code?: string;
    expirationDate?: string;
    discountValue?: string;
  }>({});

  useEffect(() => {
    if (initialData) {
      setForm({
        code: initialData.code,
        expirationDate: initialData.expirationDate
          ? new Date(initialData.expirationDate).toISOString().slice(0, 16)
          : "",
        discountValue: initialData.discountValue,
      });
    } else {
      setForm({ code: "", expirationDate: "", discountValue: 0 });
    }
    setErrors({});
  }, [initialData, open]);

  const validate = (): boolean => {
    const newErrors: typeof errors = {};
    if (!form.code.trim()) newErrors.code = t("Code is required");
    if (!form.expirationDate)
      newErrors.expirationDate = t("Expiration date is required");
    if (form.discountValue < 0 || form.discountValue > 50)
      newErrors.discountValue = t("Must be between 0 and 50");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSave({
        ...form,
        expirationDate: new Date(form.expirationDate).toISOString(),
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {isEdit ? t("Edit Discount Code") : t("Add Discount Code")}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <TextField
            label={t("Code")}
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value })}
            error={!!errors.code}
            helperText={errors.code}
            fullWidth
            required
          />
          <TextField
            label={t("Expiration Date")}
            type="datetime-local"
            value={form.expirationDate}
            onChange={(e) =>
              setForm({ ...form, expirationDate: e.target.value })
            }
            error={!!errors.expirationDate}
            helperText={errors.expirationDate}
            fullWidth
            required
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <TextField
            label={t("Discount Value (%)")}
            type="number"
            value={form.discountValue}
            onChange={(e) =>
              setForm({ ...form, discountValue: Number(e.target.value) })
            }
            error={!!errors.discountValue}
            helperText={errors.discountValue}
            fullWidth
            required
            inputProps={{ min: 0, max: 50 }}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t("Cancel")}</Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
        >
          {isEdit ? t("Update") : t("Create")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
