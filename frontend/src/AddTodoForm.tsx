import { useState } from "react";
import type { SubmitEvent } from "react";

import { createTodo, refreshTodos } from "./api";

export default function AddTodoForm() {
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      await createTodo(title);
      setTitle("");
      await refreshTodos();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <form className="todo-form" onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="What do you have to do?"
          aria-label="New todo"
        />
        <button type="submit" disabled={title.trim() === "" || isSubmitting}>
          {isSubmitting ? "Adding..." : "Add"}
        </button>
      </form>
      {error && <p role="alert">{error}</p>}
    </>
  );
}
