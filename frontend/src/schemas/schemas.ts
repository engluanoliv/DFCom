import * as z from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Nome do produto é obrigatório"),
  price: z.number().min(0.01, "Preço deve ser maior que 0"),
  description: z.string().min(1, "Descrição é obrigatória"),
  category: z.enum(
    ["eletronicos", "roupas", "livros"],
    "Selecione uma categoria"
  ),
});

export type ProductSchemaType = z.infer<typeof productSchema>;
