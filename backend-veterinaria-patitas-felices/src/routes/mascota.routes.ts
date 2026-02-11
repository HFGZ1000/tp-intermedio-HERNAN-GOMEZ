import { Router } from "express";
import { body } from "express-validator";
import * as controller from "../controllers/mascota.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { requireRole } from "../middlewares/role.middleware";
import { validateFields } from "../middlewares/validate.middleware";

const router = Router();

router.get(
  "/",
  authenticateJWT,
  requireRole(["user", "admin"]),
  controller.getAll
);

router.get(
  "/:id",
  authenticateJWT,
  requireRole(["user", "admin"]),
  controller.getById
);

router.post(
  "/",
  authenticateJWT,
  requireRole(["admin"]),
  [
    body("nombre").notEmpty().withMessage("El nombre es obligatorio"),

    body("especie").notEmpty().withMessage("La especie es obligatoria"),

    body("fecha_nacimiento")
      .isISO8601()
      .withMessage("La fecha debe tener formato YYYY-MM-DD"),

    body("id_dueno").isInt().withMessage("El id_dueno debe ser numérico"),

    validateFields,
  ],
  controller.create
);

router.put(
  "/:id",
  authenticateJWT,
  requireRole(["admin"]),
  [
    body("nombre").notEmpty().withMessage("El nombre es obligatorio"),

    body("especie").notEmpty().withMessage("La especie es obligatoria"),

    body("fecha_nacimiento")
      .isISO8601()
      .withMessage("La fecha debe tener formato YYYY-MM-DD"),

    body("id_dueno").isInt().withMessage("El id_dueno debe ser numérico"),

    validateFields,
  ],
  controller.update
);

router.delete(
  "/:id",
  authenticateJWT,
  requireRole(["admin"]),
  controller.remove
);

export default router;
