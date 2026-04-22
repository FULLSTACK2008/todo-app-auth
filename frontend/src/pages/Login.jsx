import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../index.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/todos");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">Sign in to continue to your account</p>
        
        {error && <div className="auth-error">{error}</div>}
        
        <form onSubmit={handleLogin} className="auth-form">
          <input 
            className="auth-input"
            placeholder="Enter your email" 
            value={form.email}
            onChange={e => setForm({...form, email: e.target.value})}
            type="email"
            required
          />
          <input 
            className="auth-input"
            type="password" 
            placeholder="Enter your password"
            value={form.password}
            onChange={e => setForm({...form, password: e.target.value})}
            required
          />
          <button type="submit" className="auth-btn">
            Sign In
          </button>
        </form>
        
        <div className="auth-footer">
          Don't have an account? <a href="/signup">Create one</a>
        </div>
      </div>
    </div>
  );
}