import { mutate } from "swr";
import { useState } from "react";

import { deleteTodo, updateTodo } from "./api";
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
      await mutate("/todos");
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
      await mutate("/todos");
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
      await mutate("/todos");
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
            onClick={handleSave}
            disabled={draft.trim() === ""}
          >
            Save
          </button>
          <button type="button" onClick={handleCancel}>
            Cancel
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
          <button type="button" onClick={() => setIsEditing(true)}>
            Edit
          </button>
          <button type="button" onClick={handleDelete}>
            Delete
          </button>
        </>
      )}
      {error && <p role="alert">{error}</p>}
    </li>
  );
}
