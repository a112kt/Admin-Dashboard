"use client";
import * as React from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useShippingSettlements } from "../hooks/useShippingFinance";
import { ShippingSettlementStatus, SettlementFilterDto, ShippingSettlementDto } from "../types";

const statusColor = (status: string) => {
  switch (status) {
    case "Pending": return "warning";
    case "ReadyToPay": return "info";
    case "Paid": return "success";
    default: return "default";
  }
};

const SettlementsTable = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = React.useState<SettlementFilterDto>({});
  const { settlements, loading } = useShippingSettlements(filter);

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6" fontWeight={600}>{t("Settlements")}</Typography>
          <Chip label={`${settlements.length} ${t("records")}`} color="primary" size="small" />
        </Box>

        <Stack direction="row" spacing={2} mb={3}>
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>{t("Status")}</InputLabel>
            <Select
              label={t("Status")}
              value={filter.status ?? ""}
              onChange={(e) => setFilter({ ...filter, status: (e.target.value || undefined) as ShippingSettlementStatus | undefined })}
            >
              <MenuItem value="">{t("All")}</MenuItem>
              <MenuItem value="Pending">{t("Pending")}</MenuItem>
              <MenuItem value="ReadyToPay">{t("Ready to Pay")}</MenuItem>
              <MenuItem value="Paid">{t("Paid")}</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        {loading ? (
          <Box display="flex" justifyContent="center" py={4}><CircularProgress /></Box>
        ) : settlements.length === 0 ? (
          <Typography variant="body1" color="text.secondary" textAlign="center" py={4}>
            {t("No settlements found")}
          </Typography>
        ) : (
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: "grey.50" }}>
                  <TableCell sx={{ fontWeight: 600 }}>{t("ID")}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{t("Order Ref")}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{t("Amount")}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{t("Status")}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{t("Paid At")}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{t("Reference")}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{t("Created")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {settlements.map((s: ShippingSettlementDto) => (
                  <TableRow key={s.id} hover>
                    <TableCell>#{s.id}</TableCell>
                    <TableCell>#{s.orderReference}</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{s.amount.toFixed(2)} EGP</TableCell>
                    <TableCell>
                      <Chip label={t(s.statusString || s.status)} size="small" color={statusColor(s.statusString || s.status) as any} />
                    </TableCell>
                    <TableCell>{s.paidAt ? new Date(s.paidAt).toLocaleDateString() : "-"}</TableCell>
                    <TableCell>{s.paymentReference || "-"}</TableCell>
                    <TableCell>{new Date(s.createdAt).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default SettlementsTable;
