import express from "express";
import {
  getAllTodos,
  createTodo,
  deleteTodo,
  deleteAllTodos,
  completeTodo,
  updateTodo,
} from "../controller/todo.controller.js";

import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", verifyToken, getAllTodos);
router.post("/", verifyToken, createTodo);
router.put("/:id", verifyToken, updateTodo);
router.delete("/:id", verifyToken, deleteTodo);
router.delete("/", verifyToken, deleteAllTodos);
router.put("/:id/complete", verifyToken, completeTodo);

export default router;