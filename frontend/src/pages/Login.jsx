import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    <div>
      <h2>Login</h2>
      {error && <p style={{color: "red"}}>{error}</p>}
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <a href="/signup">Register</a></p>
    </div>
  );
}
