import { MoreHorizontal, Info, Edit, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Separator } from "@radix-ui/react-dropdown-menu";
import type { Product } from "@/types/types";
import type { Row } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";

type ProductTableActionsProps = {
  row: Row<Product>;
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
};

export default function ProductTableActions({
  row,
  onDelete,
  onEdit,
}: ProductTableActionsProps): JSX.Element {
  const navigate = useNavigate();
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
          onClick={() => navigate(`/products/${row.original._id}`)}
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
}
