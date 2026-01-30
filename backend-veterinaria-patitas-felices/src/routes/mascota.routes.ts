import { Router } from "express";
import * as controller from "../controllers/mascota.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { requireRole } from "../middlewares/role.middleware";

const router = Router();

router.get(
  "/",
  authenticateJWT,
  requireRole(["user", "admin"]),
  controller.getAll // Eliminar authentication para acceso público y remover requireRole
);

router.get(
  "/:id",
  authenticateJWT,
  requireRole(["user", "admin"]),
  controller.getById // Eliminar authentication para acceso público y remover requireRole
);

router.post("/", authenticateJWT, requireRole(["admin"]), controller.create);

router.put("/:id", authenticateJWT, requireRole(["admin"]), controller.update);

router.delete(
  "/:id",
  authenticateJWT,
  requireRole(["admin"]),
  controller.remove
);

export default router;
