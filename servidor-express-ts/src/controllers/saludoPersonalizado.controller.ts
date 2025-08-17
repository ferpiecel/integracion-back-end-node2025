import { Request, Response } from "express";

export const saludoPersonalizado = (req: Request, res: Response) => {
  const { nombre } = req.body ?? {};

  if (!nombre || typeof nombre !== "string") {
    return res.status(400).json({ error: "El campo 'nombre' es requerido" });
  }

  return res.json({
    mensaje: `${getSaludoPersonalizado()}, ${nombre}. ¡Bienvenido/a a nuestra API!`,
  });
};

function getSaludoPersonalizado() {
  // Captura de la fecha/hora actual del sistema en la zona horaria local
  const fechaActual = new Date();
  console.log("Fecha y hora actual:", fechaActual.toLocaleTimeString());

  // Extracción de la hora en formato 24h (0-23)
  // getHours() devuelve la hora local del sistema, no UTC
  const hora = fechaActual.getHours();

  // 5:00-11:59 -> Mañana | 12:00-18:59 -> Tarde | 19:00-4:59 -> Noche
  if (hora >= 5 && hora < 12) {
    return "Buenos días";
  } else if (hora >= 12 && hora < 19) {
    return "Buenas tardes";
  } else {
    return "Buenas noches";
  }
}
