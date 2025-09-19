import type { Product } from "@/types/types";
import {
  Card,
  CardContent,
  CardDescription,
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
import { EllipsisVertical } from "lucide-react";

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
      <Card className="mb-4 h-full flex flex-col justify-between relative">
        {/* Actions */}
        <div className="absolute top-2 right-2">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <EllipsisVertical className="h-5 w-5 cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onDetails(product._id)}>
                Detalhes
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(product)}>
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(product._id)}>
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Card Content */}
        <CardHeader className="pb-2">
          <CardTitle className="text-base capitalize line-clamp-1">
            {product.name}
          </CardTitle>
          <CardDescription className="text-base capitalize line-clamp-1">
            {product.category}
          </CardDescription>
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
