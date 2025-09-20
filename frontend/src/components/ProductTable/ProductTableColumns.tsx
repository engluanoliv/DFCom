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
import { ArrowUpDown, Edit, Info, MoreHorizontal, Trash2 } from "lucide-react";
import { formatCurrencyBRL } from "@/utils/formatCurrency";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Separator } from "../ui/separator";

type ProductTableColumnProps = {
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
  onDetails: (productId: string) => void;
  hasProducts: boolean;
};

export const ProductTableColumn = ({
  onEdit,
  onDelete,
  onDetails,
  hasProducts,
}: ProductTableColumnProps): ColumnDef<Product>[] => [
  {
    id: "select",
    header: ({ table }) =>
      hasProducts && (
        <div className="flex items-center justify-center">
          <Checkbox
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
      <p className="capitalize text-left text-sm font-semibold truncate justify-start overflow-hidden whitespace-nowrap p-3 text-primary">
        {row.getValue("name")}
      </p>
    ),
    size: 150,
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-sm w-[100px] justify-start"
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
        <p className="text-left p-3 text-primary w-[100px]">{formattedPrice}</p>
      );
    },
    // size: 150,
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-sm w-[100px] justify-start"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Categoria
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <p className="capitalize text-left p-3 text-primary w-[100px]">
        {row.getValue("category")}
      </p>
    ),
    // size: 150,
  },
  {
    accessorKey: "description",
    header: () => {
      return <p className="text-sm w-64">Descrição</p>;
    },
    cell: ({ row }) => (
      <p className="capitalize text-left truncate  w-64 overflow-hidden whitespace-nowrap text-primary">
        {row.getValue("description")}
      </p>
    ),
    size: 200,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0 hover:cursor-pointer"
                >
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent align="start" className="text-xs">
              <p>Ações</p>
            </TooltipContent>
          </Tooltip>

          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem
              className="hover:cursor-pointer font-light py-2"
              onClick={() => onDetails(row.original._id)}
            >
              <Info /> Detalhes
            </DropdownMenuItem>

            <Separator />

            <DropdownMenuItem
              className="hover:cursor-pointer font-light py-2"
              onClick={() => onEdit(row.original)}
            >
              <Edit /> Editar
            </DropdownMenuItem>

            <Separator />

            <DropdownMenuItem
              className="text-red-600 hover:cursor-pointer font-light py-2"
              onClick={() => onDelete(row.original._id)}
            >
              <Trash2 /> Remover
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    // size: 60,
  },
];
