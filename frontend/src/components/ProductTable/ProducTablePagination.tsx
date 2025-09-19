import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "../ui/pagination";
import type { Table } from "@tanstack/react-table";

type ProductTablePaginationProps<TData> = {
  table: Table<TData>;
  pages: number[];
  pageIndex: number;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
};

export default function ProductTablePagination<TData>({
  table,
  pages,
  pageIndex,
  setPageIndex,
}: ProductTablePaginationProps<TData>) {
  return (
    <>
      <div className="flex justify-end p-4 bg-card">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                size="sm"
                onClick={() => table.previousPage()}
                className={
                  !table.getCanPreviousPage()
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>

            {pages.map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    table.setPageIndex(page);
                    setPageIndex(page);
                  }}
                  className={
                    pageIndex === page ? "bg-primary text-white" : undefined
                  }
                >
                  {page + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                size="sm"
                onClick={() => table.nextPage()}
                className={
                  !table.getCanNextPage()
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}
