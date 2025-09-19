import type { JSX } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function AddProductModal(): JSX.Element {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Novo Produto</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Adicionar Novo Produto</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-2 mt-2">
            <Input placeholder="Nome do Produto" />
            <Input type="number" placeholder="Preço" />
          </div>
          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button variant="outline">Cancelar</Button>
            <Button>Adicionar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
