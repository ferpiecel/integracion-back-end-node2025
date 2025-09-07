import express from "express";
import { logger } from "./middlewares/logger";
import userRoutes from "./routes/user.routes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
const PORT = 3000;

// Middleware para acceder al contenido del body en Express
app.use(express.json());

app.use(logger);

app.use("/api", userRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
