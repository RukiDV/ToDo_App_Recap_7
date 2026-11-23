import useSWR, { mutate } from "swr";

import AddTodoForm from "./AddTodoForm";
import { fetcher, updateTodo } from "./api";
import type { Todo } from "./types";

export default function App() {
  const { data: todos, isLoading } = useSWR<Todo[]>("/todos", fetcher);

  async function handleToggle(todo: Todo) {
    await updateTodo(todo.id, { title: todo.title, done: !todo.done });
    await mutate("/todos");
  }

  return (
    <main>
      <h1>Todos</h1>
      <AddTodoForm />
      {isLoading && <p>Loading todos...</p>}
      {todos && todos.length === 0 && <p>No todos yet. Nothing to do!</p>}
      {todos && todos.length > 0 && (
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <label className={`todo-title ${todo.done ? "done" : ""}`}>
                <input type="checkbox" checked={todo.done} onChange={() => handleToggle(todo)} />
                {todo.title}
              </label>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
