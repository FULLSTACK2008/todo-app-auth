import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todo.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/todos", todoRoutes);
app.use("/api/auth", authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error occurred:", err.message);
  console.error("Stack trace:", err.stack);
  
  // Log the error for debugging
  if (err.code === 'ECONNREFUSED' || err.code === 'ENOTFOUND') {
    return res.status(500).json({ 
      message: "Database connection error", 
      error: err.message 
    });
  }
  
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ 
      message: "Invalid token", 
      error: err.message 
    });
  }
  
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ 
      message: "Token expired", 
      error: err.message 
    });
  }
  
  // Default error response
  res.status(err.status || 500).json({ 
    message: err.message || "Internal server error",
    error: process.env.NODE_ENV === 'development' ? err.stack : {}
  });
});

export default app;
