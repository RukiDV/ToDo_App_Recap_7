import { useState } from "react";
import type { SubmitEvent } from "react";
import { mutate } from "swr";

import { createTodo } from "./api";

export default function AddTodoForm() {
  const [title, setTitle] = useState("");

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    await createTodo(title);
    setTitle("");
    // key must be the same as in useSWR
    await mutate("/todos");
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="What do you have to do?"
        aria-label="New todo"
      />
      <button type="submit" disabled={title.trim() === ""}>
        Add
      </button>
    </form>
  );
}
