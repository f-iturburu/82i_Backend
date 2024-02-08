import Product from "../models/product.model.js";

export const createProduct = async (req, res) => {
  const { name, price, category, discountPercenteage, visible, image } = req.body;
  try {
    const newProduct = await Product.create({
      name: name,
      price: price,
      category: category,
      discountPercenteage: discountPercenteage,
      visible: visible,
      image: image,
    });
    res.status(201).json({ id: newProduct._id });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const getAll = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const products = await Product.findById(id);
    res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const deleteById = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(204).json({ message: "Producto borrado exitosamente" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
