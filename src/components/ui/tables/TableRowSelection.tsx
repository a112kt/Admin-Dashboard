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
  AvatarGroup,
  Grid,
  CheckboxProps,
  Pagination,
} from "@mui/material";
import DownloadCard from "@/components/ui/shared/DownloadCard";
import { Stack } from "@mui/system";
import { ColumnDef } from "@tanstack/react-table";
import CustomCheckbox from "../shared/CustomCheckbox";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";


interface IndeterminateCheckboxProps extends Omit<CheckboxProps, "ref"> {
  indeterminate?: boolean;
}

const IndeterminateCheckbox: React.FC<IndeterminateCheckboxProps> = ({
  indeterminate,
  className = "",
  ...rest
}) => {
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (ref.current && typeof indeterminate === "boolean") {
      (ref.current as any).indeterminate = !rest.checked && indeterminate;
    }
  }, [indeterminate, rest.checked]);

  return (
    <CustomCheckbox
      ref={ref}
      className={className + " cursor-pointer"}
      {...rest}
    />
  );
};

const computeRowSelection = (data: any[], selectedIds: Set<number>) => {
  const newRowSelection: Record<string, boolean> = {};
  data.forEach((item: any, index: number) => {
    if (selectedIds.has(item.id)) {
      newRowSelection[index] = true;
    }
  });
  return newRowSelection;
};

const TableRowSelection = React.forwardRef(({
  columns,
  data,
  isPending,
  onSelectionChange,
  initialSelectedIds,
  page,
  pageCount,
  onPageChange,
}: {
  columns: ColumnDef<any>[],
  data: any[],
  isPending?: boolean,
  onSelectionChange?: (selectedIds: number[]) => void,
  initialSelectedIds?: number[],
  page?: number,
  pageCount?: number,
  onPageChange?: (page: number) => void,
}, ref) => {
  const useIdSelection = initialSelectedIds !== undefined;
  const initialSelectedProductIds = React.useMemo(() => new Set<number>(initialSelectedIds || []), [initialSelectedIds]);

  const [selectedProductIds, setSelectedProductIds] = React.useState<Set<number>>(initialSelectedProductIds);
  const [rowSelection, setRowSelection] = React.useState<Record<string, boolean>>(
    () => computeRowSelection(data, initialSelectedProductIds)
  );

  React.useImperativeHandle(ref, () => ({
    clearSelection: () => {
      setRowSelection({});
      setSelectedProductIds(new Set());
      if (onSelectionChange) onSelectionChange([]);
    },
  }));

  React.useEffect(() => {
    setRowSelection(computeRowSelection(data, selectedProductIds));
    if (useIdSelection && onSelectionChange) {
      onSelectionChange(Array.from(selectedProductIds));
    }
  }, [data]);

  const prevInitialIdsRef = React.useRef<number[] | undefined>(undefined);

  React.useEffect(() => {
    const current = initialSelectedIds ?? [];
    const prev = prevInitialIdsRef.current ?? [];
    const changed = current.length !== prev.length || current.some((id, i) => id !== prev[i]);
    if (changed) {
      prevInitialIdsRef.current = current;
      const newSet = new Set<number>(current);
      setSelectedProductIds(newSet);
      setRowSelection(computeRowSelection(data, newSet));
      if (useIdSelection && onSelectionChange) {
        onSelectionChange(Array.from(newSet));
      }
    }
  }, [initialSelectedIds, data]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
    onRowSelectionChange: (updater) => {
      const newRowSelection = typeof updater === 'function' ? updater(rowSelection) : updater;
      setRowSelection(newRowSelection);

      if (useIdSelection) {
        const newSelectedIds = new Set<number>();
        Object.keys(newRowSelection).forEach((key) => {
          if (newRowSelection[Number(key)]) {
            const itemId = data[Number(key)]?.id;
            if (itemId !== undefined) {
              newSelectedIds.add(itemId);
            }
          }
        });
        setSelectedProductIds(newSelectedIds);
        if (onSelectionChange) onSelectionChange(Array.from(newSelectedIds));
      } else {
        const selectedRows = Object.keys(newRowSelection)
          .filter((key) => newRowSelection[Number(key)])
          .map(Number);
        if (onSelectionChange) onSelectionChange(selectedRows);
      }
    },
    state: {
      rowSelection,
    },
  });

  return (
    <DownloadCard title="Products" >
      <Grid container spacing={3}>
        <Grid size={12}>
          {isPending ? (
            <Box sx={{ p: 2 }}>
              <Typography>Loading...</Typography>
            </Box>
          ) : (
            <>
              <Box>
                <TableContainer>
                  <Table
                    sx={{
                      whiteSpace: "nowrap",
                    }}
                  >
                    <TableHead>
                      {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                          {headerGroup.headers.map((header) => (
                            <TableCell key={header.id}>
                              <Typography variant="h6">
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
                        <TableRow key={row.id}>
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
              {page !== undefined && pageCount !== undefined && pageCount > 1 && onPageChange && (
                <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
                  <Pagination
                    page={page}
                    count={pageCount}
                    onChange={(_, value) => onPageChange(value)}
                    color="primary"
                  />
                </Box>
              )}
            </>
          )}
        </Grid>
      </Grid>
    </DownloadCard>
  );
});

export { IndeterminateCheckbox };
export default TableRowSelection;
