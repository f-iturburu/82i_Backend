import { productsDb } from "../database/db.js";
import { Product } from "../models/product.model.js";
import { validateProductsLength } from "../helpers/validateProductsLength.js";

export const getAll = (req, res) => {
  res.status(200).json(productsDb);
};

export const getById = (req, res) => {
  const { id } = req.params;
  const productFound = productsDb.find((product) => product.id == id);

  if (!productFound) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }

  res.status(200).json(productFound);
};

export const sortByPrice = (req, res) => {
  const { order } = req.params;
  let sortedProducts;

  //Utilizando Ternario
  sortedProducts = productsDb.sort((a, b) =>
    order == "asc" ? a.price - b.price : b.price - a.price
  );

  //Utilizando Condicional "if"

  // if (order == "asc") {
  //   sortedProducts = productsDb.sort((a, b) => a.price - b.price);
  // }

  // if (order == "desc") {
  //   sortedProducts = productsDb.sort((a, b) => b.price - a.price);
  // }

  if (order == "disc") {
    sortedProducts = productsDb.filter((product) => product.discountPercentage);
  }

  res.status(200).json(sortedProducts);
};

export const sortByCategory = (req, res) => {
  const { category } = req.params;
  const filteredProducts = productsDb.filter(
    (product) => product.category == category
  );

  if (!filteredProducts.length) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }

  res.status(200).json(filteredProducts);
};

export const searchByName = (req, res) => {
  const { searchQuery } = req.params;
  const filteredProducts = productsDb.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!filteredProducts.length) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }

  res.status(200).json(filteredProducts);
};

export const create = (req, res) => {
  const body = req.body;
  const { name, price, discountPercentage, category, image } = req.body;
  const newProduct = new Product(body);
  productsDb.push(newProduct);
  res
    .status(201)
    .json({ message: "Producto creado correctamente", product: newProduct });
};

export const edit = (req, res) => {
  const { id } = req.params;
  const productFound = productsDb.find((product) => product.id == id);

  if (productFound) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }
};

export const findByIdAndDelete = (req, res) => {

};

export const searchWithOptions = (req, res) => {
  const { category, name, price } = req.query; 
  console.log(req.query);
};
