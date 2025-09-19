import ProductModal from "@/components/ProductModal/ProductModal";
import { useEffect, useState } from "react";
import type { Product } from "@/types/types";
import api from "@/config/axios";
import ProductTable from "@/components/ProductTable/ProductTable";
import { ProductTableColumn } from "@/components/ProductTable/ProductTableColumns";

function App() {
  const [products, setProducts] = useState<Product[]>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    undefined
  );
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await api.get("/products").then((res) => res.data);
    setProducts(response);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-4">
      <ProductModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        refetchProducts={fetchProducts}
        product={selectedProduct}
      />
      <ProductTable
        data={products || []}
        columns={ProductTableColumn({ onEdit: handleEdit })}
      />
    </div>
  );
}

export default App;
