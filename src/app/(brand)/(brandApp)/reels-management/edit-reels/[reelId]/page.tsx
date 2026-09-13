"use client";
import { useEffect, useRef, useState } from "react";
import Breadcrumb from "@/components/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/components/ui/container/PageContainer";
import { Typography, Box, CircularProgress, Avatar, Stack, Chip, Grid, Button, Snackbar, Alert, Switch, FormControlLabel } from "@mui/material";
import { useParams } from "next/navigation";
import { useGetReelById } from "@/features/brand/reelsManagement/hooks/reelsHooks";
import BlankCard from "@/components/shared/BlankCard";
import ReelComponent from "@/features/brand/reelsManagement/components/reelComponent";
import TableRowSelection, { IndeterminateCheckbox } from "@/components/ui/tables/TableRowSelection";
import { createColumnHelper } from "@tanstack/react-table";
import { GetBrandProductsRes } from "@/features/brand/productsManagement/types";
import { useGetProducts } from "@/features/brand/productsManagement/hooks/productsHooks";
import CustomTextField from "@/components/ui/shared/CustomTextField";
import CustomFormLabel from "@/components/ui/forms/theme-elements/CustomFormLabel";
import { IconEdit } from "@tabler/icons-react";
import { ProductsTableType } from "@/features/brand/reelsManagement/types";
import { useEditReel } from "@/features/brand/reelsManagement/hooks/reelsHooks";
import { useTranslation } from "react-i18next";
import { useSnackbarAnchor } from "@/hooks/useSnackbarAnchor";


const columnHelper = createColumnHelper<GetBrandProductsRes>();

const columns: any[] = [
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
    header: () => "Product",
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
    header: () => "Product Name",
    cell: (info) => (
      <Typography color="textSecondary" variant="h6" fontWeight={400}>
        {info.row.original.name}
      </Typography>
    ),
  }),
  columnHelper.accessor("price", {
    header: () => "Price",
    cell: (info) => (
      <Stack direction="row">
        <Typography variant="h6" fontWeight={400}>
          {info.row.original.price}
        </Typography>
      </Stack>
    ),
  }),
  columnHelper.accessor("status", {
    header: () => "Stock Status",
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
        label={info.getValue() === 1 ? "In Stock" : "Out of Stock"}
      />
    ),
  }),
  columnHelper.accessor("quantity", {
    header: () => "Quantity",
    cell: (info) => (
      <Typography variant="h6">{info.row.original.quantity}</Typography>
    ),
  }),
];

const EditReel = () => {
  const { t } = useTranslation();
  const params = useParams();
  const reelId = params.reelId;
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const { data: products, isPending: productsLoading } = useGetProducts({ pageIndex: page, pageSize });
  const { mutateAsync: editReel, isPending: editReelLoading } = useEditReel();
  const { data: reel, isLoading, isSuccess, isError } = useGetReelById(reelId as string);
  const [title, setTitle] = useState("");
  const [reelName, setReelName] = useState("Edit Reel");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [clearProducts, setClearProducts] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    severity: "success" | "error";
    message: string;
  }>({ open: false, severity: "success", message: "" });
  const tableRef = useRef<{ clearSelection: () => void }>(null);
  const snackbarAnchor = useSnackbarAnchor("top");

  useEffect(() => {
    if (isSuccess && reel?.data?.title) {
      setReelName(reel.data.title);
      setTitle(reel.data.title);
      setStatus(reel.data.status === "published" ? "published" : "draft");
      setSelectedProducts(reel.data.products?.map((p: ProductsTableType) => p.productId) ?? [])

    }
  }, [reel, isSuccess]);

  const BCrumb = [
    {
      title: t('Reels Management'),
      to: "/reels-management/reels",
    },
    {
      to: "/reels-management/reels",
      title: t('Reels'),
    },
    {
      title: reelName,
    },
  ];

  const handleClearProducts = () => {
    setClearProducts(true);
    tableRef.current?.clearSelection();
    setSelectedProducts([])
  };
  const handleSelectedProducts = (productIds: number[]) => {
    setSelectedProducts(prev => [...new Set([...prev, ...productIds])]);
  };
  useEffect(() => {
    if (selectedProducts.length === 0) {
      setClearProducts(true);
    } else {
      setClearProducts(false);
    }
  }, [selectedProducts])

  return (
    <PageContainer title={t('Edit Reel')}>
      <Breadcrumb title={t('Edit Reel')} items={BCrumb} />
      <Box>
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "50vh" }}>
            <CircularProgress size={50} />
          </Box>
        ) : isError ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "50vh" }}>
            <Typography variant="h6" sx={{ color: "gray" }}>Something went wrong</Typography>
          </Box>
        ) : (
          <>
            <BlankCard sx={{ width: "100%", padding: 4, mb: 4, paddingBottom: "60px" }}>
              {reelId &&
                <Box sx={{ width: "100%", height: "80vh" }}>

                  <ReelComponent reel={reel!.data} reelId={reelId as string} />
                </Box>
              }
              <Grid display="flex" alignItems="center" size={12} mt={2}>
                <CustomFormLabel htmlFor="b_name" sx={{ mt: 0 }}>
                  Reel Title
                </CustomFormLabel>
              </Grid>
              <Grid size={12}>
                <CustomTextField
                  id="b_name"
                  placeholder="Reel Title"
                  fullWidth
                  value={title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                />
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
                  label={status === "published" ? "Published" : "Draft"}
                />
              </Grid>
            </BlankCard>
            <TableRowSelection
              ref={tableRef}
              data={products?.data?.data ?? []}
              columns={columns}
              isPending={productsLoading}
              onSelectionChange={handleSelectedProducts}
              initialSelectedIds={reel?.data?.products?.map((p: ProductsTableType) => p.productId) ?? []}
              page={page}
              pageCount={products?.data?.meta?.totalPages ?? 0}
              onPageChange={(newPage) => setPage(newPage)}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
              <Button
                variant="outlined"
                color="secondary"
                size="large"
                onClick={handleClearProducts}
                sx={{ px: 5, py: 1.5, fontSize: "1rem" }}
                disabled={editReelLoading}
              >
                Clear All Products
              </Button>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                sx={{
                  px: 5,
                  py: 1.5,
                  fontSize: "1rem",
                  color: "white",
                  backdropFilter: "blur(10px)",
                }}
                onClick={async () => {
                  try {
                    await editReel({
                      ReelId: reelId as string,
                      Title: title !== reel?.data?.title ? title : '',
                      Status: status,
                      ProductIds: selectedProducts,
                      ClearProducts: clearProducts,
                    })
                    setSnackbar({ open: true, severity: "success", message: "Reel updated successfully!" });
                  } catch {
                    setSnackbar({ open: true, severity: "error", message: "Failed to update reel. Please try again." });
                  }
                }}
                disabled={editReelLoading}
                startIcon={editReelLoading ? <CircularProgress size={18} /> : <IconEdit size={18} />}
              >
                {editReelLoading ? "Saving..." : "Save Changes"}
              </Button>
            </Box>
          </>
        )}
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

export default EditReel;
