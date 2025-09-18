import Product from "../models/Product";
import Review from "../models/Review";

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    if (!name || !description || !price || !category) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      category,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creating product", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const listProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error getting products", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);
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
    const { name, description, price, category } = req.body;
    const productId = req.params.id;

    if (!name || !description || !price || !category) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        name,
        description,
        price,
        category,
      },
      { new: true }
    );

    res.status(200).json(updateProduct);
  } catch (error) {
    console.error("Error updating product", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    await Product.findByIdAndDelete(productId);

    await Review.deleteMany({ productId });

    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    console.error("Error deleting product", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
