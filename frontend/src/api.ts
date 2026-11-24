import { mutate } from "swr";
import type { Todo, NewTodo } from "./types";

// VITE_API_URL is the address of the deployed API (ends with /api, no trailing slash).
// Vite writes it into the JavaScript when the app is built.
// Without it (on your laptop) the local backend is used.
export const API_URL: string =
  import.meta.env.VITE_API_URL ?? "http://localhost:3001/api";

// Put all functions that talk to the API here (fetcher for `useSWR`, create, update, delete),
// so that your components never call `fetch` themselves.

export async function fetcher<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json();
}

// fetch only throws when the server cannot be reached. Give that case a message for the user.
async function request(url: string, options?: RequestInit): Promise<Response> {
  try {
    return await fetch(url, options);
  } catch {
    throw new Error("Could not reach the server. Is the backend running?");
  }
}

async function throwApiError(response: Response): Promise<never> {
  const body = (await response.json().catch(() => null)) as {
    error?: string;
  } | null;
  throw new Error(
    body?.error ?? `Request failed with status ${response.status}`
  );
}

// Reload every cached todo list: "/todos", "/todos?done=true" and "/todos?done=false".
export function refreshTodos() {
  return mutate((key) => typeof key === "string" && key.startsWith("/todos"));
}

export async function createTodo(title: string): Promise<Todo> {
  const response = await request(`${API_URL}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  if (!response.ok) {
    await throwApiError(response);
  }
  return response.json();
}

export async function updateTodo(id: string, todo: NewTodo): Promise<Todo> {
  const response = await request(`${API_URL}/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  if (!response.ok) {
    await throwApiError(response);
  }
  return response.json();
}

export async function deleteTodo(id: string): Promise<void> {
  const response = await request(`${API_URL}/todos/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    await throwApiError(response);
  }
}
