import api from "@/config/axios";
import type { ProductSchemaType } from "@/schemas/schemas";
import type { Product } from "@/types/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelection, setRowSelection] = useState({});
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      toast.error("Erro ao carregar produtos");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSave = async (values: ProductSchemaType, product?: Product) => {
    try {
      if (product) {
        await api.put(`/products/${product._id}`, values);
        toast.success("Produto atualizado 📝");
      } else {
        await api.post("/products", values);
        toast.success("Produto criado 🥳");
      }
      fetchProducts();
      setIsModalOpen(false);
      setSelectedProduct(null);
    } catch (error) {
      toast.error("Erro ao salvar produto");
      console.error(error);
    }
  };

  const handleDelete = async (productId: string) => {
    try {
      await api.delete(`/products/${productId}`);
      fetchProducts();
      toast.success("Produto excluído 🎉");
    } catch (error) {
      toast.error("Erro ao remover produto");
      console.error("Erro ao remover produto:", error);
    }
  };

  const handleDeleteSelectedRows = async () => {
    const selectedIds = Object.keys(rowSelection).map(
      (key) => products[Number(key)]._id
    );
    try {
      await Promise.all(selectedIds.map((id) => api.delete(`/products/${id}`)));
      toast.success("Produtos excluídos 🎉");
      setRowSelection({});
      fetchProducts();
    } catch (error) {
      toast.error("Erro ao remover produtos");
      console.error(error);
    }
  };

  return {
    products,
    rowSelection,
    setRowSelection,
    isModalOpen,
    setIsModalOpen,
    selectedProduct,
    setSelectedProduct,
    handleSave,
    handleDelete,
    handleDeleteSelectedRows,
    fetchProducts,
  };
};
