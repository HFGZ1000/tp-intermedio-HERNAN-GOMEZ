import * as model from "../models/mascota.model";
import { MascotaDTO } from "../types/mascota.dto";

export const listMascotas = async () => {
  return model.getAllMascotas();
};

export const getMascota = async (id: number) => {
  const mascota = await model.getMascotaById(id);
  if (!mascota) {
    const error: any = new Error("Mascota no encontrada");
    error.status = 404;
    throw error;
  }
  return mascota;
};

export const addMascota = async (data: MascotaDTO) => {
  return model.createMascota(data);
};

export const editMascota = async (id: number, data: MascotaDTO) => {
  const ok = await model.updateMascota(id, data);
  if (!ok) {
    const error: any = new Error("Mascota no encontrada");
    error.status = 404;
    throw error;
  }
};

export const removeMascota = async (id: number) => {
  const ok = await model.deleteMascota(id);
  if (!ok) {
    const error: any = new Error("Mascota no encontrada");
    error.status = 404;
    throw error;
  }
};
