import pool from "../config/db";

export interface UserDB {
  id_user: number;
  email: string;
  password: string;
  activo: number;
}

export const findUserByEmail = async (
  email: string
): Promise<UserDB | null> => {
  const [rows]: any = await pool.query(
    "SELECT id_user, email, password, activo FROM users WHERE email = ? AND activo = 1 LIMIT 1",
    [email]
  );

  return rows.length ? rows[0] : null;
};

export const findRolesByUserId = async (idUser: number): Promise<string[]> => {
  const [rows]: any = await pool.query(
    `SELECT r.nombre
     FROM roles r
     INNER JOIN user_roles ur ON ur.id_role = r.id_role
     WHERE ur.id_user = ?`,
    [idUser]
  );

  return rows.map((r: any) => r.nombre);
};
