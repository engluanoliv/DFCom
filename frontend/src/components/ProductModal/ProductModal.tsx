import { useForm } from "react-hook-form";
import { useEffect, type JSX } from "react";
import { productSchema, type ProductSchemaType } from "@/schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import ProductModalForm from "./ProductModalForm";
import type { Product } from "@/types/types";

type ProductModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  product: Product | null;
  onSave: (values: ProductSchemaType, product?: Product) => Promise<void>;
};

export default function ProductModal({
  isModalOpen,
  setIsModalOpen,
  product,
  onSave,
}: ProductModalProps): JSX.Element {
  const form = useForm<ProductSchemaType>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      category: undefined,
    },
    mode: "onChange",
  });

  const { formState, reset } = form;

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category,
      });
    } else {
      reset({
        name: "",
        price: 0,
        description: "",
        category: undefined,
      });
    }
  }, [isModalOpen, product, reset]);

  const onSubmit = async (values: ProductSchemaType) => {
    await onSave(values, product ?? undefined);
  };
  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[400px] rounded-lg">
          <DialogHeader>
            <DialogTitle>
              {product ? "Editar Produto" : "Novo Produto"}
            </DialogTitle>
            <DialogDescription>
              {product
                ? "Altere os campos para atualizar o produto"
                : "Preencha os campos para adicionar um novo produto"}
            </DialogDescription>
          </DialogHeader>
          <ProductModalForm
            form={form}
            onSubmit={onSubmit}
            isSubmitting={formState.isSubmitting}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
