import express from "express";
import { logger } from "./middleware/logger";

import saludoRoutes from "./routes/saludo.route";
import saludoPersonalizadoRoutes from "./routes/saludoPersonalizado.route";

const app = express();
const PORT = 3000;

// Middleware para acceder al contenido del body en Express
app.use(express.json());

app.use(logger);

app.use("/api", saludoRoutes);
app.use("/api", saludoPersonalizadoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
