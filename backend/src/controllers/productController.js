import {
  createProductService,
  deleteProductService,
  getProductService,
  listProductsService,
  updateProductService,
} from "../services/productService.js";

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    if (!name || !description || !price || !category) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios" });
    }

    const newProduct = await createProductService({
      name,
      description,
      price,
      category,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creating product", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const listProducts = async (req, res) => {
  try {
    const products = await listProductsService();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error getting products", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await getProductService(productId);
    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error getting product", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, description, price, category } = req.body;

    if (!name || !description || !price || !category) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios" });
    }

    const updatedProduct = updateProductService(productId, {
      name,
      description,
      price,
      category,
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    await deleteProductService(productId);

    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    console.error("Error deleting product", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
