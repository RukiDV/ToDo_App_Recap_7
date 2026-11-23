import { mutate } from "swr";
import { useState } from "react";

import { updateTodo } from "./api";
import type { Todo } from "./types";

type TodoItemProps = {
  todo: Todo;
};

export default function TodoItem( { todo }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.title);

  async function handleToggle() {
    await updateTodo(todo.id, { title: todo.title, done: !todo.done });
    await mutate("/todos");
  }

  return (
     <li className="todo-item">
      <label className={`todo-title ${todo.done ? "done" : ""}`}>
        <input type="checkbox" checked={todo.done} onChange={handleToggle} />
        {todo.title}
      </label>
      <button type="button" onClick={() => setIsEditing(true)}>
        Edit
      </button>
    </li>
  );
}