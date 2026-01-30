import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { findUserByEmail, findRolesByUserId } from "../models/user.model";

interface LoginResult {
  token: string;
}

export const loginService = async (
  email: string,
  password: string
): Promise<LoginResult> => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("Credenciales inválidas");
  }

  const passwordOk = await bcrypt.compare(password, user.password);

  if (!passwordOk) {
    throw new Error("Credenciales inválidas");
  }

  const roles = await findRolesByUserId(user.id_user);

  // 🔒 Validación explícita de variables de entorno
  const jwtSecret = process.env.JWT_SECRET;
  const jwtExpiresIn = process.env.JWT_EXPIRES_IN;

  if (!jwtSecret || !jwtExpiresIn) {
    throw new Error("JWT no configurado correctamente");
  }

  const payload = {
    id_user: user.id_user,
    email: user.email,
    roles,
  };

  const token = jwt.sign(payload, jwtSecret, {
    expiresIn: jwtExpiresIn as jwt.SignOptions["expiresIn"],
  });

  return { token };
};
