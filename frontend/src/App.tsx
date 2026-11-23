import useSWR from "swr";

import AddTodoForm from "./AddTodoForm";
import { fetcher } from "./api";
import TodoItem from "./TodoItem";
import type { Todo } from "./types";

export default function App() {
  const {
    data: todos,
    isLoading,
    error,
    mutate,
  } = useSWR<Todo[]>("/todos", fetcher);

  return (
    <main>
      <h1>Todos</h1>
      <AddTodoForm />
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
        <p>No todos yet. Nothing to do!</p>
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
