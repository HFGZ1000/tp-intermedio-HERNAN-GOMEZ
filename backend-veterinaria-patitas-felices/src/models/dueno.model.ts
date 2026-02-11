import pool from "../config/db";

export interface Dueno {
  id_dueno: number;
  nombre: string;
  apellido: string;
}

export const getAllDuenos = async (): Promise<Dueno[]> => {
  const [rows]: any = await pool.query(
    `
    SELECT
      id_dueno,
      nombre,
      apellido
    FROM duenos
    ORDER BY apellido, nombre
    `
  );
  return rows;
};
