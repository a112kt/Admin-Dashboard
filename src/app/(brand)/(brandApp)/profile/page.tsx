"use client";
import { useState } from "react";
import {
  Box, Button, CircularProgress, Grid, Stack, Typography, Snackbar, Alert
} from "@mui/material";
import { Icon } from "@iconify/react";
import Breadcrumb from "@/components/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/components/ui/container/PageContainer";
import BlankCard from "@/components/shared/BlankCard";
import { useGetBrandDetails, useUpdateBrandDetails, useGetTopEngagedUsers, useUploadBrandLogo, useUploadBrandCover, useDeleteBrandLogo, useDeleteBrandCover } from "@/features/brand/brandProfile/hooks/brandProfileHooks";
import BrandInfoCard from "@/features/brand/brandProfile/components/BrandInfoCard";
import BrandOwnerCard from "@/features/brand/brandProfile/components/BrandOwnerCard";
import StatsCard from "@/features/brand/brandProfile/components/StatsCard";
import TopEngagedUsersTable from "@/features/brand/brandProfile/components/TopEngagedUsersTable";
import BrandDetailsForm from "@/features/brand/brandProfile/components/BrandDetailsForm";
import { useMyBrand } from "@/features/brand/Home/hooks/useMyBrand";
import { UpdateBrandDetailsReq } from "@/features/brand/brandProfile/types";
import { useTranslation } from "react-i18next";
import { useSnackbarAnchor } from "@/hooks/useSnackbarAnchor";

const Profile = () => {
  const { t } = useTranslation();

  const [isEditing, setIsEditing] = useState(false);
  const snackbarAnchor = useSnackbarAnchor("top");
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({
    open: false, message: "", severity: "success",
  });

  const { brand: myBrand, loading: myBrandLoading } = useMyBrand();
  const brandId = myBrand?.id;

  const { data: brandRes, isLoading: brandLoading, isError } = useGetBrandDetails(brandId!);
  const { data: engagedUsersRes, isLoading: isEngagedLoading } = useGetTopEngagedUsers(brandId!);
  const { mutateAsync: updateBrand, isPending: isUpdating } = useUpdateBrandDetails();
  const { mutateAsync: uploadLogo, isPending: isLogoUploading } = useUploadBrandLogo();
  const { mutateAsync: uploadCover, isPending: isCoverUploading } = useUploadBrandCover();
  const { mutateAsync: deleteLogo } = useDeleteBrandLogo();
  const { mutateAsync: deleteCover } = useDeleteBrandCover();

  const brand = brandRes?.data;
  const engagedUsers = engagedUsersRes?.data ?? [];

  const handleUpdate = async (data: UpdateBrandDetailsReq) => {
    try {
      await updateBrand({ brandId: brandId!, data });
      setSnackbar({ open: true, message: "Brand updated successfully", severity: "success" });
      setIsEditing(false);
    } catch {
      setSnackbar({ open: true, message: "Failed to update brand", severity: "error" });
    }
  };

  const handleLogoUpload = async (file: File) => {
    try {
      await uploadLogo({ brandId: brandId!, file });
      setSnackbar({ open: true, message: "Logo updated successfully", severity: "success" });
    } catch {
      setSnackbar({ open: true, message: "Failed to upload logo", severity: "error" });
    }
  };

  const handleCoverUpload = async (file: File) => {
    try {
      await uploadCover({ brandId: brandId!, file });
      setSnackbar({ open: true, message: "Cover updated successfully", severity: "success" });
    } catch {
      setSnackbar({ open: true, message: "Failed to upload cover", severity: "error" });
    }
  };

  const handleLogoDelete = async () => {
    try {
      await deleteLogo(brandId!);
      setSnackbar({ open: true, message: "Logo removed successfully", severity: "success" });
    } catch {
      setSnackbar({ open: true, message: "Failed to remove logo", severity: "error" });
    }
  };

  const handleCoverDelete = async () => {
    try {
      await deleteCover(brandId!);
      setSnackbar({ open: true, message: "Cover removed successfully", severity: "success" });
    } catch {
      setSnackbar({ open: true, message: "Failed to remove cover", severity: "error" });
    }
  };

  const BCrumb = [
    { title: "Home", to: "/home" },
    { title: "My Profile" },
  ];

  if (myBrandLoading || brandLoading) {
    return (
      <PageContainer title="My Profile">
        <Breadcrumb title="My Profile" items={BCrumb} />
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
          <CircularProgress size={50} />
        </Box>
      </PageContainer>
    );
  }

  if (isError || !brand) {
    return (
      <PageContainer title="My Profile">
        <Breadcrumb title="My Profile" items={BCrumb} />
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
          <Typography variant="h6" color="textSecondary">Brand not found</Typography>
        </Box>
      </PageContainer>
    );
  }

  return (
    <PageContainer title={`${brand.displayName} - My Profile`}>
      <Breadcrumb title={brand.displayName} items={BCrumb}>
        {!isEditing && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<Icon icon="solar:pen-2-line-duotone" width={18} />}
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </Button>
        )}
      </Breadcrumb>

      {isEditing ? (
        <BrandDetailsForm
          brand={brand}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)}
          isSubmitting={isUpdating}
          onLogoUpload={handleLogoUpload}
          onCoverUpload={handleCoverUpload}
          onLogoDelete={handleLogoDelete}
          onCoverDelete={handleCoverDelete}
          isLogoUploading={isLogoUploading}
          isCoverUploading={isCoverUploading}
        />
      ) : (
        <Grid container spacing={3}>
          <Grid size={12}>
            <BrandInfoCard brand={brand} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <BrandOwnerCard owner={brand.owner} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <StatsCard icon="solar:users-group-rounded-line-duotone" label="Followers" value={brand.followersCount.toLocaleString()} color="primary" />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <StatsCard icon="solar:box-minimalistic-line-duotone" label="Products" value={brand.productsCount} color="success" />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <StatsCard icon="solar:videocamera-record-line-duotone" label="Reels" value={brand.reelsCount} color="secondary" />
          </Grid>

          {brand.returnPolicyAsHtml && (
            <Grid size={12}>
              <BlankCard>
                <Box p={3}>
                  <Typography variant="h5" fontWeight={600} mb={2}>Brand Policies</Typography>
                  <Box dangerouslySetInnerHTML={{ __html: brand.returnPolicyAsHtml }} />
                </Box>
              </BlankCard>
            </Grid>
          )}

          {brand.socialLinks.length > 0 && (
            <Grid size={12}>
              <BlankCard>
                <Box p={3}>
                  <Typography variant="h5" fontWeight={600} mb={2}>Social Links</Typography>
                  <Stack direction="row" spacing={2} flexWrap="wrap">
                    {brand.socialLinks.map((link: any) => (
                      <Button
                        key={link.id}
                        variant="outlined"
                        size="small"
                        startIcon={<Icon icon="solar:link-circle-line-duotone" width={18} />}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.platform}
                      </Button>
                    ))}
                  </Stack>
                </Box>
              </BlankCard>
            </Grid>
          )}

          <Grid size={12}>
            <TopEngagedUsersTable users={engagedUsers} isLoading={isEngagedLoading} />
          </Grid>
        </Grid>
      )}

      <Snackbar open={snackbar.open} autoHideDuration={4000} anchorOrigin={snackbarAnchor} onClose={() => setSnackbar((s) => ({ ...s, open: false }))}>
        <Alert severity={snackbar.severity} onClose={() => setSnackbar((s) => ({ ...s, open: false }))}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
};

export default Profile;
