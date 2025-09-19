import type { Product } from "@/types/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { formatCurrencyBRL } from "@/utils/formatCurrency";

type ProductCardProps = {
  product: Product;
  onEdit: (product: Product) => void;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <>
      <Card className="mb-4 h-full flex flex-col justify-between">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm capitalize line-clamp-1">
            {product.name}
          </CardTitle>
          <CardDescription className="text-xs capitalize line-clamp-1">
            {product.category}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col justify-between">
          <p className="text-sm mb-2 truncate capitalize line-clamp-2">
            {product.description}
          </p>
          <p className="font-bold text-sm">
            {formatCurrencyBRL(product.price)}
          </p>
        </CardContent>
      </Card>
    </>
  );
}
