import { useEffect, useState, type JSX } from "react";
import api from "../api/axios";
import type { Product } from "../types/types";

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
      <h2>Produtos</h2>
      {products?.length === 0 && <p>Nenhum produto</p>}
      {products?.map((product) => (
        <p>
          {product.name} - R$ {product.price.toFixed(2)}
        </p>
      ))}
    </>
  );
}
