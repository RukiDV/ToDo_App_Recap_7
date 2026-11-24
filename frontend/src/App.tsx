import useSWR from "swr";
import { useState } from "react";

import AddTodoForm from "./AddTodoForm";
import { fetcher } from "./api";
import TodoItem from "./TodoItem";
import type { Todo } from "./types";

type Filter = "all" | "open" | "done";

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "open", label: "Open" },
  { value: "done", label: "Done" },
];

export default function App() {
  const [filter, setFilter] = useState<Filter>("all");
  const key = filter === "all" ? "/todos" : `/todos?done=${filter === "done"}`;
  const {
    data: todos,
    isLoading,
    error,
    mutate,
  } = useSWR<Todo[]>(key, fetcher);

  return (
    <main>
      <h1>Todos</h1>
      <AddTodoForm />
      {/* filter the todos */}
      <div className="filter-buttons">
        {filters.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            aria-pressed={filter === value}
            onClick={() => setFilter(value)}
          >
            {label}
          </button>
        ))}
      </div>
      {isLoading && <p>Loading todos...</p>}
      {error && (
        <div>
          <p role="alert">Could not load the todos. Is the backend running?</p>
          <button type="button" onClick={() => mutate()}>
            Try again
          </button>
        </div>
      )}
      {!error && todos && todos.length === 0 && (
        <p>No todos yet. Add your first todo above.</p>
      )}
      {!error && todos && todos.length > 0 && (
        <ul className="todo-list">
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      )}
    </main>
  );
}
