export type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: "eletronicos" | "roupas" | "livros";
  createdAt: Date;
};

export type Review = {
  productId: string;
  author: string;
  rating: number;
  comment: string;
  createdAt: Date;
};
