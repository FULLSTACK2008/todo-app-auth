import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5000/api/todos";

function Todos() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const navigate = useNavigate();

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  };

  const fetchTodos = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get(API_URL, getAuthHeader());

      setTodos(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchTodos();
  }, [navigate]);

  const addTodo = async () => {
    if (!title) return;

    try {
      await axios.post(API_URL, { title }, getAuthHeader());

      setTitle("");
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, getAuthHeader());

      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const completeTodo = async (id) => {
    try {
      await axios.put(`${API_URL}/${id}/complete`, {}, getAuthHeader());
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const startEditTodo = (todo) => {
    setEditingId(todo.id);
    setEditingTitle(todo.title);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingTitle("");
  };

  const updateTodo = async (id) => {
    if (!editingTitle) return;

    try {
      await axios.put(`${API_URL}/${id}`, { title: editingTitle }, getAuthHeader());
      setEditingId(null);
      setEditingTitle("");
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>TODO APP</h1>
        <button onClick={handleLogout} style={{ backgroundColor: "#dc3545", color: "white", padding: "8px 16px", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          Logout
        </button>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="add todo"
          style={{ padding: "8px", marginRight: "8px" }}
        />

        <button onClick={addTodo} style={{ padding: "8px 16px" }}>Add</button>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        todos.map((todo) => (
          <div key={todo.id} style={{ 
            padding: "10px", 
            margin: "10px 0", 
            border: "1px solid #ddd", 
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}>
            <input
              type="checkbox"
              checked={todo.completed === 1}
              onChange={() => completeTodo(todo.id)}
              style={{ cursor: "pointer" }}
            />
            
            {editingId === todo.id ? (
              <>
                <input
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  style={{ flex: 1, padding: "4px" }}
                />
                <button onClick={() => updateTodo(todo.id)} style={{ padding: "4px 8px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                  Save
                </button>
                <button onClick={cancelEdit} style={{ padding: "4px 8px", backgroundColor: "#6c757d", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span style={{ 
                  flex: 1, 
                  textDecoration: todo.completed === 1 ? "line-through" : "none",
                  color: todo.completed === 1 ? "#6c757d" : "inherit"
                }}>
                  {todo.title}
                </span>
                <button onClick={() => startEditTodo(todo)} style={{ padding: "4px 8px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                  Update
                </button>
                <button onClick={() => deleteTodo(todo.id)} style={{ padding: "4px 8px", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                  Delete
                </button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Todos;