import { productsDb } from "../database/db.js";
import { Product } from "../models/product.model.js";

export const getAll = (req, res) => {
  res.status(200).json(productsDb);
};

export const getById = (req, res) => {

};

export const sortByPrice = (req, res) => {

};

export const sortByCategory = (req, res) => {

};

export const searchByName = (req, res) => {

};

export const create = (req, res) => {

};

export const edit = (req, res) => {

};

export const findByIdAndDelete = (req, res) => {

};
