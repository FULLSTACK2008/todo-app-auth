import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../index.css";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">Join us today and start managing your tasks</p>
        
        {error && <div className="auth-error">{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <input 
            className="auth-input"
            placeholder="Enter your full name" 
            value={form.name}
            onChange={e => setForm({...form, name: e.target.value})}
            required
          />
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
            placeholder="Create a strong password"
            value={form.password}
            onChange={e => setForm({...form, password: e.target.value})}
            minLength="6"
            required
          />
          <button type="submit" className="auth-btn">
            Create Account
          </button>
        </form>
        
        <div className="auth-footer">
          Already have an account? <a href="/login">Sign in</a>
        </div>
      </div>
    </div>
  );
}