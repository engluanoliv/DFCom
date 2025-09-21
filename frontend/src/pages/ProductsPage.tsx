import ProductModal from "@/components/ProductModal/ProductModal";
import type { Product } from "@/types/types";
import ProductTable from "@/components/ProductTable/ProductTable";
import { ProductTableColumn } from "@/components/ProductTable/ProductTableColumns";
import ProductCard from "@/components/ProductCard/ProductCard";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { useState } from "react";
import ConfirmDeleteModal from "@/components/ui/confirm-delete-dialog";

export default function ProductsPage() {
  const navigate = useNavigate();
  const {
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
  } = useProducts();

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [productId, setProductId] = useState<string | null>(null);

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDetails = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  const handleDeleteProduct = (productId: string) => {
    setProductId(productId);
    setIsAlertOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (productId) {
      await handleDelete(productId);
    }
    setIsAlertOpen(false);
  };

  const hasProducts = products?.length > 0;

  return (
    <div className="flex flex-col gap-4 max-w-5xl mx-auto">
      {/* Buttons */}
      <div className="flex gap-2 md:self-end items-center justify-end">
        <Button
          variant="destructive"
          className="self-start hidden md:flex  hover:cursor-pointer hover:bg-card"
          onClick={handleDeleteSelectedRows}
          disabled={!Object.keys(rowSelection).length}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Excluir selecionados
        </Button>
        <Button
          className="bg-green-600 hover:cursor-pointer hover:bg-green-800"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="sm:hidden" />
          <span className="hidden sm:flex">Adicionar Produto</span>
        </Button>
      </div>

      {/* List Products for Desktop view */}
      <div className="hidden md:block w-full">
        <ProductTable
          data={products || []}
          columns={ProductTableColumn({
            onEdit: handleEdit,
            onDelete: handleDeleteProduct,
            onDetails: handleDetails,
            hasProducts,
          })}
          rowSelection={rowSelection}
          onRowSelectionChange={setRowSelection}
        />
      </div>

      {/* List Products for mobile view */}
      <div className="w-full lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:hidden">
        {products?.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onEdit={handleEdit}
            onDelete={handleDeleteProduct}
            onDetails={handleDetails}
          />
        ))}
      </div>

      {/* Modal to add or update Product */}
      <ProductModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        product={selectedProduct}
        onSave={handleSave}
      />

      {/* Confirm Modal */}
      <ConfirmDeleteModal
        isOpen={isAlertOpen}
        onOpenChange={setIsAlertOpen}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
