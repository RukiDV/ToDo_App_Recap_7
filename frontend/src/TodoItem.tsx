import { useState } from "react";

import { deleteTodo, refreshTodos, updateTodo } from "./api";
import { CheckIcon, CloseIcon, PencilIcon, TrashIcon } from "./Icons";
import type { Todo } from "./types";

type TodoItemProps = {
  todo: Todo;
};

export default function TodoItem({ todo }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.title);
  const [error, setError] = useState("");

  async function handleToggle() {
    setError("");
    try {
      await updateTodo(todo.id, { title: todo.title, done: !todo.done });
      await refreshTodos();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  function handleCancel() {
    setDraft(todo.title);
    setError("");
    setIsEditing(false);
  }

  async function handleSave() {
    setError("");
    try {
      await updateTodo(todo.id, { title: draft, done: todo.done });
      await refreshTodos();
      // Only reached when the save worked. After a failure the field stays open.
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  async function handleDelete() {
    setError("");
    try {
      await deleteTodo(todo.id);
      await refreshTodos();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <li className="todo-item">
      {isEditing ? (
        <>
          <input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            aria-label="Edit title"
          />
          <button
            type="button"
            className="icon-button"
            aria-label="Save todo"
            title="Save"
            onClick={handleSave}
            disabled={draft.trim() === ""}
          >
            <CheckIcon />
          </button>
          <button
            type="button"
            className="icon-button"
            aria-label="Cancel editing"
            title="Cancel"
            onClick={handleCancel}
          >
            <CloseIcon />
          </button>
        </>
      ) : (
        <>
          <label className={`todo-title ${todo.done ? "done" : ""}`}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={handleToggle}
            />
            {todo.title}
          </label>
          <button
            type="button"
            className="icon-button"
            aria-label="Edit todo"
            title="Edit"
            onClick={() => setIsEditing(true)}
          >
            <PencilIcon />
          </button>
          <button
            type="button"
            className="icon-button danger"
            aria-label="Delete todo"
            title="Delete"
            onClick={handleDelete}
          >
            <TrashIcon />
          </button>
        </>
      )}
      {error && <p role="alert">{error}</p>}
    </li>
  );
}
