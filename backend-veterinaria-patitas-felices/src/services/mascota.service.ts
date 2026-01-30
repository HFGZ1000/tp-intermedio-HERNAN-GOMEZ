import * as model from "../models/mascota.model";

export const listMascotas = async () => {
  return model.getAllMascotas();
};

export const getMascota = async (id: number) => {
  const mascota = await model.getMascotaById(id);
  if (!mascota) {
    throw new Error("Mascota no encontrada");
  }
  return mascota;
};

export const addMascota = async (data: any) => {
  return model.createMascota(data);
};

export const editMascota = async (id: number, data: any) => {
  const ok = await model.updateMascota(id, data);
  if (!ok) {
    throw new Error("Mascota no encontrada");
  }
};

export const removeMascota = async (id: number) => {
  const ok = await model.deleteMascota(id);
  if (!ok) {
    throw new Error("Mascota no encontrada");
  }
};
