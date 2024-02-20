import { req } from "express-validator";

const checkRole = (token) =>{
     console.log(token);
}

export const tokenRoleValidation = {
  token : req
  .custom(checkRole)
}