import * as bcrypt from "bcrypt";
import { createUser, assignUserRole, emailExists } from "../models/auth.model";

export const registerService = async (email: string, password: string) => {
  const exists = await emailExists(email);
  if (exists) {
    throw new Error("El email ya está registrado");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const userId = await createUser(email, passwordHash);
  await assignUserRole(userId);

  return { message: "Usuario registrado correctamente" };
};
