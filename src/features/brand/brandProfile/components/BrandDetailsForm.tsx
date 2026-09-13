"use client";
import { useState, useEffect, useRef } from "react";
import {
  Avatar, Box, Button, Grid, Stack, TextField, Typography, IconButton, CircularProgress,
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
} from "@mui/material";
import { Icon } from "@iconify/react";
import BlankCard from "@/components/shared/BlankCard";
import { BrandDetailsResponse, UpdateBrandDetailsReq, SocialLinkReqDto } from "../types";
import RichTextEditor from "../../auth/register/components/RichTextEditor";

interface Props {
  brand: BrandDetailsResponse;
  onSubmit: (data: UpdateBrandDetailsReq) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
  onLogoUpload: (file: File) => Promise<void>;
  onCoverUpload: (file: File) => Promise<void>;
  onLogoDelete: () => Promise<void>;
  onCoverDelete: () => Promise<void>;
  isLogoUploading?: boolean;
  isCoverUploading?: boolean;
}

const BrandDetailsForm = ({
  brand, onSubmit, onCancel, isSubmitting,
  onLogoUpload, onCoverUpload, onLogoDelete, onCoverDelete,
  isLogoUploading, isCoverUploading,
}: Props) => {
  const logoInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<"logo" | "cover" | null>(null);
  const [deleting, setDeleting] = useState(false);

  const [form, setForm] = useState<UpdateBrandDetailsReq>({
    displayName: brand.displayName,
    description: brand.description,
    returnPolicyAsHtml: brand.returnPolicyAsHtml,
    category: brand.category,
    country: brand.country,
    governorate: brand.governorate,
    district: brand.district,
    numberOfEmployees: brand.numberOfEmployees,
    payoutPhoneNumber: brand.payoutPhoneNumber || "",
    bankAccountNumber: brand.bankAccountNumber || "",
    socialLinks: brand.socialLinks.map((sl) => ({ id: sl.id, platform: sl.platform, url: sl.url })),
  });

  useEffect(() => {
    setForm({
      displayName: brand.displayName,
      description: brand.description,
      returnPolicyAsHtml: brand.returnPolicyAsHtml,
      category: brand.category,
      country: brand.country,
      governorate: brand.governorate,
      district: brand.district,
      numberOfEmployees: brand.numberOfEmployees,
      payoutPhoneNumber: brand.payoutPhoneNumber || "",
      bankAccountNumber: brand.bankAccountNumber || "",
      socialLinks: brand.socialLinks.map((sl) => ({ id: sl.id, platform: sl.platform, url: sl.url })),
    });
  }, [brand]);

  const handleLogoFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onLogoUpload(file);
    }
    if (e.target) e.target.value = "";
  };

  const handleCoverFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onCoverUpload(file);
    }
    if (e.target) e.target.value = "";
  };

  const updateField = <K extends keyof UpdateBrandDetailsReq>(key: K, value: UpdateBrandDetailsReq[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const addSocialLink = () => {
    setForm((prev) => ({
      ...prev,
      socialLinks: [...prev.socialLinks, { platform: "", url: "" }],
    }));
  };

  const updateSocialLink = (index: number, field: keyof SocialLinkReqDto, value: string) => {
    setForm((prev) => {
      const links = [...prev.socialLinks];
      links[index] = { ...links[index], [field]: value };
      return { ...prev, socialLinks: links };
    });
  };

  const removeSocialLink = (index: number) => {
    setForm((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index),
    }));
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm) return;
    setDeleting(true);
    try {
      if (deleteConfirm === "logo") {
        await onLogoDelete();
      } else {
        await onCoverDelete();
      }
    } finally {
      setDeleting(false);
      setDeleteConfirm(null);
    }
  };

  const handleSubmit = async () => {
    await onSubmit(form);
  };

  return (
    <BlankCard>
      <Box p={3}>
        <Typography variant="h5" fontWeight={600} mb={3}>Edit Brand Information</Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField fullWidth label="Brand Name" value={form.displayName} onChange={(e) => updateField("displayName", e.target.value)} size="small" />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField fullWidth label="Category" value={form.category} onChange={(e) => updateField("category", e.target.value)} size="small" />
          </Grid>
          <Grid size={12}>
            <TextField fullWidth label="Description" value={form.description} onChange={(e) => updateField("description", e.target.value)} multiline rows={3} size="small" />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="body2" fontWeight={600} mb={1}>Brand Logo</Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar src={brand.logoUrl} alt="Logo" sx={{ width: 64, height: 64 }} />
              <Stack direction="row" spacing={1}>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={isLogoUploading ? <CircularProgress size={14} /> : <Icon icon="solar:gallery-upload-line-duotone" width={16} />}
                  disabled={isLogoUploading}
                  onClick={() => logoInputRef.current?.click()}
                >
                  Change
                </Button>
                {brand.logoUrl && (
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    startIcon={<Icon icon="solar:trash-bin-trash-line-duotone" width={16} />}
                    onClick={() => setDeleteConfirm("logo")}
                  >
                    Remove
                  </Button>
                )}
              </Stack>
            </Stack>
            <input ref={logoInputRef} type="file" accept="image/*" onChange={handleLogoFile} style={{ display: "none" }} />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="body2" fontWeight={600} mb={1}>Cover Image</Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              {brand.coverImageUrl ? (
                <Avatar src={brand.coverImageUrl} alt="Cover" variant="rounded" sx={{ width: 96, height: 54 }} />
              ) : (
                <Box sx={{ width: 96, height: 54, borderRadius: 1, bgcolor: "grey.200", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon icon="solar:gallery-line-duotone" width={24} />
                </Box>
              )}
              <Stack direction="row" spacing={1}>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={isCoverUploading ? <CircularProgress size={14} /> : <Icon icon="solar:gallery-upload-line-duotone" width={16} />}
                  disabled={isCoverUploading}
                  onClick={() => coverInputRef.current?.click()}
                >
                  Change
                </Button>
                {brand.coverImageUrl && (
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    startIcon={<Icon icon="solar:trash-bin-trash-line-duotone" width={16} />}
                    onClick={() => setDeleteConfirm("cover")}
                  >
                    Remove
                  </Button>
                )}
              </Stack>
            </Stack>
            <input ref={coverInputRef} type="file" accept="image/*" onChange={handleCoverFile} style={{ display: "none" }} />
          </Grid>

          <Grid size={12}>
            <RichTextEditor
              label="Return Policy"
              value={form.returnPolicyAsHtml}
              onChange={(html) => updateField("returnPolicyAsHtml", html)}
              placeholder="Describe your return policy..."
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField fullWidth label="Country" value={form.country} onChange={(e) => updateField("country", e.target.value)} size="small" />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField fullWidth label="Governorate" value={form.governorate} onChange={(e) => updateField("governorate", e.target.value)} size="small" />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField fullWidth label="District" value={form.district} onChange={(e) => updateField("district", e.target.value)} size="small" />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField fullWidth label="Number of Employees" type="number" value={form.numberOfEmployees} onChange={(e) => updateField("numberOfEmployees", Number(e.target.value))} size="small" />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField fullWidth label="Payout Phone" value={form.payoutPhoneNumber} onChange={(e) => updateField("payoutPhoneNumber", e.target.value)} size="small" />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField fullWidth label="Bank Account" value={form.bankAccountNumber} onChange={(e) => updateField("bankAccountNumber", e.target.value)} size="small" />
          </Grid>

          <Grid size={12}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" fontWeight={600}>Social Links</Typography>
              <Button size="small" variant="outlined" startIcon={<Icon icon="solar:add-circle-line-duotone" />} onClick={addSocialLink}>
                Add Link
              </Button>
            </Stack>
            {form.socialLinks.map((link, index) => (
              <Stack key={index} direction="row" spacing={1} mt={1} alignItems="center">
                <TextField size="small" placeholder="Platform (e.g. Instagram)" value={link.platform} onChange={(e) => updateSocialLink(index, "platform", e.target.value)} sx={{ flex: 1 }} />
                <TextField size="small" placeholder="URL" value={link.url} onChange={(e) => updateSocialLink(index, "url", e.target.value)} sx={{ flex: 2 }} />
                <IconButton color="error" onClick={() => removeSocialLink(index)}>
                  <Icon icon="solar:trash-bin-trash-line-duotone" width={20} />
                </IconButton>
              </Stack>
            ))}
          </Grid>
        </Grid>

        <Stack direction="row" justifyContent="flex-end" spacing={2} mt={4}>
          <Button variant="outlined" onClick={onCancel} disabled={isSubmitting}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit} disabled={isSubmitting} startIcon={isSubmitting ? <CircularProgress size={18} /> : undefined}>
            Save Changes
          </Button>
        </Stack>
      </Box>

      <Dialog open={!!deleteConfirm} onClose={() => !deleting && setDeleteConfirm(null)} maxWidth="xs" fullWidth>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the {deleteConfirm === "logo" ? "brand logo" : "cover image"}? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirm(null)} disabled={deleting} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            disabled={deleting}
            color="error"
            variant="contained"
            startIcon={deleting ? <CircularProgress size={18} color="inherit" /> : undefined}
          >
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </BlankCard>
  );
};

export default BrandDetailsForm;
