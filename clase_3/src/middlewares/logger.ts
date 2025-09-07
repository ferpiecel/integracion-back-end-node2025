import { Request, Response, NextFunction } from "express";

export const logger = (req: Request, res: Response, next: NextFunction) => {
  const localDateTime = new Date().toLocaleString("es-PY", {
    timeZone: "America/Asuncion",
  });
  console.log(`${localDateTime} - logger.ts - ${req.method} - ${req.url}`);
  next();
};
