import db from "../config/db.config.js";

export const getTodos = async () => {
  const [rows] = await db.query("SELECT * FROM todos");
  return rows;
};

export const createTodo = async (title) => {
  const [rows] = await db.query(
    "INSERT INTO todos (title) VALUES (?)",
    [title]
  );
  return rows;
};

export const deleteTodoById = async (id) => {
  const [rows] = await db.query(
    "DELETE FROM todos WHERE id = ?",
    [id]
  );
  return rows;
};

export const deleteAllTodos = async () => {
  const [rows] = await db.query("DELETE FROM todos");
  return rows;
};

export const markTodoCompleted = async (id) => {
  const [rows] = await db.query(
    "UPDATE todos SET completed = true WHERE id = ?",
    [id]
  );
  return rows;
};