import { Router } from "express";
import {
  createUser,
  deleteUser,
  filterUser,
  getUsers,
  ordenUser,
  paginacionUser,
  updateUser,
  getUserById,
} from "../controllers/user.controllers";
import { verifyToken } from "../middlewares/auth";

const router = Router();

router.get("/users", verifyToken, getUsers);
router.put("/users/:id", verifyToken, updateUser);
router.post("/users", verifyToken, createUser);
router.put("/users/:id", verifyToken, updateUser);
router.delete("/users/:id", verifyToken, deleteUser);
router.get("/users/filter/:nombre", verifyToken, filterUser);
router.get("/users/order", verifyToken, ordenUser);
router.get("/users/page", verifyToken, paginacionUser);
router.get("/users/:id", verifyToken, getUserById);

export default router;
