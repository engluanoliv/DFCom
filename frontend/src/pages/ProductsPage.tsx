import ProductModal from "@/components/ProductModal/ProductModal";
import type { Product } from "@/types/types";
import ProductTable from "@/components/ProductTable/ProductTable";
import { ProductTableColumn } from "@/components/ProductTable/ProductTableColumns";
import ProductCard from "@/components/ProductCard/ProductCard";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { useMemo, useState } from "react";
import ConfirmDeleteModal from "@/components/ui/confirm-delete-dialog";
import EmptyCards from "@/components/ui/empty-cards";
import EmptyState from "@/components/ui/empty-state";

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

  const actions = useMemo(
    () => ({
      onEdit: (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
      },
      onDetails: (productId: string) => {
        navigate(`/products/${productId}`);
      },
      onDelete: (productId: string) => {
        setProductId(productId);
        setIsAlertOpen(true);
      },
    }),
    [navigate, setSelectedProduct, setIsModalOpen]
  );

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
        {/* Delete Multiple */}
        {hasProducts && (
          <Button
            variant="destructive"
            className="self-start hidden md:flex hover:cursor-pointer"
            onClick={handleDeleteSelectedRows}
            disabled={!Object.keys(rowSelection).length}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Excluir selecionados
          </Button>
        )}

        {/* Add Product */}
        <Button
          className="bg-green-600 hover:cursor-pointer hover:bg-green-600/80 dark:text-zinc-50"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="sm:hidden" />
          <span className="hidden sm:flex">Adicionar Produto</span>
        </Button>
      </div>

      {/* Empty state show a feedback message */}
      {!hasProducts && (
        <EmptyCards>
          <EmptyState
            className="-mt-32 md:-mt-48 relative"
            emoji="📦"
            title="Nenhum produto encontrado"
            description="Ainda não existe produto cadastrado."
          />
        </EmptyCards>
      )}

      {/* List Products for Desktop view */}
      {hasProducts && (
        <div className="hidden md:block w-full">
          <ProductTable
            data={products || []}
            columns={ProductTableColumn({
              ...actions,
              hasProducts,
            })}
            rowSelection={rowSelection}
            onRowSelectionChange={setRowSelection}
          />
        </div>
      )}

      {/* List Products for mobile view */}
      {hasProducts && (
        <div className="w-full lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:hidden">
          {products?.map((product) => (
            <ProductCard key={product._id} product={product} {...actions} />
          ))}
        </div>
      )}

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
