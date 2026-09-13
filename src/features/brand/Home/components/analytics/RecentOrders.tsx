"use client";

import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  LinearProgress,
  useTheme,
  TableSortLabel,
  TablePagination,
  Chip,
} from "@mui/material";
import DashboardCard from "@/components/shared/DashboardCard";
import { useTranslation } from 'react-i18next';
import CustomCheckbox from "@/components/ui/forms/theme-elements/CustomCheckbox";
import Search from "@/components/layout/vertical/brandHeader/Search";
import { RecentOrder } from "@/features/brand/Home/types";





interface RecentOrderRow {
  id: string;
  customer: string;
  status: "Delivered" | "Pending" | "Cancelled" | "Processing" | "PendingCancellation";
  price: string;
  date: string;
}


type Order = "asc" | "desc";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (a: { [key in Key]: any }, b: { [key in Key]: any }) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const statusMap: Record<string, "Delivered" | "Pending" | "Cancelled" | "Processing" | "PendingCancellation"> = {
  "Delivered": "Delivered",
  "Pending": "Pending",
  "Cancelled": "Cancelled",
  "Processing": "Processing",
  "PendingCancellation": "PendingCancellation",
};

const RecentOrders = ({ recentOrders }: { recentOrders: RecentOrder[] }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const rows: RecentOrderRow[] = (recentOrders ?? []).map((order: RecentOrder) => {
    const s = statusMap[order.status] || "Pending";
    return {
      id: `#ORD-${order.orderId}`,
      customer: `Order #${order.orderId}`,
      status: s,
      price: `EGP ${order.totalAmount.toLocaleString()}`,
      date: new Date(order.createdAt).toISOString().split("T")[0],
    };
  });

  const [order, setOrder] = useState<Order>("desc");
  const [orderBy, setOrderBy] = useState<keyof RecentOrderRow>("date");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchText, setSearchText] = React.useState("");

  const handleSort = (property: keyof RecentOrderRow) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "success";
      case "Pending":
        return "warning";
      case "Processing":
        return "primary";
      case "Cancelled":
        return "error";
      case "PendingCancellation":
        return "warning";
      default:
        return "default";
    }
  };

  const filteredRows = rows.filter((row) =>
    [row.id, row.customer, row.status].some((value) =>
      value.toString().toLowerCase().includes(searchText.toLowerCase()),
    ),
  );
  const sortedRows = filteredRows.slice().sort(getComparator(order, orderBy));

  const paginatedRows = sortedRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <DashboardCard
      title={t('Recent Orders')}
      action={<Search value={searchText} onChange={handleSearchChange} />}
    >
      <TableContainer sx={{ width: "100%", overflowX: "auto" }}>
        <Table sx={{ tableLayout: "fixed", minWidth: 700 }} size="medium">
          <TableHead>
            <TableRow>
              <TableCell sortDirection={orderBy === "id" ? order : false}>
                <TableSortLabel
                  active={orderBy === "id"}
                  direction={orderBy === "id" ? order : "asc"}
                  onClick={() => handleSort("id")}
                >
                  {t('Order ID')}
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === "customer" ? order : false}>
                <TableSortLabel
                  active={orderBy === "customer"}
                  direction={orderBy === "customer" ? order : "asc"}
                  onClick={() => handleSort("customer")}
                >
                  {t('Order')}
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === "status" ? order : false}>
                <TableSortLabel
                  active={orderBy === "status"}
                  direction={orderBy === "status" ? order : "asc"}
                  onClick={() => handleSort("status")}
                >
                  {t('Status')}
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === "price" ? order : false}>
                <TableSortLabel
                  active={orderBy === "price"}
                  direction={orderBy === "price" ? order : "asc"}
                  onClick={() => handleSort("price")}
                >
                  {t('Price')}
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === "date" ? order : false}>
                <TableSortLabel
                  active={orderBy === "date"}
                  direction={orderBy === "date" ? order : "asc"}
                  onClick={() => handleSort("date")}
                >
                  {t('Date')}
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedRows.map((row) => {
              return (
                <TableRow key={row.id} hover sx={{ cursor: "pointer" }}>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight={600}
                      color="#1B2351"
                    >
                      {row.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" fontWeight={500}>
                      {row.customer}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={t(row.status)}
                      size="small"
                      color={getStatusColor(row.status) as any}
                      sx={{ fontWeight: 600, borderRadius: "8px" }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" fontWeight={700}>
                      {row.price}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="textSecondary">
                      {row.date}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        component="div"
        count={filteredRows.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </DashboardCard>
  );
};
export default RecentOrders;
