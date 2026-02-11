import { Router } from "express";
import { getAll } from "../controllers/dueno.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { requireRole } from "../middlewares/role.middleware";

const router = Router();

router.get("/", authenticateJWT, requireRole(["user", "admin"]), getAll);

export default router;
