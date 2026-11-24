import type { Todo, NewTodo } from "./types";

// The backend allows requests from http://localhost:5173 (CORS), so the frontend can call it directly.
export const API_URL = "http://localhost:3001/api";

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
