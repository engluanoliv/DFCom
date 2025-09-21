import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import ProductTablePagination from "./ProducTablePagination";

type ProductTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  rowSelection: Record<string, boolean>;
  onRowSelectionChange: (updater: any) => void;
};

export default function ProductTable<TData, TValue>({
  columns,
  data,
  rowSelection,
  onRowSelectionChange,
}: ProductTableProps<TData, TValue>): JSX.Element {
  const [pageSize] = useState(5);
  const [pageIndex, setPageIndex] = useState(0);
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    onPaginationChange: (updater) => {
      const newState =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize })
          : updater;
      setPageIndex(newState.pageIndex);
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount: Math.ceil(data.length / pageSize),
    enableRowSelection: true,
    onRowSelectionChange,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: { pagination: { pageIndex, pageSize }, rowSelection, sorting },
  });

  const pages = Array.from({ length: table.getPageCount() }, (_, i) => i);

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-md border shadow w-full">
        {/* Table of Products */}
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="h-12 bg-zinc-100 dark:bg-card" key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      // style={{ width: header.column.getSize() }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="h-14"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sem Produtos
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Footer + Pagination */}
        <div className="flex items-center justify-between space-x-2 p-4 bg-card">
          <div className="text-muted-foreground text-sm">
            {table.getFilteredSelectedRowModel().rows.length} de{" "}
            {table.getFilteredRowModel().rows.length} produto(s) selecionado(s).
          </div>

          {/* Pagination */}
          <ProductTablePagination
            setPageIndex={setPageIndex}
            pageIndex={pageIndex}
            pages={pages}
            table={table}
          />
        </div>
      </div>
    </div>
  );
}
