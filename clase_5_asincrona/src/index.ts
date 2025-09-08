import cors from "cors";
import express from "express";
import path from "path";
import { errorHandler } from "./middlewares/errorHandler";
import { logger } from "./middlewares/logger";
import loginRoutes from "./routes/login.routes";
import reservasRoutes from "./routes/reservas.routes";
import userRoutes from "./routes/user.routes";

const app = express();

app.use(express.json());
app.use(logger);

// CORS con Authorization y preflight
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 204,
  })
);

// Servir frontend estático (mismo origen http://localhost:3000)
const staticDir = path.resolve(__dirname, "../frontend");
app.use(express.static(staticDir));

// Accesos directos útiles
app.get(["/", "/reserva"], (_req, res) =>
  res.sendFile(path.join(staticDir, "reserva.html"))
);

app.use("/api", loginRoutes);
app.use("/api", userRoutes);
app.use("/api", reservasRoutes);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Servidor de NODEJS escuchando en el puerto 3000");
});
