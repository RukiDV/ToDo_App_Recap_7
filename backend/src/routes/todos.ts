import { Router } from "express";
import { TodoModel, toTodo } from "../models/Todo";
import type { NewTodo } from "../types";

export const todosRouter = Router();

// Issue 2: add the routes here. The router is already mounted on /api/todos in app.ts.
//
// GET    /api/todos       -> 200 with the list of todos
// POST   /api/todos       -> 201 with the new todo
// PUT    /api/todos/:id   -> 200 with the updated todo, 404 for an unknown id
// DELETE /api/todos/:id   -> 204 without a body, 404 for an unknown id
//
// The contract is in docs/api-contract.md at the root of the project.

todosRouter.get("/", async (request, response) => {
  const todos = await TodoModel.find();
  response.json(todos.map(toTodo));
});

todosRouter.post("/", async (request, response) => {
  const { title } = (request.body ?? {}) as Partial<NewTodo>;
  const todo = await TodoModel.create({ title });
  response.status(201).json(toTodo(todo));
});

todosRouter.put("/:id", async (request, response) => {
  const { id } = request.params;
  const { title, done } = (request.body ?? {}) as Partial<NewTodo>;
  const todo = await TodoModel.findByIdAndUpdate(id, { title, done }, { returnDocument: "after", runValidators: true });
  if (!todo) {
    response.status(404).json({ error: "Todo not found" });
    return;
  }
  response.json(toTodo(todo));
});

todosRouter.delete("/:id", async (request, response) => {
  const { id } = request.params;
  const todo = await TodoModel.findByIdAndDelete(id);
  if (!todo) {
    response.status(404).json({ error: "Todo not found" });
    return;
  }
  response.status(204).send();
});