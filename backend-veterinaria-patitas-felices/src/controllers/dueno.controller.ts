import { Request, Response, NextFunction } from "express";
import * as service from "../services/dueno.service";

export const getAll = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await service.listDuenos();
    res.json(data);
  } catch (error) {
    next(error);
  }
};
