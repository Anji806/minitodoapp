import { useState } from 'react';

function TodoForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) {
      setError('Please enter a todo title.');
      return;
    }
    setError('');
    await onAdd(trimmed);
    setTitle('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="todo-form-row">
        <input
          type="text"
          className="todo-input"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError('');
          }}
        />
        <button type="submit" className="btn btn-primary">Add</button>
      </div>
      {error && <p className="form-error">{error}</p>}
    </form>
  );
}

export default TodoForm;
