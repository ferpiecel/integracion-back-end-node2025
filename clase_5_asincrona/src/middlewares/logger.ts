import { Request, Response, NextFunction } from "express";

export const logger = (req: Request, res: Response, next: NextFunction) => {
  const localDateTime = new Date().toLocaleString("es-PY", {
    timeZone: "America/Asuncion",
  });
  // Agregar el status de la petición al logger
  console.log(
    `${localDateTime} - logger.ts - ${res.statusCode} - ${req.method} - ${req.url}`
  );
  next();
};
