import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../index.css";

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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h1>📝 Todo App</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      <div className="add-todo-form">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="What needs to be done?"
          className="add-todo-input"
        />
        <button onClick={addTodo} className="add-todo-btn">
          Add Todo
        </button>
      </div>

      {isLoading ? (
        <p className="loading-text">Loading your todos...</p>
      ) : todos.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📋</div>
          <p className="empty-state-text">No todos yet! Add your first one above.</p>
        </div>
      ) : (
        <div className="todo-list">
          {todos.map((todo) => (
            <div 
              key={todo.id} 
              className={`todo-item ${todo.completed === 1 ? 'completed' : ''}`}
            >
              <input
                type="checkbox"
                checked={todo.completed === 1}
                onChange={() => completeTodo(todo.id)}
                className="todo-checkbox"
              />
              
              {editingId === todo.id ? (
                <>
                  <input
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    className="todo-edit-input"
                    autoFocus
                  />
                  <div className="todo-actions">
                    <button onClick={() => updateTodo(todo.id)} className="btn-save">
                      Save
                    </button>
                    <button onClick={cancelEdit} className="btn-cancel">
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <span className="todo-title">{todo.title}</span>
                  <div className="todo-actions">
                    <button onClick={() => startEditTodo(todo)} className="btn-update">
                      Edit
                    </button>
                    <button onClick={() => deleteTodo(todo.id)} className="btn-delete">
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Todos;