import pool from "../config/db";

export const createUser = async (email: string, passwordHash: string) => {
  const [result]: any = await pool.query(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, passwordHash]
  );
  return result.insertId as number;
};

export const assignUserRole = async (idUser: number) => {
  await pool.query(
    `INSERT INTO user_roles (id_user, id_role)
     SELECT ?, r.id_role FROM roles r WHERE r.nombre = 'user'`,
    [idUser]
  );
};

export const emailExists = async (email: string): Promise<boolean> => {
  const [rows]: any = await pool.query(
    "SELECT 1 FROM users WHERE email = ? LIMIT 1",
    [email]
  );
  return rows.length > 0;
};
