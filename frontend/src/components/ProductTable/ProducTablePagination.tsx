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
      <div className="flex justify-end p-4 pe-0">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                size="sm"
                onClick={() => table.previousPage()}
                className={
                  !table.getCanPreviousPage()
                    ? "pointer-events-none opacity-50"
                    : "hover:cursor-pointer"
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
                    pageIndex === page
                      ? "bg-background hover:cursor-pointer"
                      : undefined
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
                    ? "pointer-events-none !pr-0 opacity-50"
                    : "hover:cursor-pointer !pr-0"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}
