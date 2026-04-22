import db from "../config/db.config.js";
import bcrypt from "bcrypt";

export const registerUser = async (name, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const [rows] = await db.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hashedPassword]
  );

  return rows;
};

export const findUserByEmail = async (email) => {
  const [rows] = await db.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );
  return rows[0];
};