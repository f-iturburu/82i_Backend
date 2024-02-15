import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 4000;
export const CONNECTION_STRING = process.env.CONNECTION_STRING;
export const SECRET = process.env.SECRET
export const ADMIN_KEY = process.env.ADMIN_KEY
export const USER_KEY = process.env.USER_KEY