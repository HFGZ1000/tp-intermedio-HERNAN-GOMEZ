import pool from "../config/db";
import bcrypt from "bcrypt";

export const registerService = async (email: string, password: string) => {
  if (!email.includes("@")) {
    const error: any = new Error("Email inválido");
    error.status = 400;
    throw error;
  }

  if (password.length < 4) {
    const error: any = new Error("Password demasiado corto");
    error.status = 400;
    throw error;
  }

  const [existing]: any = await pool.query(
    "SELECT id_user FROM users WHERE email = ?",
    [email]
  );

  if (existing.length) {
    const error: any = new Error("El email ya está registrado");
    error.status = 400;
    throw error;
  }

  const hash = await bcrypt.hash(password, 10);

  const [result]: any = await pool.query(
    "INSERT INTO users (email, password, activo) VALUES (?, ?, 1)",
    [email, hash]
  );

  const id_user = result.insertId;

  await pool.query("INSERT INTO user_roles (id_user, id_role) VALUES (?, 1)", [
    id_user,
  ]);

  return { message: "Usuario registrado correctamente" };
};
