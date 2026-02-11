import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: {
    id_user: number;
    email: string;
    roles: string[];
  };
}

export const authenticateJWT = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      const error: any = new Error("Token requerido");
      error.status = 401;
      throw error;
    }

    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      const error: any = new Error("Formato de token inválido");
      error.status = 401;
      throw error;
    }

    const token = parts[1];
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      const error: any = new Error("JWT no configurado");
      error.status = 500;
      throw error;
    }

    const decoded = jwt.verify(token, jwtSecret) as {
      id_user: number;
      email: string;
      roles: string[];
    };

    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};
