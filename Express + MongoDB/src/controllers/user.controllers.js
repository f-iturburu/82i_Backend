import User from "../models/user.model.js";
import { hashPassword } from "../helpers/hashPassword.js";
export const create =  async (req,res) =>{
  const {email, password} = req.body 

  try {
     const newUser = User({
        email:email,
        password:password
     })

     const hashedPassword = await (hashPassword(password))
     newUser.password = hashedPassword
     newUser.save()

     res.status(201).json({message: "Usuario creado correctamente"})
  } catch (error) {
    res.status(500).json(error)
  }
}