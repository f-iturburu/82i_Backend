import { body } from "express-validator";
import User from "../models/user.model.js";
import { passwordRegex } from "../helpers/passwordRegex.js";

const emailExistValidation = async (email) =>{
    const emailExists = await User.find({email : email})
    
    if (emailExists.length !== 0 ) {
        throw new Error(`El email ${email} ya esta registrado`)
    }

    return false
}

export const userValidations = {
  email: body("email")
    .isEmail()
    .withMessage("El email no es valido")
    .not()
    .isEmpty()
    .withMessage("Este campo es requerido")
    .custom(emailExistValidation)
    ,
  password: body("password")
    .matches(passwordRegex)
    .withMessage("Ingrese una contraseña valida"),
};
