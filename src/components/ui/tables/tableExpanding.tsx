"use client";

import * as React from "react";
import {
    TableContainer,
    Table,
    TableRow,
    TableCell,
    TableBody,
    Avatar,
    Typography,
    TableHead,
    Chip,
    Box,
    Grid,
    Stack,
    Paper,
    Divider,
} from "@mui/material";

import {
    ordersTableData,
    OrdersTableType,
} from "@/components/ui/tables/tableTypeAndData/tableExpanding";

import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getExpandedRowModel,
    useReactTable,
} from "@tanstack/react-table";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const columnHelper = createColumnHelper<OrdersTableType>();

const getStatusColors = (status: string) => {
    switch (status) {
        case "Delivered":
            return {
                bg: "success.light",
                color: "success.main",
            };

        case "Processing":
            return {
                bg: "warning.light",
                color: "warning.main",
            };

        case "Shipped":
            return {
                bg: "info.light",
                color: "info.main",
            };

        case "Cancelled":
            return {
                bg: "error.light",
                color: "error.main",
            };

        case "PendingCancellation":
            return {
                bg: "error.light",
                color: "error.main",
            };

        default:
            return {
                bg: "secondary.light",
                color: "secondary.main",
            };
    }
};

const columns = [
    columnHelper.display({
        id: "expand",
        header: () => null,

        cell: ({ row }) => (
            <Box
                sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}
                onClick={() => row.toggleExpanded()}
            >
                {row.getIsExpanded() ? (
                    <KeyboardArrowDownIcon />
                ) : (
                    <KeyboardArrowRightIcon />
                )}
            </Box>
        ),
    }),

    columnHelper.accessor("customer", {
        header: () => "Customer",

        cell: ({ row }) => (
            <Stack direction="row" spacing={2} alignItems="center">
                <Avatar
                    src={row.original.customer.avatar}
                    sx={{ width: 42, height: 42 }}
                />

                <Box>
                    <Typography variant="subtitle1" fontWeight={600}>
                        {row.original.customer.name}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        {row.original.customer.email}
                    </Typography>
                </Box>
            </Stack>
        ),
    }),

    columnHelper.accessor("orderNumber", {
        header: () => "Order ID",

        cell: (info) => (
            <Typography variant="subtitle2" fontWeight={600}>
                {info.getValue()}
            </Typography>
        ),
    }),

    columnHelper.accessor("orderDate", {
        header: () => "Date",

        cell: (info) => (
            <Typography variant="body2">{info.getValue()}</Typography>
        ),
    }),

    columnHelper.accessor("paymentMethod", {
        header: () => "Payment",

        cell: (info) => (
            <Typography variant="body2">{info.getValue()}</Typography>
        ),
    }),

    columnHelper.accessor("status", {
        header: () => "Status",

        cell: (info) => {
            const colors = getStatusColors(info.getValue());

            return (
                <Chip
                    label={info.getValue()}
                    size="small"
                    sx={{
                        bgcolor: colors.bg,
                        color: colors.color,
                        borderRadius: "8px",
                        fontWeight: 600,
                    }}
                />
            );
        },
    }),

    columnHelper.accessor("total", {
        header: () => "Total",

        cell: (info) => (
            <Typography variant="subtitle1" fontWeight={700}>
                EGP {info.getValue()}
            </Typography>
        ),
    }),
];

const TableExpanding = () => {
    const [data] = React.useState(() => [...ordersTableData]);

    const table = useReactTable({
        data,
        columns,

        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
    });

    return (
        <Grid container spacing={3}>
            <Grid size={12}>
                <Paper elevation={0} sx={{ borderRadius: 1, overflow: "hidden" }}>
                    <TableContainer>
                        <Table sx={{ whiteSpace: "nowrap" }}>
                            <TableHead>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <TableCell key={header.id}>
                                                <Typography variant="subtitle2" fontWeight={700}>
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                </Typography>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableHead>

                            <TableBody>
                                {table.getRowModel().rows.map((row) => (
                                    <React.Fragment key={row.id}>
                                        <TableRow hover>
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </TableCell>
                                            ))}
                                        </TableRow>

                                        {row.getIsExpanded() && (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={columns.length}
                                                    sx={{
                                                        backgroundColor: "grey.50",
                                                        py: 4,
                                                    }}
                                                >
                                                    <Box>
                                                        <Typography
                                                            variant="h6"
                                                            fontWeight={700}
                                                            mb={3}
                                                        >
                                                            Order Details
                                                        </Typography>

                                                        <Grid container spacing={3}>
                                                            {/* Customer Info */}
                                                            <Grid size={{ xs: 12, md: 4 }}>
                                                                <Paper
                                                                    variant="outlined"
                                                                    sx={{
                                                                        p: 3,
                                                                        borderRadius: 3,
                                                                        height: "100%",
                                                                    }}
                                                                >
                                                                    <Typography
                                                                        variant="subtitle1"
                                                                        fontWeight={700}
                                                                        mb={2}
                                                                    >
                                                                        Customer Information
                                                                    </Typography>

                                                                    <Stack spacing={1.5}>
                                                                        <Typography variant="body2">
                                                                            <strong>Name:</strong>{" "}
                                                                            {row.original.customer.name}
                                                                        </Typography>

                                                                        <Typography variant="body2">
                                                                            <strong>Email:</strong>{" "}
                                                                            {row.original.customer.email}
                                                                        </Typography>

                                                                        <Typography variant="body2">
                                                                            <strong>Phone:</strong>{" "}
                                                                            {row.original.customer.phone}
                                                                        </Typography>

                                                                        <Typography variant="body2">
                                                                            <strong>Address:</strong>{" "}
                                                                            {row.original.shippingAddress}
                                                                        </Typography>
                                                                    </Stack>
                                                                </Paper>
                                                            </Grid>

                                                            {/* Order Items */}
                                                            <Grid size={{ xs: 12, md: 8 }}>
                                                                <Paper
                                                                    variant="outlined"
                                                                    sx={{
                                                                        p: 3,
                                                                        borderRadius: 3,
                                                                    }}
                                                                >
                                                                    <Typography
                                                                        variant="subtitle1"
                                                                        fontWeight={700}
                                                                        mb={2}
                                                                    >
                                                                        Ordered Products
                                                                    </Typography>

                                                                    <Stack spacing={2}>
                                                                        {row.original.items.map((item) => (
                                                                            <Box key={item.id}>
                                                                                <Stack
                                                                                    direction="row"
                                                                                    spacing={2}
                                                                                    alignItems="center"
                                                                                    justifyContent="space-between"
                                                                                >
                                                                                    <Stack
                                                                                        direction="row"
                                                                                        spacing={2}
                                                                                        alignItems="center"
                                                                                    >
                                                                                        <Avatar
                                                                                            variant="rounded"
                                                                                            src={item.image}
                                                                                            sx={{
                                                                                                width: 70,
                                                                                                height: 70,
                                                                                                borderRadius: 3,
                                                                                            }}
                                                                                        />

                                                                                        <Box>
                                                                                            <Typography
                                                                                                variant="subtitle2"
                                                                                                fontWeight={700}
                                                                                            >
                                                                                                {item.productName}
                                                                                            </Typography>

                                                                                            <Typography
                                                                                                variant="body2"
                                                                                                color="text.secondary"
                                                                                            >
                                                                                                Size: {item.size} | Color:{" "}
                                                                                                {item.color}
                                                                                            </Typography>

                                                                                            <Typography
                                                                                                variant="body2"
                                                                                                color="text.secondary"
                                                                                            >
                                                                                                Quantity: {item.quantity}
                                                                                            </Typography>
                                                                                        </Box>
                                                                                    </Stack>

                                                                                    <Typography
                                                                                        variant="subtitle1"
                                                                                        fontWeight={700}
                                                                                    >
                                                                                        EGP {item.price}
                                                                                    </Typography>
                                                                                </Stack>

                                                                                <Divider sx={{ mt: 2 }} />
                                                                            </Box>
                                                                        ))}
                                                                    </Stack>

                                                                    <Stack
                                                                        direction="row"
                                                                        justifyContent="flex-end"
                                                                        mt={3}
                                                                    >
                                                                        <Typography
                                                                            variant="h6"
                                                                            fontWeight={700}
                                                                        >
                                                                            Total: EGP {row.original.total}
                                                                        </Typography>
                                                                    </Stack>
                                                                </Paper>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </React.Fragment>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default TableExpanding;