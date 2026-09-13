"use client";
import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
  Avatar,
} from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconRefresh,
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useCategories } from "../hooks/useCategories";
import CategoryFormDialog from "./CategoryFormDialog";
import { CategoryFormData } from "../types";
import { uploadCategoryImage } from "../services";
import { useSnackbarAnchor } from "@/hooks/useSnackbarAnchor";

export default function CategoriesTable() {
  const { t } = useTranslation();
  const {
    categories,
    loading,
    refetch,
    createCategory,
    updateCategory,
    deleteCategory,
  } = useCategories();
  const snackbarAnchor = useSnackbarAnchor("top");

  const [formOpen, setFormOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const handleSave = async (data: CategoryFormData) => {
    try {
      let imageUrl = data.imageUrl;
      let imagePublicId = data.imagePublicId ?? null;

      if (data.imageFile) {
        const uploadRes = await uploadCategoryImage(data.imageFile);
        const uploaded = (uploadRes as any)?.data ?? uploadRes;
        imageUrl = uploaded.url;
        imagePublicId = uploaded.publicId;
      }

      const payload: CategoryFormData = {
        ...data,
        imageUrl,
        imagePublicId,
        imageFile: null,
      };

      if (editData) {
        await updateCategory.mutateAsync({ id: editData.id, data: payload });
        setSnackbar({
          open: true,
          message: t("Category updated successfully"),
          severity: "success",
        });
      } else {
        await createCategory.mutateAsync(payload);
        setSnackbar({
          open: true,
          message: t("Category created successfully"),
          severity: "success",
        });
      }
      setFormOpen(false);
      setEditData(null);
    } catch (err: any) {
      const msg =
        err?.response?.data?.message?.en ||
        err?.response?.data?.message ||
        t("Operation failed");
      setSnackbar({ open: true, message: msg, severity: "error" });
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteCategory.mutateAsync(deleteId);
      setSnackbar({
        open: true,
        message: t("Category deleted successfully"),
        severity: "success",
      });
    } catch (err: any) {
      const msg =
        err?.response?.data?.message?.en ||
        err?.response?.data?.message ||
        t("Failed to delete category");
      setSnackbar({ open: true, message: msg, severity: "error" });
    }
    setDeleteOpen(false);
    setDeleteId(null);
  };

  const columns: GridColDef[] = [
    {
      field: "imageUrl",
      headerName: t("Image"),
      width: 80,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Avatar
          src={params.value}
          alt=""
          variant="rounded"
          sx={{ width: 48, height: 48 }}
        />
      ),
    },
    { field: "name", headerName: t("Name"), flex: 1, minWidth: 150 },
    { field: "arName", headerName: t("Arabic Name"), flex: 1, minWidth: 150 },
    {
      field: "actions",
      headerName: t("Actions"),
      width: 160,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Box display="flex" gap={1}>
          <Button
            size="small"
            variant="outlined"
            startIcon={<IconEdit size={16} />}
            onClick={() => {
              setEditData(params.row);
              setFormOpen(true);
            }}
          >
            {t("Edit")}
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="error"
            startIcon={<IconTrash size={16} />}
            onClick={() => {
              setDeleteId(params.row.id);
              setDeleteOpen(true);
            }}
          >
            {t("Delete")}
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h6" fontWeight={600}>
            {t("Categories")}
          </Typography>
          <Box display="flex" gap={1}>
            <Button
              variant="outlined"
              startIcon={<IconRefresh size={18} />}
              onClick={() => refetch()}
            >
              {t("Refresh")}
            </Button>
            <Button
              variant="contained"
              startIcon={<IconPlus size={18} />}
              onClick={() => {
                setEditData(null);
                setFormOpen(true);
              }}
            >
              {t("Add Category")}
            </Button>
          </Box>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress />
          </Box>
        ) : (
          <DataGrid
            rows={categories}
            columns={columns}
            getRowId={(row) => row.id}
            loading={loading}
            disableRowSelectionOnClick
            autoHeight
            sx={{
              border: "none",
              "& .MuiDataGrid-cell:focus": { outline: "none" },
            }}
            localeText={{ noRowsLabel: t("No categories found") }}
          />
        )}
      </CardContent>

      <CategoryFormDialog
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditData(null);
        }}
        onSave={handleSave}
        initialData={editData}
        loading={createCategory.isPending || updateCategory.isPending}
      />

      <Dialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{t("Delete Category")}</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            {t(
              "Are you sure you want to delete this category? This action cannot be undone."
            )}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)}>{t("Cancel")}</Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            disabled={deleteCategory.isPending}
          >
            {t("Delete")}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={snackbarAnchor}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Card>
  );
}
