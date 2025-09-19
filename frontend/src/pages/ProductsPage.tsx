import ProductModal from "@/components/ProductModal/ProductModal";
import type { Product } from "@/types/types";
import ProductTable from "@/components/ProductTable/ProductTable";
import { ProductTableColumn } from "@/components/ProductTable/ProductTableColumns";
import ProductCard from "@/components/ProductCard/ProductCard";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";

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

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDetails = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  const hasProducts = !!products?.length;

  return (
    <div className="flex flex-col gap-4">
      <ProductModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        product={selectedProduct}
        onSave={handleSave}
      />

      <div className="flex gap-2 self-end">
        <Button
          variant="destructive"
          className="self-start"
          onClick={handleDeleteSelectedRows}
          disabled={!Object.keys(rowSelection).length}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Excluir selecionados
        </Button>
        <Button onClick={() => setIsModalOpen(true)}>Novo Produto</Button>
      </div>

      <div className="hidden md:block">
        <ProductTable
          data={products || []}
          columns={ProductTableColumn({
            onEdit: handleEdit,
            onDelete: handleDelete,
            onDetails: handleDetails,
            hasProducts,
          })}
          rowSelection={rowSelection}
          onRowSelectionChange={setRowSelection}
        />
      </div>

      <div className="flex flex-col md:hidden">
        {products?.map((product) => (
          <ProductCard key={product._id} product={product} onEdit={() => {}} />
        ))}
      </div>
    </div>
  );
}
