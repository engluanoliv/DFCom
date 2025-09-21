import type { Product } from "@/types/types";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { formatCurrencyBRL } from "@/utils/formatCurrency";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Edit, EllipsisVertical, Info, Trash2 } from "lucide-react";
import { Separator } from "../ui/separator";

type ProductCardProps = {
  product: Product;
  onEdit: (product: Product) => void;
  onDetails: (productId: string) => void;
  onDelete: (productId: string) => void;
};

export default function ProductCard({
  product,
  onDelete,
  onDetails,
  onEdit,
}: ProductCardProps) {
  return (
    <>
      <Card className="mb-4 h-full flex flex-col justify-between">
        <CardHeader className="pb-0 flex items-center justify-between flex-row">
          <CardTitle className="text-base capitalize line-clamp-1 font-semibold self-start">
            {product.name}
          </CardTitle>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <EllipsisVertical className="h-5 w-5 cursor-pointer" />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem
                className="hover:cursor-pointer font-light py-2"
                onClick={() => onDetails(product._id)}
              >
                <Info /> Detalhes
              </DropdownMenuItem>

              <Separator />

              <DropdownMenuItem
                className="hover:cursor-pointer font-light py-2"
                onClick={() => onEdit(product)}
              >
                <Edit /> Editar
              </DropdownMenuItem>

              <Separator />

              <DropdownMenuItem
                className="text-red-600 hover:cursor-pointer font-light py-2"
                onClick={() => onDelete(product._id)}
              >
                <Trash2 /> Remover
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>

        <CardContent className="flex flex-col justify-between">
          <p className="text-base mb-2 truncate capitalize line-clamp-2">
            {product.description}
          </p>
          <p className="font-bold text-base">
            {formatCurrencyBRL(product.price)}
          </p>
        </CardContent>
      </Card>
    </>
  );
}
