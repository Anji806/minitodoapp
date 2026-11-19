import { useState } from 'react';

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleSave = async () => {
    const trimmed = editTitle.trim();
    if (!trimmed) return;
    await onEdit(todo.id, trimmed);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') handleCancel();
  };

  return (
    <li className={`todo-item ${todo.isCompleted ? 'completed' : ''}`}>
      <input
        type="checkbox"
        className="todo-checkbox"
        checked={todo.isCompleted}
        onChange={() => onToggle(todo.id)}
      />

      {isEditing ? (
        <div className="todo-edit-row">
          <input
            type="text"
            className="todo-edit-input"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <button className="btn btn-success" onClick={handleSave}>Save</button>
          <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div className="todo-title-row">
          <span className="todo-title">{todo.title}</span>
          <div className="todo-actions">
            <button className="btn btn-secondary" onClick={() => setIsEditing(true)}>Edit</button>
            <button className="btn btn-danger" onClick={() => onDelete(todo.id)}>Delete</button>
          </div>
        </div>
      )}
    </li>
  );
}

export default TodoItem;
