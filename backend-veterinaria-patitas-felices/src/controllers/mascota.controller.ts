import { Request, Response, NextFunction } from "express";
import * as service from "../services/mascota.service";

export const getAll = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await service.listMascotas();
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const data = await service.getMascota(id);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = await service.addMascota(req.body);
    res.status(201).json({ id_mascota: id });
  } catch (error) {
    next(error);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    await service.editMascota(id, req.body);
    res.json({ message: "Mascota actualizada" });
  } catch (error) {
    next(error);
  }
};

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    await service.removeMascota(id);
    res.json({ message: "Mascota eliminada" });
  } catch (error) {
    next(error);
  }
};
