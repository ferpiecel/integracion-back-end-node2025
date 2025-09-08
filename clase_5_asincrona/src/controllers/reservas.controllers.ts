import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient();

// CRUD
export const getReservas = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const reservas = await prisma.reserva.findMany();

  res.json(reservas);
};

export const crearReserva = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, fecha } = req.body;
  try {
    const nuevaReserva = await prisma.reserva.create({
      data: {
        userId,
        fecha,
      },
    });

    res.json(nuevaReserva);
  } catch (error) {
    next(error);
  }
};

export const actualizarReserva = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { userId, fecha } = req.body;

  try {
    const reservaActualizada = await prisma.reserva.update({
      where: { id: Number(id) },
      data: {
        fecha: fecha,
        userId: userId,
      },
    });
    res.json(reservaActualizada);
  } catch (error) {
    next(error);
  }
};

export const borrarReserva = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const borrarReserva = await prisma.reserva.delete({
      where: {
        id: Number(id),
      },
    });

    res.json(borrarReserva);
  } catch (error) {
    next(error);
  }
};
