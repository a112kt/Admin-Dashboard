"use client";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { IconRefresh } from "@tabler/icons-react";
import { IconEye } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { useAdminShippingFinance } from "../hooks/useAdminFinance";

export default function ShippingFinanceTable() {
  const { t } = useTranslation();
  const router = useRouter();
  const { companies, loading, refetch } = useAdminShippingFinance();

  const columns: GridColDef[] = [
    { field: "shippingCompanyId", headerName: t("ID"), width: 70 },
    { field: "shippingCompanyName", headerName: t("Company Name"), flex: 1, minWidth: 160 },
    {
      field: "pendingBalance",
      headerName: t("Pending"),
      width: 130,
      renderCell: (params: GridRenderCellParams) => (
        <Typography color="warning.main" fontWeight={500}>{(Number(params.value) || 0).toFixed(2)} EGP</Typography>
      ),
    },
    {
      field: "readyToPayBalance",
      headerName: t("Ready to Pay"),
      width: 130,
      renderCell: (params: GridRenderCellParams) => (
        <Typography color="info.main" fontWeight={500}>{(Number(params.value) || 0).toFixed(2)} EGP</Typography>
      ),
    },
    {
      field: "paidBalance",
      headerName: t("Paid"),
      width: 130,
      renderCell: (params: GridRenderCellParams) => (
        <Typography fontWeight={500}>{(Number(params.value) || 0).toFixed(2)} EGP</Typography>
      ),
    },
    { field: "totalSettlements", headerName: t("Settlements"), width: 110 },
    {
      field: "actions",
      headerName: "",
      width: 60,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <IconButton
          size="small"
          color="primary"
          onClick={() => router.push(`/admin/finance/shipping/${params.row.shippingCompanyId}`)}
        >
          <IconEye size={18} />
        </IconButton>
      ),
    },
  ];

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6" fontWeight={600}>{t("Shipping Finance")}</Typography>
          <Button variant="outlined" startIcon={<IconRefresh size={18} />} onClick={() => refetch()}>
            {t("Refresh")}
          </Button>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" py={4}><CircularProgress /></Box>
        ) : (
          <DataGrid
            rows={companies}
            columns={columns}
            getRowId={(row) => row.shippingCompanyId}
            loading={loading}
            disableRowSelectionOnClick
            autoHeight
            sx={{ border: "none", "& .MuiDataGrid-cell:focus": { outline: "none" } }}
            localeText={{ noRowsLabel: t("No shipping companies found") }}
          />
        )}
      </CardContent>
    </Card>
  );
}
