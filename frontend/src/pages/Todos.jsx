import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/todos";

function Todos() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    fetchTodos();
  }, []);

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

  return (
    <div>
      <h1>TODO APP</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="add todo"
      />

      <button onClick={addTodo}>Add</button>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        todos.map((todo) => (
          <div key={todo.id}>
            <p>{todo.title}</p>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}

export default Todos;