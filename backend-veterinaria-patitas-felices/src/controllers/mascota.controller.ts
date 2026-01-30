import { Request, Response } from "express";
import * as service from "../services/mascota.service";

export const getAll = async (_req: Request, res: Response) => {
  const data = await service.listMascotas();
  res.json(data);
};

export const getById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = await service.getMascota(id);
    res.json(data);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const create = async (req: Request, res: Response) => {
  const id = await service.addMascota(req.body);
  res.status(201).json({ id_mascota: id });
};

export const update = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await service.editMascota(id, req.body);
    res.json({ message: "Mascota actualizada" });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await service.removeMascota(id);
    res.json({ message: "Mascota eliminada" });
  } catch (error: any) {
    if (error.message.includes("foreign key constraint")) {
      return res.status(409).json({
        message:
          "No se puede eliminar la mascota porque tiene historial clínico",
      });
    }
    res.status(404).json({ message: error.message });
  }
};
