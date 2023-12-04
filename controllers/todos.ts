import { Router } from "express";
import db from "../utils/config";
import Todo from "../models/todo";
import { RowDataPacket } from "mysql2";
import dayjs from "dayjs";

const todosRouter = Router();

todosRouter.get("/", async (request, response) => {
  db.query("SELECT * FROM todos", (err, results, fields) => {
    console.log(results);
    return response.json(results as Todo[]);
  });
});

todosRouter.get("/:id", async (request, response) => {
  const id = parseInt(request.params.id);
  if (isNaN(id))
    return response.status(400).json({
      error: "invalid id format",
    });

  db.execute(
    "SELECT * FROM todos WHERE id = ?",
    [id],
    (err, results, fields) => {
      const result = (results as RowDataPacket[])[0];
      console.log(result);
      return response.json(result as Todo);
    }
  );
});

todosRouter.post("/", async (request, response) => {
  const todo = request.body as Todo;

  db.execute(
    "INSERT INTO todos (title, is_completed, description, due, priority) VALUES (?, ?, ?, ?, ?)",
    [
      todo.title,
      todo.isCompleted ? 1 : 0,
      todo.description ?? "",
      todo.due ? dayjs(todo.due).format("YYYY-MM-DD") : null,
      todo.priority ?? "",
    ],
    (err, results, fields) => {
      if (!err)
        db.query("SELECT LAST_INSERT_ID()", (err, results, fields) => {
          const savedTodo: Todo = {
            ...todo,
            id: (results as RowDataPacket[])[0]["LAST_INSERT_ID()"] as number,
          };
          console.log(results);
          return response.status(201).json(savedTodo);
        });
    }
  );
});

todosRouter.put("/:id", async (request, response) => {
  const id = parseInt(request.params.id);
  if (isNaN(id))
    return response.status(400).json({
      error: "invalid id format",
    });

  const todo = request.body as Todo;

  db.execute(
    "UPDATE todos SET title = ?, description = ?, priority = ?, due = ?, is_completed = ? WHERE id = ?",
    [
      todo.title,
      todo.description ?? "",
      todo.priority ?? "",
      todo.due ? dayjs(todo.due).format("YYYY-MM-DD") : null,
      todo.isCompleted ? 1 : 0,
      id,
    ],
    (err, results, fields) => {
      if (!err) return response.status(200).json({ ...todo, id } as Todo);
    }
  );
});

todosRouter.delete("/:id", async (request, response) => {
  const id = parseInt(request.params.id);
  if (isNaN(id))
    return response.status(400).json({
      error: "invalid id format",
    });

  db.execute("DELETE FROM todos WHERE id = ?", [id], (err, results, fields) => {
    if (!err) return response.status(204).end();
  });
});

export default todosRouter;
