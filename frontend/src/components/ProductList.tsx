import { useEffect, useState, type JSX } from "react";
import type { Product } from "../types/types";
import api from "@/config/axios";
import AddProductModal from "./AddProductModal";

export default function ProductList(): JSX.Element {
  const [products, setProducts] = useState<Product[]>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await api.get("/products").then((res) => res.data);
    setProducts(response);
  };

  return (
    <>
      <AddProductModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        refetchProducts={fetchProducts}
      />
      <div className="flex flex-col justify-center py-24 gap-4">
        {products?.length === 0 && <p>Nenhum produto</p>}
        {products?.map((product) => (
          <p key={product._id}>
            {product.name} - R$ {product.price.toFixed(2)}
          </p>
        ))}
      </div>
    </>
  );
}
