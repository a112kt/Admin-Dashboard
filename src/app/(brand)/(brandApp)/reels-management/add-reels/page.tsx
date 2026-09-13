"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/components/ui/container/PageContainer";
import { Typography, Box, Avatar, Stack, Chip, Grid, Snackbar, Alert, Switch, FormControlLabel } from "@mui/material";
import TableRowSelection, { IndeterminateCheckbox } from "@/components/ui/tables/TableRowSelection";
import { createColumnHelper } from "@tanstack/react-table";
import { ProductType, GetBrandProductsRes } from "@/features/brand/productsManagement/types";
import { useGetProducts } from "@/features/brand/productsManagement/hooks/productsHooks";
import BlankCard from "@/components/shared/BlankCard";
import CustomTextField from "@/components/ui/shared/CustomTextField";
import CustomFormLabel from "@/components/ui/forms/theme-elements/CustomFormLabel";
import Media from "@/features/brand/reelsManagement/components/Media";
import { Button } from "@mui/material";
import { useAddReel } from "@/features/brand/reelsManagement/hooks/reelsHooks";
import { useTranslation } from 'react-i18next';
import { useSnackbarAnchor } from "@/hooks/useSnackbarAnchor";

const AddReel = () => {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const { data: products, isPending } = useGetProducts({ pageIndex: page, pageSize });
  const { t } = useTranslation();
  const BCrumb = [
    {
      title: t('Reels Management'),
      to: "/reels-management/reels",
    },
    {
      title: t('Add Reels'),
    },
  ];
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [title, setTitle] = useState<string>("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [titleError, setTitleError] = useState<string | null>(null);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    severity: "success" | "error";
    message: string;
  }>({ open: false, severity: "success", message: "" });
  const { mutateAsync: addReel, isPending: isSubmitting } = useAddReel();
  const snackbarAnchor = useSnackbarAnchor("top");

  const handleSubmit = async () => {
    let valid = true;
    if (!title.trim()) {
      setTitleError(t("Please enter a reel title."));
      valid = false;
    } else {
      setTitleError(null);
    }
    if (!videoFile) {
      setVideoError(t("Please select a video to upload."));
      valid = false;
    } else {
      setVideoError(null);
    }
    if (!valid) return;
    const data = {
      title,
      video: videoFile,
      products: selectedProducts,
      status,
    };
    try {
      await addReel(data);
      setSnackbar({ open: true, severity: "success", message: t("Reel uploaded successfully!") });
      setTitle("");
      setVideoFile(null);
      setSelectedProducts([]);
    } catch {
      setSnackbar({ open: true, severity: "error", message: t("Failed to upload reel. Please try again.") });
    }
  };
  return (
    <PageContainer title={t('Add Reels')}>
      <Breadcrumb title={t('Add Reels')} items={BCrumb} />

      <Box>
        <BlankCard sx={{ mb: 4, padding: 4 }}>
          <Media videoFile={videoFile} setVideoFile={setVideoFile} />
          {videoError && (
            <Typography variant="caption" sx={{ color: "error.main", ml: 2 }}>
              {videoError}
            </Typography>
          )}
          <Grid display="flex" alignItems="center" size={12}>
            <CustomFormLabel htmlFor="b_name" sx={{ mt: 0 }}>
              {t('Reel Title')}
            </CustomFormLabel>
          </Grid>
          <Grid size={12}>
            <CustomTextField
              id="b_name"
              placeholder={t('Reel Title')}
              fullWidth
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setTitle(e.target.value);
                if (titleError) setTitleError(null);
              }}
            />
            {titleError && (
              <Typography variant="caption" sx={{ color: "error.main", mt: 0.5, display: "block" }}>
                {titleError}
              </Typography>
            )}
            <Typography variant="body2" mt={1}>
              {t('A reel title is required and recommended to be under 100 characters.')}
            </Typography>
          </Grid>
          <Grid display="flex" alignItems="center" size={12} mt={2}>
            <FormControlLabel
              control={
                <Switch
                  checked={status === "published"}
                  onChange={(e) => setStatus(e.target.checked ? "published" : "draft")}
                  color="primary"
                />
              }
              label={status === "published" ? t("Published") : t("Draft")}
            />
          </Grid>
        </BlankCard>
        <TableRowSelection
          data={products?.data?.data ?? []}
          columns={getColumns(t)}
          isPending={isPending}
          onSelectionChange={setSelectedProducts}
          initialSelectedIds={[]}
          page={page}
          pageCount={products?.data?.meta?.totalPages ?? 0}
          onPageChange={(newPage) => setPage(newPage)}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleSubmit}
            disabled={isSubmitting}
            sx={{ px: 5, py: 1.5, fontSize: "1rem" }}
          >
            {isSubmitting ? t("Uploading...") : t("Submit")}
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        anchorOrigin={snackbarAnchor}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
};

export default AddReel;

const columnHelper = createColumnHelper<GetBrandProductsRes>();

function getColumns(t: (key: string) => string): any[] {
  return [
    columnHelper.accessor("id", {
      header: ({ table }) => (
        <IndeterminateCheckbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        />
      ),
      cell: ({ row }) => (
        <div className="px-1">
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        </div>
      ),
    }),

    columnHelper.accessor("image", {
      header: () => t("Product"),
      cell: (info) => (
        <Stack direction="row" spacing={2}>
          <Avatar
            src={info.getValue()}
            alt={info.row.original.name}
            sx={{ width: 40, height: 40 }}
          />
          <Box />
        </Stack>
      ),
    }),
    columnHelper.accessor("name", {
      header: () => t("Product Name"),
      cell: (info) => (
        <Typography color="textSecondary" variant="h6" fontWeight={400}>
          {info.row.original.name}
        </Typography>
      ),
    }),
    columnHelper.accessor("price", {
      header: () => t("Price"),
      cell: (info) => (
        <Stack direction="row">
          <Typography variant="h6" fontWeight={400}>
            {info.row.original.price}
          </Typography>
        </Stack>
      ),
    }),
    columnHelper.accessor("status", {
      header: () => t("Stock Status"),
      cell: (info) => (
        <Chip
          sx={{
            bgcolor:
              info.getValue() === 1
                ? (theme) => theme.palette.success.main
                : (theme) => theme.palette.error.main,
            color: "white",
            borderRadius: "8px",
          }}
          size="small"
          label={info.getValue() === 1 ? t("In Stock") : t("Out of Stock")}
        />
      ),
    }),
    columnHelper.accessor("quantity", {
      header: () => t("Quantity"),
      cell: (info) => (
        <Typography variant="h6">{info.row.original.quantity}</Typography>
      ),
    }),
  ];
}
