import express, { Application, Request, Response, NextFunction } from "express";
import authRoutes from "./routes/auth.routes";
import mascotaRoutes from "./routes/mascota.routes";
import duenoRoutes from "./routes/dueno.routes"; // ← NUEVO
import pool from "./config/db";
import cors from "cors";

/* middleware global de errores */
import { errorHandler } from "./middlewares/error.middleware";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.get("/health", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [rows] = await pool.query("SELECT 1 AS ok");
    res.json({ status: "OK", db: rows });
  } catch (error) {
    next(error);
  }
});

/* rutas */
app.use("/auth", authRoutes);
app.use("/mascotas", mascotaRoutes);
app.use("/duenos", duenoRoutes); // ← NUEVO

/* middleware global (SIEMPRE AL FINAL) */
app.use(errorHandler);

export default app;
