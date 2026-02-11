import { Router } from "express";
import { body } from "express-validator";
import { validateFields } from "../middlewares/validate.middleware";
import { login, register } from "../controllers/auth.controller";

const router = Router();

router.post("/login", login);

router.post(
  "/register",
  [
    body("email")
      .notEmpty()
      .withMessage("El email es obligatorio")
      .isEmail()
      .withMessage("Debe ser un email válido"),

    body("password")
      .notEmpty()
      .withMessage("La contraseña es obligatoria")
      .isLength({ min: 6 })
      .withMessage("La contraseña debe tener al menos 6 caracteres"),

    validateFields,
  ],
  register
);

export default router;
