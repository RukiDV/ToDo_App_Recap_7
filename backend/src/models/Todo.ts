import { Schema, model } from "mongoose";
import type { HydratedDocument } from "mongoose";

import type { NewTodo, Todo } from "../types";

const todoSchema = new Schema<NewTodo>({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
});

export const TodoModel = model("todos", todoSchema);

// turns a document from the database into what the API sends: `id` instead of `_id`, no `__v`.
export function toTodo(document: HydratedDocument<NewTodo>): Todo {
  return {
    id: document._id.toString(),
    title: document.title,
    done: document.done,
  };
}
