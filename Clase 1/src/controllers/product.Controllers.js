import { productsDb } from "../database/db.js";
import { Product } from "../models/product.model.js";
import { validateProductsLength } from "../helpers/validateProductsLength.js";

export const getAll = (req, res) => {
  res.status(200).json(productsDb);
};

export const getById = (req, res) => {
  const { id } = req.params;
  const productFound = productsDb.find((product) => product.id == id);
  return res.status(200).json(productFound);
};

export const sortByPrice = (req, res) => {
  const { order } = req.params;
  let filteredProducts;
  // order = "asc" || "desc" || "disc"

  if (order == "asc") {
    filteredProducts = productsDb.sort((a, b) => a.price - b.price);
    return res.status(200).json(filteredProducts);
  }

  if (order == "desc") {
    filteredProducts = productsDb.sort((a, b) => b.price - a.price);
    return res.status(200).json(filteredProducts);
  }

  if (order == "disc") {
    filteredProducts = productsDb.filter(
      (product) => product.discountPercentage
    );
    return res.status(200).json(filteredProducts);
  }
};

export const sortByCategory = (req, res) => {
  const { category } = req.params;
  const filteredProducts = productsDb.filter(
    (product) => product.category == category
  );
  return res.status(200).json(filteredProducts);
};

export const searchByName = (req, res) => {
  const { searchQuery } = req.params;
  const query = searchQuery.toLowerCase().trim();
  const filteredProducts = productsDb.filter((product) =>
    product.name.toLowerCase().includes(query)
  );

  if (!filteredProducts.length) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }

  return res.status(200).json(filteredProducts);
};

export const create = (req, res) => {
  const body = req.body;
  const { name, price, discountPercentage, category, image } = req.body;
  const newProduct = new Product(body);
  productsDb.push(newProduct);
  return res.status(201).json({ message: "Producto creado correctamente" });
};

export const edit = (req, res) => {
  const { id } = req.params;
};

export const findByIdAndDelete = (req, res) => {};

export const searchWithOptions = (req, res) => {
  const { category, name, price } = req.query;

  let filteredProducts = [];

  if (category && name && price) {
    filteredProducts = productsDb.filter(
      (product) => product.category == category
    );
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(name.toLowerCase())
    );
    price == ("asc" || "desc")
    ? (filteredProducts = filteredProducts.sort((a, b) =>
        price == "asc" ? a.price - b.price : b.price - a.price
      ))
    : (filteredProducts = filteredProducts.filter(
        (product) => product.discountPercentage
      ));

    if (!filteredProducts.length) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    return res.status(200).json(filteredProducts);
  }

  if (category && name) {
    console.log("Controlador categoria/nombre");
    filteredProducts = productsDb.filter(
      (product) => product.category == category
    );
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(name.toLowerCase())
    );

    if (!filteredProducts.length) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    return res.status(200).json(filteredProducts);
  }

  if (name && price) {
    filteredProducts = productsDb.filter((product) =>
      product.name.toLowerCase().includes(name.toLowerCase())
    );
    price == ("asc" || "desc")
    ? (filteredProducts = filteredProducts.sort((a, b) =>
        price == "asc" ? a.price - b.price : b.price - a.price
      ))
    : (filteredProducts = filteredProducts.filter(
        (product) => product.discountPercentage
      ));

    if (!filteredProducts.length) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    return res.status(200).json(filteredProducts);
  }

  if (category && price) {
    filteredProducts = productsDb.filter(
      (product) => product.category == category
    );
    price == ("asc" || "desc")
    ? (filteredProducts = filteredProducts.sort((a, b) =>
        price == "asc" ? a.price - b.price : b.price - a.price
      ))
    : (filteredProducts = filteredProducts.filter(
        (product) => product.discountPercentage
      ));

    if (!filteredProducts.length) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    return res.status(200).json(filteredProducts);
  }

  if (price) {
    if (price == "asc") {
      filteredProducts = productsDb.sort((a, b) => a.price - b.price);
      return res.status(200).json(filteredProducts);
    }

    if (price == "desc") {
      filteredProducts = productsDb.sort((a, b) => b.price - a.price);
      return res.status(200).json(filteredProducts);
    }

    if (price == "disc") {
      filteredProducts = productsDb.filter(
        (product) => product.discountPercentage
      );
      return res.status(200).json(filteredProducts);
    }
  }

  if (name) {
    const query = name.toLowerCase().trim();
    const filteredProducts = productsDb.filter((product) =>
      product.name.toLowerCase().includes(name)
    );

    if (!filteredProducts.length) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    return res.status(200).json(filteredProducts);
  }

  if (category) {
    const filteredProducts = productsDb.filter(
      (product) => product.category == category
    );
    return res.status(200).json(filteredProducts);
  }
};
