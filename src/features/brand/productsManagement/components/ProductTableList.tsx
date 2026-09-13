"use client";
import * as React from "react";
import { alpha, useTheme } from "@mui/material/styles";
import { format } from "date-fns";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  IconButton,
  Tooltip,
  FormControlLabel,
  Typography,
  TextField,
  InputAdornment,
  Paper,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Drawer,
  FormControl,
  InputLabel,
  Divider,
  CircularProgress,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import CustomCheckbox from "@/components/ui/shared/CustomCheckbox";
import CustomSwitch from "@/components/ui/shared/CustomSwitch";
import { IconDiscount, IconFilter, IconPlus, IconTrash } from "@tabler/icons-react";
import { ProductType, GetBrandProductsRes } from "@/features/brand/productsManagement/types";
import type { GetProductsParams } from "../services";
import { ProductContext } from "@/context/EcommerceContext/index";
import { useContext } from "react";
import { useGetProducts } from "../hooks/productsHooks";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import CustomSelect from "@/components/ui/shared/CustomSelect";
import CustomTextField from "@/components/ui/shared/CustomTextField";




function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (a: any, b: any) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array?.map((el, index) => [el, index] as [T, number]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }

    return a[1] - b[1];
  });

  return stabilizedThis?.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "image",
    numeric: false,
    disablePadding: false,
    label: "Products",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "pname",
    numeric: false,
    disablePadding: false,
    label: "Create at",
  },
  {
    id: "stock",
    numeric: false,
    disablePadding: false,
    label: "Stock",
  },
  {
    id: "price",
    numeric: false,
    disablePadding: false,
    label: "Price",
  },
  {
    id: "quantity",
    numeric: false,
    disablePadding: false,
    label: "Quantity",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "Action",
  },
];

interface EnhancedTableProps {
  numSelected: number;

  onRequestSort: (event: React.MouseEvent<unknown>, property: any) => void;

  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: string) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <CustomCheckbox
            color="primary"
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            slotProps={{
              input: { "aria-label": "select all desserts" },
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              sx={{
                color: "blackColor.black60",
                fontWeight: "500",
                fontSize: "15px",
              }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
  handleBulkDelete: () => void;
  onOpenFilterDrawer: () => void;
  handleExportData: () => void;
  onCreateOffer?: () => void;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const {
    numSelected,
    handleSearch,
    search,
    handleBulkDelete,
    onOpenFilterDrawer,
    handleExportData,
    onCreateOffer,
  } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle2"
          component="div"
        >
          {numSelected} Products selected
        </Typography>
      ) : (
        <Box
          sx={{
            flex: "1 1 100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >

          <TextField
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon
                      icon="solar:magnifer-line-duotone"
                      width={16}
                      height={16}
                      color="textPrimary"
                    />
                  </InputAdornment>
                ),
              },
            }}
            placeholder="Search Product"
            size="small"
            onChange={handleSearch}
            value={search}
          />
          <Tooltip title="Export Data" onClick={handleExportData}>
            <IconButton>
              <Icon icon="solar:cloud-download-broken" />
            </IconButton>

          </Tooltip>
        </Box>
      )}

      {numSelected > 0 ? (
        <>
          <Tooltip title="Create Offer">
            <IconButton onClick={onCreateOffer}>
              <IconDiscount width="18" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={handleBulkDelete}>
              <IconTrash width="18" />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <Tooltip title="Filter List">
          <IconButton>
            <IconFilter size="1.2rem" onClick={onOpenFilterDrawer} />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

const ProductTableList = ({ onCreateOffer, selectionResetKey }: { onCreateOffer?: (selectedIds: readonly string[]) => void; selectionResetKey?: number }) => {
  const { deleteProduct, deleteAllProducts } =
    useContext(ProductContext);

  const [filterParams, setFilterParams] = React.useState<GetProductsParams>({});

  const { data, isLoading } = useGetProducts(filterParams);

  const apiRows = React.useMemo(() => {
    if (!data?.success || !data?.data?.data) return [];
    return data.data.data.map((item: GetBrandProductsRes): ProductType => ({
      id: item.id,
      name: item.name,
      image: item.image || "",
      createdAt: item.createdAt,
      status: String(item.status),
      price: String(item.price),
      quantity: String(item.quantity),
    }));
  }, [data]);

  const [rows, setRows] = React.useState<ProductType[]>([]);

  React.useEffect(() => {
    setRows(apiRows);
  }, [apiRows]);

  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<string>("calories");
  const [selected, setSelected] = React.useState<readonly string[]>([]);

  React.useEffect(() => {
    setSelected([]);
  }, [selectionResetKey]);

  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [search, setSearch] = React.useState("");

  //delete Prodcut Dialog
  const [openDeleteDialog, setOpenDeleteDialog] =
    React.useState<boolean>(false);

  //delete Prodcut
  const [productToDelete, setProductToDelete] = React.useState<
    number | null | string
  >(null);
  //delete all Prodcut
  const [isBulkDelete, setIsBulkDelete] = React.useState<boolean>(false);

  // filter
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);

  const [pendingFilters, setPendingFilters] = React.useState({
    status: "",
    stock: "",
    category: [] as string[],
    minPrice: "",
    maxPrice: "",
  });

  const [activeFilters, setActiveFilters] = React.useState({
    status: "",
    stock: "",
    category: [] as string[],
    minPrice: "",
    maxPrice: "",
  });

  const theme = useTheme();
  const borderColor = theme.palette.divider;

  const toggleFilterDrawer = (open: boolean) => () => {
    setIsFilterOpen(open);
  };

  // Debounce search to auto-refetch from API
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setFilterParams((prev) => ({ ...prev, search: search || undefined }));
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: React.SetStateAction<string>
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // This is for select all the row
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);

      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows?.length) : 0;

  //Handle opening delete confirmation dialog
  const handleDelete = (id: number | string) => {
    setIsBulkDelete(false);
    setProductToDelete(id);
    setOpenDeleteDialog(true);
  };

  const handleBulkDelete = () => {
    if (selected.length > 0) {
      setIsBulkDelete(true);
      setOpenDeleteDialog(true);
    }
  };

  //Handle confirming deletion of selected products
  const handleConfirmDelete = async () => {
    if (isBulkDelete) {
      deleteAllProducts(); //  this clears all products via context
      setSelected([]);
      setRows([]); // Clear table rows locally
    } else if (productToDelete !== null) {
      deleteProduct(productToDelete);
      const updatedRows = rows.filter((r) => r.id !== productToDelete);
      setRows(updatedRows);
      setProductToDelete(null);
    }

    setOpenDeleteDialog(false);
    setIsBulkDelete(false);
  };

  // Handle closing delete confirmation dialog
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setProductToDelete(null);
  };

  // Export data
  const handleExportCSV = () => {
    const headers = [
      "Title",
      "Category",
      "Created",
      "Stock",
      "Price",
      "Quantity",
      "Status",
    ];
    const csvRows = [];

    csvRows.push(headers.join(",")); // Add headers row

    rows.forEach((row) => {
      const rowData = [
        `"${row.name}"`,
        // `"${row?.category?.name}"`,
        `"${format(new Date(row?.createdAt), "yyyy-MM-dd")}"`,
        row.status === "1" ? "InStock" : "OutOfStock",
        row.price,
        row.quantity,
        row.status,
      ];

      csvRows.push(rowData.join(","));
    });

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", "products_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  console.log(rows);

  return (
    <Box>
      <Box>
        <EnhancedTableToolbar
          numSelected={selected.length}
          search={search}
          handleSearch={(event) => handleSearch(event)}
          handleBulkDelete={handleBulkDelete}
          onOpenFilterDrawer={toggleFilterDrawer(true)}
          handleExportData={handleExportCSV}
          onCreateOffer={() => {
            const ids = rows
              .filter((row) => selected.includes(row.name))
              .map((row) => String(row.id));
            onCreateOffer?.(ids);
          }}
        />
        <Paper
          variant="outlined"
          sx={{ mx: 2, mt: 1, border: `1px solid ${borderColor}` }}
        >
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
              <CircularProgress size={48} />
            </Box>
          ) : (
            <TableContainer>
              <Table
                aria-labelledby="tableTitle"
                size={dense ? "small" : "medium"}
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows?.length}
                />
                <TableBody>
                  {stableSort(rows, getComparator(order, orderBy))
                    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row?.name);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row?.name}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <CustomCheckbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                              onClick={(event) => {
                                event.stopPropagation();
                                handleClick(event, row.name);
                              }}
                            />
                          </TableCell>

                          <TableCell>
                            <Link href={`/products-management/products/${row.id}`}>
                              <Box
                                component="img"
                                src={row.image}
                                alt={row.name}
                                sx={{
                                  width: 60,
                                  height: 60,
                                  borderRadius: 2,
                                  objectFit: "cover",
                                  cursor: "pointer",
                                }}
                              />
                            </Link>
                          </TableCell>
                          <TableCell>
                            <Link
                              href={`/products-management/products/${row.id}`}
                              style={{ textDecoration: "none", color: "inherit" }}
                            >
                              <Typography
                                variant="body1"
                                fontWeight="600"
                                sx={{ cursor: "pointer", "&:hover": { color: "primary.main" } }}
                              >
                                {row?.name}
                              </Typography>
                            </Link>
                          </TableCell>

                          <TableCell>
                            <Typography fontWeight="400" variant="subtitle1">
                              {format(new Date(row.createdAt), " MMM d yyyy")}
                            </Typography>
                          </TableCell>

                          <TableCell>
                            <Box display="flex" alignItems="center">
                              <Box
                                sx={{
                                  backgroundColor: row.status === "1"
                                    ? (theme) => theme.palette.success.main
                                    : (theme) => theme.palette.error.main,
                                  borderRadius: "100%",
                                  height: "10px",
                                  width: "10px",
                                }}
                              />
                              <Typography
                                fontWeight="400"
                                variant="subtitle1"
                                sx={{
                                  ml: 1,
                                }}
                              >
                                {row?.status === "1" ? "InStock" : "Out of Stock"}
                              </Typography>
                            </Box>
                          </TableCell>

                          <TableCell>
                            <Typography fontWeight="400" variant="subtitle1">
                              EGP {row?.price}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography fontWeight="400" variant="subtitle1">
                              {row?.quantity}
                            </Typography>
                          </TableCell>

                          <TableCell>
                            <Tooltip title="Preview" placement="top">
                              <IconButton
                                color="primary"
                                size="small"
                                component={Link}
                                href={`/products-management/products/${row.id}`}
                              >
                                <Icon icon="solar:eye-line-duotone" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit" placement="top">
                              <IconButton
                                color="success"
                                size="small"
                                component={Link}
                                href={`/products-management/edit-product/${row.id}`}
                              >
                                <Icon icon="clarity:edit-line" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete" placement="top">
                              <IconButton
                                color="error"
                                size="small"
                                onClick={() => handleDelete(row.id)}
                              >
                                <Icon icon="tabler:trash" />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      );
                    })}

                  <Dialog
                    open={openDeleteDialog}
                    onClose={handleCloseDeleteDialog}
                  >
                    <DialogTitle>
                      {isBulkDelete
                        ? "Delete Selected Products"
                        : "Remove Product"}
                    </DialogTitle>
                    <DialogContent>
                      Are you sure you want to delete{" "}
                      {isBulkDelete ? "these products" : "this product"}? This
                      action cannot be undone.
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
                      <Button
                        onClick={handleConfirmDelete}
                        color="error"
                        variant="outlined"
                      >
                        Delete
                      </Button>
                    </DialogActions>
                  </Dialog>

                  {rows.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8}>
                        <Box
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                          justifyContent="center"
                        >
                          {/* <img
                          src="/images/svgs/no-data.svg"
                          alt="No data"
                          style={{
                            maxWidth: "80px",
                            maxHeight: "80px",
                          }}
                        /> */}
                          <Typography
                            variant="subtitle1"
                            mt={2}
                            color="blackColor.black60"
                          >
                            No products found
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  )}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 33 : 53) * emptyRows,
                      }}
                    >
                      <TableCell colSpan={8} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          <Drawer
            anchor="right"
            open={isFilterOpen}
            onClose={toggleFilterDrawer(false)}
          >
            <Box sx={{ width: 300, p: 2 }}>
              <Box display="flex" flexDirection="column" gap={2}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  gap={1}
                >
                  <Typography variant="h6" fontWeight={700}>
                    Filter Products
                  </Typography>
                  <IconButton
                    onClick={() => {
                      toggleFilterDrawer(false)();
                    }}
                    size="small"
                  >
                    <Icon icon="material-symbols:close-rounded" />
                  </IconButton>
                </Box>

                <Box>
                  <Typography
                    variant="body1"
                    fontWeight={600}
                    gutterBottom
                    color="blackColor.black60"
                  >
                    Stock Status
                  </Typography>
                  <FormControl fullWidth>
                    <InputLabel>Stock</InputLabel>
                    <CustomSelect
                      label=" Stock"
                      value={pendingFilters.stock}
                      onChange={(e: { target: { value: any } }) =>
                        setPendingFilters((prev) => ({
                          ...prev,
                          stock: e.target.value,
                        }))
                      }
                    >
                      <MenuItem value="InStock">In Stock</MenuItem>
                      <MenuItem value="Out of Stock">Out of Stock</MenuItem>
                    </CustomSelect>
                  </FormControl>
                </Box>

                <Box>
                  <Typography
                    variant="body1"
                    fontWeight={600}
                    gutterBottom
                    color="blackColor.black60"
                  >
                    Price Range
                  </Typography>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <CustomTextField
                      placeholder="Min: 0"
                      size="small"
                      value={pendingFilters.minPrice}
                      onChange={(e: { target: { value: any } }) =>
                        setPendingFilters((prev) => ({
                          ...prev,
                          minPrice: e.target.value,
                        }))
                      }
                      fullWidth
                    />
                    <CustomTextField
                      placeholder="Max: 5000"
                      size="small"
                      value={pendingFilters.maxPrice}
                      onChange={(e: { target: { value: any } }) =>
                        setPendingFilters((prev) => ({
                          ...prev,
                          maxPrice: e.target.value,
                        }))
                      }
                      fullWidth
                    />
                  </Box>
                </Box>
              </Box>
              <Divider sx={{ my: 3 }} />

              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setActiveFilters(pendingFilters);
                  const params: GetProductsParams = {};
                  if (pendingFilters.stock === "InStock") params.status = 1;
                  else if (pendingFilters.stock === "Out of Stock") params.status = 2;
                  if (pendingFilters.minPrice) params.minPrice = Number(pendingFilters.minPrice);
                  if (pendingFilters.maxPrice) params.maxPrice = Number(pendingFilters.maxPrice);
                  if (search) params.search = search;
                  setFilterParams(params);
                  toggleFilterDrawer(false)();
                }}
                fullWidth
              >
                Apply Filters
              </Button>

              <Button
                variant="text"
                color="error"
                onClick={() => {
                  const cleared = {
                    status: "",
                    stock: "",
                    category: [],
                    minPrice: "",
                    maxPrice: "",
                  };
                  setPendingFilters(cleared);
                  setActiveFilters(cleared);
                  setFilterParams({ search: search || undefined });
                  toggleFilterDrawer(false)();
                }}
                fullWidth
                sx={{ mt: 1 }}
              >
                Clear Filters
              </Button>
            </Box>
          </Drawer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <Box ml={2}>
          <FormControlLabel
            control={
              <CustomSwitch checked={dense} onChange={handleChangeDense} />
            }
            label="Dense padding"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ProductTableList;
