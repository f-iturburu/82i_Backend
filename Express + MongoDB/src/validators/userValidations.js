import { body } from "express-validator";
import User from "../models/user.model.js";
import { passwordRegex } from "../helpers/passwordRegex.js";
import { comparePasswords } from "../helpers/comparePasswords.js";

const emailExistValidation = async (email) => {
  const emailExists = await User.find({ email: email });

  if (emailExists.length !== 0) {
    throw new Error(`El email ${email} ya esta registrado`);
  }

  return false;
};

const checkPasswordValidation = async (req) => {
  const { email, password } = req;

  const userFound = await User.findOne({ email: email });

  if (!userFound) {
    throw new Error(`El email o la contraseña son incorrectos`);
  }

  const checkPassword = await comparePasswords(password, userFound.password);

  if (!checkPassword) {
    throw new Error(`El email o la contraseña son incorrectos`);
  }

  return false;
};

export const userValidations = {
  email: body("email")
    .isEmail()
    .withMessage("El email no es valido")
    .not()
    .isEmpty()
    .withMessage("Este campo es requerido")
    .custom(emailExistValidation),
  password: body("password")
    .matches(passwordRegex)
    .withMessage("Ingrese una contraseña valida"),
};

export const loginValidations = {
  email: body("email")
    .isEmail()
    .withMessage("El email no es valido")
    .not()
    .isEmpty()
    .withMessage("Este campo es requerido")
    ,
  password: body().custom(checkPasswordValidation),
};
