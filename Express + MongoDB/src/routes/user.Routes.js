import { Router } from "express";
import { create } from "../controllers/user.controllers.js";
import { userValidations } from "../validators/userValidations.js";
import { validateFields } from "../validators/validateFields.js";
const router = Router()

router.post("/user",[userValidations.email, userValidations.password],validateFields, create)
export default router