import { type SubmitHandler, type UseFormReturn } from "react-hook-form";
import { Button } from "../ui/button";
import { DialogClose, DialogFooter } from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import type { ProductSchemaType } from "@/schemas/schemas";

type ProductModalFormProps = {
  form: UseFormReturn<ProductSchemaType>;
  onSubmit: SubmitHandler<ProductSchemaType>;
  isSubmitting: boolean;
};

export default function ProductModalForm({
  form,
  isSubmitting,
  onSubmit,
}: ProductModalFormProps) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mt-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Produto</FormLabel>
              <FormControl>
                <Input placeholder="Nome do Produto" {...field} />
              </FormControl>
              <FormMessage>{form.formState.errors.name?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preço</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Preço"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage>{form.formState.errors.price?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea placeholder="Descrição" {...field} />
              </FormControl>
              <FormMessage>
                {form.formState.errors.description?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="eletronicos">Eletrônicos</SelectItem>
                    <SelectItem value="roupas">Roupas</SelectItem>
                    <SelectItem value="livros">Livros</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage>
                {form.formState.errors.category?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        <DialogFooter className="mt-4 flex justify-end gap-2">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </DialogClose>
          <Button
            type="submit"
            disabled={!form.formState.isValid || isSubmitting}
          >
            {isSubmitting ? "Adicionando..." : "Adicionar"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
