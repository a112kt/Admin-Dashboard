"use client";
import { useState, useCallback } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Typography,
  CircularProgress,
  TextField,
  MenuItem,
  Grid,
  Stack,
  IconButton,
  Collapse,
} from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { IconRefresh, IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useAuditLogs } from "../hooks/useAuditLogs";
import { AuditLogFilterDto, FinancialAuditLogDto } from "@/features/payouts/types";

const actionColors: Record<string, "default" | "success" | "warning" | "error" | "info" | "primary" | "secondary"> = {
  SettlementCreated: "info",
  SettlementStatusUpdated: "primary",
  WithdrawalRequested: "warning",
  PayoutTransferInitiated: "secondary",
  SettlementPaid: "success",
  ShippingSettlementPaid: "success",
  PayoutStatusPolling: "default",
};

const ACTION_TYPES = [
  "SettlementCreated",
  "SettlementStatusUpdated",
  "WithdrawalRequested",
  "PayoutTransferInitiated",
  "SettlementPaid",
  "ShippingSettlementPaid",
  "PayoutStatusPolling",
];

const ENTITY_TYPES = ["BrandSettlement", "ShippingSettlement", "WithdrawalRequest"];

function JsonDisplay({ label, json }: { label: string; json: string | null }) {
  if (!json) return null;
  let parsed: any;
  try {
    parsed = JSON.parse(json);
  } catch {
    return (
      <Box mb={1}>
        <Typography variant="caption" color="text.secondary">{label}</Typography>
        <Typography variant="body2" sx={{ fontFamily: "monospace", whiteSpace: "pre-wrap" }}>{json}</Typography>
      </Box>
    );
  }
  return (
    <Box mb={1}>
      <Typography variant="caption" color="text.secondary">{label}</Typography>
      <Box
        component="pre"
        sx={{
          fontFamily: "monospace",
          fontSize: "0.8rem",
          whiteSpace: "pre-wrap",
          bgcolor: "grey.100",
          p: 1.5,
          borderRadius: 1,
          overflow: "auto",
          maxHeight: 200,
        }}
      >
        {JSON.stringify(parsed, null, 2)}
      </Box>
    </Box>
  );
}

function AuditLogRowDetail({ row }: { row: FinancialAuditLogDto }) {
  return (
    <Stack spacing={1.5} sx={{ py: 2, px: 1 }}>
      <JsonDisplay label="Old Values" json={row.oldValues} />
      <JsonDisplay label="New Values" json={row.newValues} />
      {row.ipAddress && (
        <Box>
          <Typography variant="caption" color="text.secondary">IP Address</Typography>
          <Typography variant="body2" sx={{ fontFamily: "monospace" }}>{row.ipAddress}</Typography>
        </Box>
      )}
    </Stack>
  );
}

function DetailPanel({ row }: { row: FinancialAuditLogDto }) {
  const [open, setOpen] = useState(false);
  const hasDetails = row.oldValues || row.newValues || row.ipAddress;

  if (!hasDetails) return null;

  return (
    <Box>
      <IconButton size="small" onClick={() => setOpen(!open)}>
        {open ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
      </IconButton>
      <Collapse in={open}>
        <AuditLogRowDetail row={row} />
      </Collapse>
    </Box>
  );
}

export default function AuditTrailTable() {
  const { t } = useTranslation();

  const [filters, setFilters] = useState<AuditLogFilterDto>({
    pageIndex: 1,
    pageSize: 20,
  });

  const { result, loading, refetch } = useAuditLogs(filters);

  const handleFilterChange = useCallback((key: keyof AuditLogFilterDto, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value || undefined, pageIndex: 1 }));
  }, []);

  const columns: GridColDef[] = [
    {
      field: "createdAt",
      headerName: t("Timestamp"),
      width: 180,
      valueFormatter: (v: string) => (v ? new Date(v).toLocaleString() : ""),
    },
    {
      field: "action",
      headerName: t("Action"),
      width: 200,
      renderCell: (params: GridRenderCellParams) => (
        <Chip
          size="small"
          color={actionColors[params.value] || "default"}
          label={t(params.value)}
        />
      ),
    },
    {
      field: "entityType",
      headerName: t("Entity Type"),
      width: 160,
      renderCell: (params: GridRenderCellParams) => (
        <Chip size="small" variant="outlined" label={t(params.value)} />
      ),
    },
    {
      field: "entityId",
      headerName: t("Entity ID"),
      width: 90,
      valueFormatter: (v: number) => `#${v}`,
    },
    {
      field: "performedBy",
      headerName: t("Performed By"),
      width: 140,
      valueFormatter: (v: string) => v || "-",
    },
    {
      field: "notes",
      headerName: t("Notes"),
      flex: 1,
      minWidth: 150,
      valueFormatter: (v: string) => v || "-",
    },
    {
      field: "hasDetails",
      headerName: "",
      width: 40,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams) => {
        const hasDetails = params.row.oldValues || params.row.newValues || params.row.ipAddress;
        return hasDetails ? <IconChevronDown size={14} color="action" /> : null;
      },
    },
  ];

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6" fontWeight={600}>{t("Audit Trail")}</Typography>
          <Button variant="outlined" startIcon={<IconRefresh size={18} />} onClick={() => refetch()}>
            {t("Refresh")}
          </Button>
        </Box>

        <Grid container spacing={2} mb={3}>
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <TextField
              select
              label={t("Action")}
              size="small"
              fullWidth
              value={filters.actionType || ""}
              onChange={(e) => handleFilterChange("actionType", e.target.value)}
            >
              <MenuItem value="">{t("All")}</MenuItem>
              {ACTION_TYPES.map((a) => (
                <MenuItem key={a} value={a}>{t(a)}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <TextField
              select
              label={t("Entity Type")}
              size="small"
              fullWidth
              value={filters.entityType || ""}
              onChange={(e) => handleFilterChange("entityType", e.target.value)}
            >
              <MenuItem value="">{t("All")}</MenuItem>
              {ENTITY_TYPES.map((e) => (
                <MenuItem key={e} value={e}>{t(e)}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <TextField
              label={t("Performed By")}
              size="small"
              fullWidth
              value={filters.performedBy || ""}
              onChange={(e) => handleFilterChange("performedBy", e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <TextField
              label={t("Date From")}
              type="date"
              size="small"
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
              value={filters.dateFrom || ""}
              onChange={(e) => handleFilterChange("dateFrom", e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <TextField
              label={t("Date To")}
              type="date"
              size="small"
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
              value={filters.dateTo || ""}
              onChange={(e) => handleFilterChange("dateTo", e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <Button variant="outlined" fullWidth sx={{ height: 40 }} onClick={() => setFilters({ pageIndex: 1, pageSize: 20 })}>
              {t("Clear Filters")}
            </Button>
          </Grid>
        </Grid>

        {loading ? (
          <Box display="flex" justifyContent="center" py={4}><CircularProgress /></Box>
        ) : (
          <DataGrid
            rows={result?.items ?? []}
            columns={columns}
            getRowId={(row) => row.id}
            loading={loading}
            disableRowSelectionOnClick
            autoHeight
            paginationMode="server"
            pageSizeOptions={[10, 20, 50]}
            rowCount={result?.totalCount ?? 0}
            paginationModel={{ page: (filters.pageIndex ?? 1) - 1, pageSize: filters.pageSize ?? 20 }}
            onPaginationModelChange={(model) => {
              setFilters((prev) => ({
                ...prev,
                pageIndex: model.page + 1,
                pageSize: model.pageSize,
              }));
            }}
            sx={{ border: "none", "& .MuiDataGrid-cell:focus": { outline: "none" } }}
            localeText={{ noRowsLabel: t("No audit logs found") }}
            getDetailPanelContent={(params) => <DetailPanel row={params.row as FinancialAuditLogDto} />}
          />
        )}
      </CardContent>
    </Card>
  );
}
