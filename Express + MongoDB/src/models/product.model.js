import { Schema, model } from "mongoose";
import { imageRegex } from "../helpers/imageURLRegex.js";

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Debe ingresar un nombre"],
    minLength: [4, "El nombre es demasiado corto"],
    maxLength: [60, "El nombre es demasiado largo"],
    unique: [true, "Un producto con este nombre ya existe"],
  },
  price: {
    type: Number,
    required: [true, "Debe ingresar un precio"],
    min: [1, "{VALUE} es un valor invalido"],
    max: [10_000_000, "{VALUE} es un valor invalido"],
  },
  category: {
    type: String,
    required: [true, "Debe ingresar una categoria"],
    enum: {
      values: ["mug", "notepad", "hat", "bottle", "keychain", "shirt"],
      message: "{VALUE} no es una categoria valida",
    },
  },
  discountPercenteage: {
    type: Number,
    min: 1,
    max: 99,
  },
  visible: {
    type: Boolean,
    default: true,
  },
  image: {
    type: String,
    required: [true, "Debe ingresar una imagen"],
    match: [imageRegex, "La imagen ingresada es invalida"],
  },
});

export default model("Product", productSchema);
