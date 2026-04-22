import * as todoService from "../services/todo.service.js";

export const getAllTodos = async (req, res, next) => {
  try {
    const todos = await todoService.getTodos();
    res.json(todos);
  } catch (error) {
    next(error);
  }
};

export const createTodo = async (req, res, next) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title required" });
    }

    await todoService.createTodo(title);
    res.status(201).json({ message: "Created" });
  } catch (error) {
    next(error);
  }
};

export const deleteTodo = async (req, res, next) => {
  try {
    await todoService.deleteTodoById(req.params.id);
    res.json({ message: "Deleted" });
  } catch (error) {
    next(error);
  }
};

export const deleteAllTodos = async (req, res, next) => {
  try {
    await todoService.deleteAllTodos();
    res.json({ message: "All deleted" });
  } catch (error) {
    next(error);
  }
};

export const completeTodo = async (req, res, next) => {
  try {
    await todoService.markTodoCompleted(req.params.id);
    res.json({ message: "Completed" });
  } catch (error) {
    next(error);
  }
};