import type { Product } from "@/types/types";
import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";
import { formatCurrencyBRL } from "@/utils/formatCurrency";
import ProductTableActions from "./ProductTableActions";

type ProductTableColumnProps = {
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
  hasProducts: boolean;
};

export const ProductTableColumn = ({
  onEdit,
  onDelete,
  hasProducts,
}: ProductTableColumnProps): ColumnDef<Product>[] => [
  {
    id: "select",
    header: ({ table }) =>
      hasProducts && (
        <div className="flex items-center justify-center px-2">
          <Checkbox
            className="border-gray-400"
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
          />
        </div>
      ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center px-2">
        <Checkbox
          className="border-gray-400"
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
    size: 50,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-sm justify-start"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <p className="capitalize text-left text-sm font-semibold justify-start truncate text-wrap line-clamp-2 text-primary px-3">
        {row.getValue("name")}
      </p>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-sm justify-start"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Preço
          <ArrowUpDown className=" h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }: { row: any }) => {
      const price = parseFloat(row.getValue("price"));
      const formattedPrice = formatCurrencyBRL(price);

      return (
        <p className="text-left text-primary max-w-[80px] px-3">
          {formattedPrice}
        </p>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-sm justify-start  max-w-[150px]"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Categoria
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <p className="capitalize text-left text-primary max-w-[150px] px-3">
        {row.getValue("category")}
      </p>
    ),
  },
  {
    accessorKey: "description",
    header: () => {
      return <p>Descrição</p>;
    },
    cell: ({ row }) => (
      <p className="capitalize text-left truncate text-wrap text-primary line-clamp-2">
        {row.getValue("description")}
      </p>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <ProductTableActions onDelete={onDelete} onEdit={onEdit} row={row} />
      );
    },
  },
];
