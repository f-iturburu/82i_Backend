import User from "../models/user.model.js";
import { hashPassword } from "../helpers/hashPassword.js";
import { signToken } from "../helpers/signToken.js";


export const create = async (req, res) => {
  const { email, password } = req.body;

  try {
    const newUser = User({
      email: email,
      password: password,
    });

    const hashedPassword = await hashPassword(password);
    newUser.password = hashedPassword;
    newUser.save();
    const authCredentials = signToken(newUser);
    res.status(201).json(authCredentials);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  const authCredentials = signToken(user);


  res.status(200).json(authCredentials);
};
