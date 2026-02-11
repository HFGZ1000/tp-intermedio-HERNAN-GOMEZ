import pool from "../config/db";

export interface Mascota {
  id_mascota: number;
  nombre: string;
  especie: string;
  fecha_nacimiento: string; // YYYY-MM-DD
  id_dueno: number;
}

/**
 * SOLO PARA LECTURA (GET /mascotas)
 */
export interface MascotaConDueno extends Mascota {
  dueno_nombre: string;
  dueno_apellido: string;
}

export const getAllMascotas = async (): Promise<MascotaConDueno[]> => {
  const [rows]: any = await pool.query(
    `
    SELECT
      m.id_mascota,
      m.nombre,
      m.especie,
      m.fecha_nacimiento,
      m.id_dueno,
      d.nombre   AS dueno_nombre,
      d.apellido AS dueno_apellido
    FROM mascotas m
    INNER JOIN duenos d ON d.id_dueno = m.id_dueno
    ORDER BY m.id_mascota
    `
  );
  return rows;
};

export const getMascotaById = async (id: number): Promise<Mascota | null> => {
  const [rows]: any = await pool.query(
    `
    SELECT
      id_mascota,
      nombre,
      especie,
      fecha_nacimiento,
      id_dueno
    FROM mascotas
    WHERE id_mascota = ?
    `,
    [id]
  );
  return rows.length ? rows[0] : null;
};

export const createMascota = async (
  data: Omit<Mascota, "id_mascota">
): Promise<number> => {
  const [result]: any = await pool.query(
    `
    INSERT INTO mascotas (nombre, especie, fecha_nacimiento, id_dueno)
    VALUES (?, ?, ?, ?)
    `,
    [data.nombre, data.especie, data.fecha_nacimiento, data.id_dueno]
  );
  return result.insertId as number;
};

export const updateMascota = async (
  id: number,
  data: Omit<Mascota, "id_mascota">
): Promise<boolean> => {
  const [result]: any = await pool.query(
    `
    UPDATE mascotas
    SET nombre = ?, especie = ?, fecha_nacimiento = ?, id_dueno = ?
    WHERE id_mascota = ?
    `,
    [data.nombre, data.especie, data.fecha_nacimiento, data.id_dueno, id]
  );
  return result.affectedRows > 0;
};

export const deleteMascota = async (id: number): Promise<boolean> => {
  const [result]: any = await pool.query(
    "DELETE FROM mascotas WHERE id_mascota = ?",
    [id]
  );
  return result.affectedRows > 0;
};
