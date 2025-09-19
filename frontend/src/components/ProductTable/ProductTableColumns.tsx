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
import { Edit, EllipsisVertical, Info, Trash2 } from "lucide-react";
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
      const formattedPrice = formatCurrencyBRL(price);

      return <div className="text-left">{formattedPrice}</div>;
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
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-8 w-8 p-0 hover:cursor-pointer"
                >
                  <EllipsisVertical />
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent align="start" className="text-xs">
              <p>Ações</p>
            </TooltipContent>
          </Tooltip>

          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="hover:cursor-pointer"
              onClick={() => onDetails(row.original._id)}
            >
              <Info /> Detalhes
            </DropdownMenuItem>

            <Separator />

            <DropdownMenuItem
              className="hover:cursor-pointer"
              onClick={() => onEdit(row.original)}
            >
              <Edit /> Editar
            </DropdownMenuItem>

            <Separator />

            <DropdownMenuItem
              className="text-red-600 hover:cursor-pointer"
              onClick={() => onDelete(row.original._id)}
            >
              <Trash2 /> Remover
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    size: 60,
  },
];
