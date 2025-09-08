import { Router } from "express";
import {
  actualizarReserva,
  borrarReserva,
  crearReserva,
  getReservasByUser,
  getReservas,
} from "../controllers/reservas.controllers";
import { verifyToken } from "../middlewares/auth";

const router = Router();

router.post("/reserva", verifyToken, crearReserva);
router.get("/reserva", verifyToken, getReservas);
router.put("/reserva/:id", verifyToken, actualizarReserva);
router.delete("/reserva/:id", verifyToken, borrarReserva);
router.get("/reserva/:id", verifyToken, getReservasByUser);

export default router;
