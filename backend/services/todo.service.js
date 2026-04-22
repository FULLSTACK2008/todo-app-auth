import db from "../config/db.config.js";

export const getTodos = async (userId) => {
  const [rows] = await db.query("SELECT * FROM todos WHERE user_id = ?", [userId]);
  return rows;
};

export const createTodo = async (title, userId) => {
  const [rows] = await db.query(
    "INSERT INTO todos (title, user_id) VALUES (?, ?)",
    [title, userId]
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

export const updateTodo = async (id, title, userId) => {
  const [rows] = await db.query(
    "UPDATE todos SET title = ? WHERE id = ? AND user_id = ?",
    [title, id, userId]
  );
  return rows;
};
