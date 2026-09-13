"use client";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { IconRefresh, IconEye } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useAdminBrandsFinance } from "../hooks/useAdminFinance";

export default function BrandsFinanceTable() {
  const { t } = useTranslation();
  const router = useRouter();
  const { brands, loading, refetch } = useAdminBrandsFinance();

  const columns: GridColDef[] = [
    { field: "brandId", headerName: t("ID"), width: 70 },
    { field: "brandName", headerName: t("Brand Name"), flex: 1, minWidth: 160 },
    {
      field: "pendingBalance",
      headerName: t("Pending"),
      width: 130,
      renderCell: (params: GridRenderCellParams) => {
        const val = Number(params.value) || 0;
        return <Typography color="warning.main" fontWeight={500}>{val.toFixed(2)} EGP</Typography>;
      },
    },
    {
      field: "availableBalance",
      headerName: t("Available"),
      width: 130,
      renderCell: (params: GridRenderCellParams) => {
        const val = Number(params.value) || 0;
        return <Typography color="success.main" fontWeight={500}>{val.toFixed(2)} EGP</Typography>;
      },
    },
    {
      field: "requestedBalance",
      headerName: t("Requested"),
      width: 130,
      renderCell: (params: GridRenderCellParams) => {
        const val = Number(params.value) || 0;
        return <Typography color="info.main" fontWeight={500}>{val.toFixed(2)} EGP</Typography>;
      },
    },
    {
      field: "paidBalance",
      headerName: t("Paid"),
      width: 130,
      renderCell: (params: GridRenderCellParams) => {
        const val = Number(params.value) || 0;
        return <Typography fontWeight={500}>{val.toFixed(2)} EGP</Typography>;
      },
    },
    { field: "totalSettlements", headerName: t("Settlements"), width: 110 },
    { field: "pendingWithdrawals", headerName: t("Pending Withdrawals"), width: 140 },
    {
      field: "actions",
      headerName: "",
      width: 60,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Button
          size="small"
          onClick={() => router.push(`/admin/finance/brands/${params.row.brandId}`)}
        >
          <IconEye size={18} />
        </Button>
      ),
    },
  ];

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6" fontWeight={600}>{t("Brands Finance")}</Typography>
          <Button variant="outlined" startIcon={<IconRefresh size={18} />} onClick={() => refetch()}>
            {t("Refresh")}
          </Button>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" py={4}><CircularProgress /></Box>
        ) : (
          <DataGrid
            rows={brands}
            columns={columns}
            getRowId={(row) => row.brandId}
            loading={loading}
            disableRowSelectionOnClick
            autoHeight
            sx={{ border: "none", "& .MuiDataGrid-cell:focus": { outline: "none" } }}
            localeText={{ noRowsLabel: t("No brands found") }}
          />
        )}
      </CardContent>
    </Card>
  );
}
