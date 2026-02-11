import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { findUserByEmail, findRolesByUserId } from "../models/user.model";
import { LoginResponseDTO } from "../types/auth.dto";

export const loginService = async (
  email: string,
  password: string
): Promise<LoginResponseDTO> => {
  if (!email.includes("@")) {
    const error: any = new Error("Email inválido");
    error.status = 400;
    throw error;
  }

  const user = await findUserByEmail(email);

  if (!user) {
    const error: any = new Error("Credenciales inválidas");
    error.status = 401;
    throw error;
  }

  const passwordOk = await bcrypt.compare(password, user.password);

  if (!passwordOk) {
    const error: any = new Error("Credenciales inválidas");
    error.status = 401;
    throw error;
  }

  const roles = await findRolesByUserId(user.id_user);

  const jwtSecret = process.env.JWT_SECRET;
  const jwtExpiresIn = process.env.JWT_EXPIRES_IN;

  if (!jwtSecret || !jwtExpiresIn) {
    const error: any = new Error("JWT no configurado correctamente");
    error.status = 500;
    throw error;
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
