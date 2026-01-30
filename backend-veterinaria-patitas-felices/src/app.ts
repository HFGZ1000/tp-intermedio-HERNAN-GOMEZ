import express, { Application, Request, Response } from "express";
import authRoutes from "./routes/auth.routes";

import pool from "./config/db";
import mascotaRoutes from "./routes/mascota.routes";

const app: Application = express();

app.use(express.json());

app.get("/health", async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query("SELECT 1 AS ok");
    res.json({ status: "OK", db: rows });
  } catch (error: any) {
    res.status(500).json({ status: "ERROR", message: error.message });
  }
});

app.use("/auth", authRoutes);

app.use("/mascotas", mascotaRoutes);

export default app;
