import type { Product } from "@/types/types";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
// import { formatCurrencyBRL } from "@/utils/formatCurrency";
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
      <Card className="h-[150px] flex flex-col">
        <CardHeader className="px-2 pt-2.5 pb-1">
          <div className="flex gap-4 items-start text-left justify-between">
            <p className="text-base capitalize line-clamp-2 font-semibold max-w-[250px] overflow-hidden">
              {product.name}
            </p>

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
          </div>
        </CardHeader>

        <CardContent className="flex flex-col items-start p-0 px-2 flex-1">
          <p className="text-sm text-wrap mb-2 truncate capitalize line-clamp-3 overflow-hidden text-left">
            {product.description}
          </p>
          {/* <p className="font-bold text-base">
            {formatCurrencyBRL(product.price)}
          </p> */}
        </CardContent>

        <CardFooter className="capitalize px-3 mt-auto pb-3 text-xs text-gray-500">{product.category}</CardFooter>
      </Card>
    </>
  );
}
