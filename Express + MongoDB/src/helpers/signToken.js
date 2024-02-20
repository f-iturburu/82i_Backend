import  Jwt  from "jsonwebtoken";
import { SECRET } from "../config.js";
import { ADMIN_KEY, USER_KEY } from "../config.js";

export const signToken = (user) => {
  const signedToken = Jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    SECRET
  );

  const key = user.role == "User" ? USER_KEY : ADMIN_KEY

  const authObj = { token: signedToken, key: key }

  return authObj
};
