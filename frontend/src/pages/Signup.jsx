import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    <div>
      <h2>Register</h2>
      {error && <p style={{color: "red"}}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input 
          placeholder="name" 
          value={form.name}
          onChange={e => setForm({...form, name: e.target.value})}
        />
        <input 
          placeholder="email" 
          value={form.email}
          onChange={e => setForm({...form, email: e.target.value})}
        />
        <input 
          type="password" 
          placeholder="password"
          value={form.password}
          onChange={e => setForm({...form, password: e.target.value})}
        />
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
}
