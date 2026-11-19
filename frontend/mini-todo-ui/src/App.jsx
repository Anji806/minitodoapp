import { useState, useEffect } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { getAllTodos, createTodo, toggleTodo, deleteTodo, updateTodo } from './services/todoService';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTodos = async () => {
    try {
      setError(null);
      const data = await getAllTodos();
      setTodos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleAdd = async (title) => {
    try {
      setError(null);
      await createTodo(title);
      await loadTodos();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleToggle = async (id) => {
    try {
      setError(null);
      await toggleTodo(id);
      await loadTodos();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      setError(null);
      await deleteTodo(id);
      await loadTodos();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = async (id, newTitle) => {
    try {
      setError(null);
      const todo = todos.find((t) => t.id === id);
      await updateTodo(id, newTitle, todo.isCompleted);
      await loadTodos();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">📝 Mini Todo App</h1>
      <TodoForm onAdd={handleAdd} />
      {error && (
        <div className="error-banner">
          ⚠️ {error}
        </div>
      )}
      {loading ? (
        <p className="loading-message">Loading todos...</p>
      ) : (
        <TodoList
          todos={todos}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
}

export default App;
