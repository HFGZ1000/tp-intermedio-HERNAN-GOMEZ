import { Request, Response, NextFunction } from "express";
import { loginService } from "../services/auth.service";
import { registerService } from "../services/register.service";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Email y password requeridos");
    }

    const result = await loginService(email, password);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Email y password requeridos");
    }

    const result = await registerService(email, password);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
