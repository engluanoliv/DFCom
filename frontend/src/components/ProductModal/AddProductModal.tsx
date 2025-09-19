import api from "@/config/axios";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { type JSX } from "react";
import { productSchema, type ProductSchemaType } from "@/schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import AddProductModalForm from "./AddProductModalForm";

type AddProductModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  refetchProducts: () => void;
};

export default function AddProductModal({
  isModalOpen,
  setIsModalOpen,
  refetchProducts,
}: AddProductModalProps): JSX.Element {
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

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: ProductSchemaType) => {
    try {
      await api.post("/products", values).then((res) => res.data);
      refetchProducts();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };
  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button className="justify-self-end">Novo Produto</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Novo Produto</DialogTitle>
            <DialogDescription>
              Preencha os campos para adicionar um novo produto
            </DialogDescription>
          </DialogHeader>
          <AddProductModalForm
            form={form}
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
