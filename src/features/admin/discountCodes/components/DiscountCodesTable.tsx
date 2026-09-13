"use client";
import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconRefresh,
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useDiscountCodes } from "../hooks/useDiscountCodes";
import DiscountCodeFormDialog from "./DiscountCodeFormDialog";
import { DiscountCodeFormData } from "../types";
import { useSnackbarAnchor } from "@/hooks/useSnackbarAnchor";

export default function DiscountCodesTable() {
  const { t } = useTranslation();
  const {
    codes,
    loading,
    refetch,
    createCode,
    updateCode,
    deleteCode,
  } = useDiscountCodes();
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

  const handleSave = async (data: DiscountCodeFormData) => {
    try {
      if (editData) {
        await updateCode.mutateAsync({ id: editData.id, data });
        setSnackbar({
          open: true,
          message: t("Discount code updated successfully"),
          severity: "success",
        });
      } else {
        await createCode.mutateAsync(data);
        setSnackbar({
          open: true,
          message: t("Discount code created successfully"),
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
      await deleteCode.mutateAsync(deleteId);
      setSnackbar({
        open: true,
        message: t("Discount code deleted successfully"),
        severity: "success",
      });
    } catch (err: any) {
      const msg =
        err?.response?.data?.message?.en ||
        err?.response?.data?.message ||
        t("Failed to delete discount code");
      setSnackbar({ open: true, message: msg, severity: "error" });
    }
    setDeleteOpen(false);
    setDeleteId(null);
  };

  const columns: GridColDef[] = [
    { field: "code", headerName: t("Code"), flex: 1, minWidth: 120 },
    {
      field: "discountValue",
      headerName: t("Discount %"),
      width: 120,
      valueFormatter: (value: number) => `${value}%`,
    },
    {
      field: "expirationDate",
      headerName: t("Expiration Date"),
      width: 180,
      valueFormatter: (value: string) =>
        value ? new Date(value).toLocaleDateString() : "",
    },
    {
      field: "usageCount",
      headerName: t("Usage Count"),
      width: 120,
    },
    {
      field: "status",
      headerName: t("Status"),
      width: 120,
      renderCell: (params: GridRenderCellParams) => {
        const expired =
          params.row.expirationDate &&
          new Date(params.row.expirationDate) < new Date();
        return (
          <Chip
            size="small"
            color={expired ? "error" : "success"}
            label={expired ? t("Expired") : t("Active")}
          />
        );
      },
    },
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
            {t("Discount Codes")}
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
              {t("Add Discount Code")}
            </Button>
          </Box>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress />
          </Box>
        ) : (
          <DataGrid
            rows={codes}
            columns={columns}
            getRowId={(row) => row.id}
            loading={loading}
            disableRowSelectionOnClick
            autoHeight
            sx={{
              border: "none",
              "& .MuiDataGrid-cell:focus": { outline: "none" },
            }}
            localeText={{ noRowsLabel: t("No discount codes found") }}
          />
        )}
      </CardContent>

      <DiscountCodeFormDialog
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditData(null);
        }}
        onSave={handleSave}
        initialData={editData}
        loading={createCode.isPending || updateCode.isPending}
      />

      <Dialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{t("Delete Discount Code")}</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            {t(
              "Are you sure you want to delete this discount code? This action cannot be undone."
            )}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)}>{t("Cancel")}</Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            disabled={deleteCode.isPending}
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
