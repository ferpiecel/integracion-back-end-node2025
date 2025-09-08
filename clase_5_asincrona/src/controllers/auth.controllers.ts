import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../errors/httpErrors";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET!;

const prisma = new PrismaClient();

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body ?? {};

  // Validación de campos requeridos
  const missing: string[] = [];
  if (!email || String(email).trim() === "") missing.push("email");
  if (!password || String(password).trim() === "") missing.push("password");
  if (missing.length > 0) {
    const msg =
      missing.length === 1
        ? `El campo '${missing[0]}' es requerido`
        : `Los campos siguientes son requeridos: ${missing.join(", ")}`;
    throw new BadRequestError(msg);
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.password) {
      return res.status(401).json({ error: "Credenciales invalidas" });
    }

    const verificarPassword = await bcrypt.compare(password, user.password);

    if (!verificarPassword) {
      return res.status(401).json({ error: "Credenciales invalidas" });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({ message: "Login exitoso", token, userId: user.id });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
