import { useEffect, useState, type JSX } from "react";
import type { Product } from "../types/types";
import { Button } from "./ui/button";
import api from "@/config/axios";

export default function ProductList(): JSX.Element {
  const [products, setProducts] = useState<Product[]>();
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await api.get("/products").then((res) => res.data);
      setProducts(response);
    };
    fetchProducts();
  }, []);

  return (
    <>
      <div className="flex items-center justify-end">
        <p>Produtos</p>
        <Button size={'lg'} onClick={() => console.log('clicked')}>Novo produto</Button>
      </div>
      {products?.length === 0 && <p>Nenhum produto</p>}
      {products?.map((product) => (
        <p key={product._id}>
          {product.name} - R$ {product.price.toFixed(2)}
        </p>
      ))}
    </>
  );
}
