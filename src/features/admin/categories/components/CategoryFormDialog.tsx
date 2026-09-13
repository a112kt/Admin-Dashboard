"use client";
import { useEffect, useState, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Box,
  Avatar,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Category, CategoryFormData } from "../types";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: CategoryFormData) => void;
  initialData?: Category | null;
  loading?: boolean;
}

export default function CategoryFormDialog({
  open,
  onClose,
  onSave,
  initialData,
  loading,
}: Props) {
  const { t } = useTranslation();
  const isEdit = !!initialData;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<CategoryFormData>({
    name: "",
    arName: "",
    imageUrl: "",
    imagePublicId: null,
    imageFile: null,
  });

  const [preview, setPreview] = useState<string | null>(null);

  const [errors, setErrors] = useState<{
    name?: string;
    arName?: string;
    image?: string;
  }>({});

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name,
        arName: initialData.arName,
        imageUrl: initialData.imageUrl,
        imagePublicId: null,
        imageFile: null,
      });
      setPreview(initialData.imageUrl);
    } else {
      setForm({ name: "", arName: "", imageUrl: "", imagePublicId: null, imageFile: null });
      setPreview(null);
    }
    setErrors({});
  }, [initialData, open]);

  useEffect(() => {
    if (form.imageFile) {
      const objectUrl = URL.createObjectURL(form.imageFile);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else if (initialData?.imageUrl) {
      setPreview(initialData.imageUrl);
    } else {
      setPreview(null);
    }
  }, [form.imageFile, initialData]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm({ ...form, imageFile: file });
    }
  };

  const validate = (): boolean => {
    const newErrors: typeof errors = {};
    if (!form.name.trim()) newErrors.name = t("Name is required");
    if (!form.arName.trim()) newErrors.arName = t("Arabic name is required");
    if (!preview) newErrors.image = t("Image is required");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSave(form);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {isEdit ? t("Edit Category") : t("Add Category")}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            {preview ? (
              <Box
                sx={{ position: "relative", cursor: "pointer" }}
                onClick={() => fileInputRef.current?.click()}
              >
                <Avatar
                  src={preview}
                  alt={form.name}
                  variant="rounded"
                  sx={{ width: 120, height: 120 }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    bgcolor: "rgba(0,0,0,0.4)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: 0,
                    "&:hover": { opacity: 1 },
                    borderRadius: "4px",
                  }}
                >
                  <Typography variant="body2" color="white" fontWeight={600}>
                    {t("Change Image")}
                  </Typography>
                </Box>
              </Box>
            ) : (
              <Box
                onClick={() => fileInputRef.current?.click()}
                sx={{
                  width: 120,
                  height: 120,
                  border: "2px dashed",
                  borderColor: errors.image ? "error.main" : "grey.400",
                  borderRadius: "4px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  "&:hover": { borderColor: "primary.main" },
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  {t("Upload Image")}
                </Typography>
              </Box>
            )}
            {errors.image && (
              <Typography variant="body2" color="error">
                {errors.image}
              </Typography>
            )}
          </Box>
          <TextField
            label={t("Name (English)")}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
            required
          />
          <TextField
            label={t("Name (Arabic)")}
            value={form.arName}
            onChange={(e) => setForm({ ...form, arName: e.target.value })}
            error={!!errors.arName}
            helperText={errors.arName}
            fullWidth
            required
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
