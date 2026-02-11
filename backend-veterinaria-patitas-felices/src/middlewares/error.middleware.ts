import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("GLOBAL ERROR:", err);

  /* ---------- errores con status manual ---------- */
  if (err.status) {
    return res.status(err.status).json({
      status: "error",
      message: err.message,
    });
  }

  /* ---------- MySQL FK ---------- */
  if (err.code === "ER_NO_REFERENCED_ROW_2") {
    return res.status(400).json({
      status: "error",
      message: "Referencia inválida en la base de datos",
    });
  }

  /* ---------- MySQL duplicados ---------- */
  if (err.code === "ER_DUP_ENTRY") {
    return res.status(400).json({
      status: "error",
      message: "El registro ya existe",
    });
  }

  /* ---------- JWT ---------- */
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      status: "error",
      message: "Token inválido",
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      status: "error",
      message: "Token expirado",
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Error interno del servidor",
  });
};
