import { useEffect, useState, type JSX } from "react";
import type { Product } from "../types/types";
import api from "@/config/axios";
import AddProductModal from "./AddProductModal";
import { useTheme } from "@/context/ThemeProvider";

export default function ProductList(): JSX.Element {
  const [products, setProducts] = useState<Product[]>();
  const { theme } = useTheme();
  console.log(theme);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await api.get("/products").then((res) => res.data);
      setProducts(response);
    };
    fetchProducts();
  }, []);

  return (
    <>
      <AddProductModal />
      {products?.length === 0 && <p>Nenhum produto</p>}
      {products?.map((product) => (
        <p key={product._id}>
          {product.name} - R$ {product.price.toFixed(2)}
        </p>
      ))}
    </>
  );
}
