import type { Product } from "@/types/types";
import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { EllipsisVertical, Trash2 } from "lucide-react";

type ProductTableColumnProps = {
  onEdit: (product: Product) => void;
};

export const ProductTableColumn = ({
  onEdit,
}: ProductTableColumnProps): ColumnDef<Product>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
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
    header: "Nome",
    cell: ({ row }) => (
      <div className="capitalize text-left text-sm truncate max-w-[200px] overflow-hidden whitespace-nowrap">
        {row.getValue("name")}
      </div>
    ),
    size: 200,
  },
  {
    accessorKey: "price",
    header: "Preço",
    cell: ({ row }: { row: any }) => {
      const price = parseFloat(row.getValue("price"));
      const formattedPrice = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(price);

      return <div className="text-left">R$ {formattedPrice}</div>;
    },
    size: 150,
  },
  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row }) => (
      <div className="capitalize text-left">{row.getValue("category")}</div>
    ),
    size: 150,
  },
  {
    accessorKey: "description",
    header: "Descrição",
    cell: ({ row }) => (
      <div className="capitalize text-left truncate max-w-[200px] overflow-hidden whitespace-nowrap">
        {row.getValue("description")}
      </div>
    ),
    size: 200,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 hover:cursor-pointer"
            >
              <span className="sr-only">Editar</span>
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(row.original)}>
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              Remover <Trash2 />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    size: 60,
  },
];
