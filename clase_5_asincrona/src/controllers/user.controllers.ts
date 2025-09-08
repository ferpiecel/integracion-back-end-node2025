import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient();

// Obtener lista de usuarios
export const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

// Crear usuarios
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashPassword },
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// Actualizar usuarios
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { name, email },
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// Eliminar usuarios
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({ where: { id: Number(id) } });
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    next(error);
  }
};

// filtrado
export const filterUser = async (req: Request, res: Response) => {
  const { nombre } = req.params;

  const listadoUser = await prisma.user.findMany({
    where: {
      name: {
        contains: nombre,
      },
    },
  });
  res.json(listadoUser);
};

// Ordenar usuarios
export const ordenUser = async (req: Request, res: Response) => {
  const listadoUserOrdenado = await prisma.user.findMany({
    orderBy: {
      name: "desc",
    },
  });

  res.json(listadoUserOrdenado);
};

// paginacion
export const paginacionUser = async (req: Request, res: Response) => {
  const listapaginada = await prisma.user.findMany({
    skip: 2,
    take: 3,
  });

  res.json(listapaginada);
};
