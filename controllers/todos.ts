import { Router } from "express";
import Todos, { Todo } from "../models/todo";

const todosRouter = Router();

todosRouter.get("/", async (request, response, next) => {
  try {
    const allTodos = await Todos.getAll();
    return response.json(allTodos);
  } catch (error) {
    next(error);
  }
});

todosRouter.get("/:id", async (request, response, next) => {
  const id = parseInt(request.params.id);
  if (isNaN(id))
    return response.status(400).json({
      error: "invalid id format",
    });

  try {
    const todo = await Todos.getById(id);
    return response.json(todo);
  } catch (error) {
    next(error);
  }
});

todosRouter.post("/", async (request, response, next) => {
  const todo = request.body as Todo;
  try {
    const savedTodo = await Todos.save(todo);
    return response.status(201).json(savedTodo);
  } catch (error) {
    next(error);
  }
});

todosRouter.put("/:id", async (request, response, next) => {
  const id = parseInt(request.params.id);
  if (isNaN(id))
    return response.status(400).json({
      error: "invalid id format",
    });

  const todo = request.body as Todo;

  try {
    const savedTodo = await Todos.update(id, todo);
    return response.json(savedTodo);
  } catch (error) {
    next(error);
  }
});

todosRouter.delete("/:id", async (request, response, next) => {
  const id = parseInt(request.params.id);
  if (isNaN(id))
    return response.status(400).json({
      error: "invalid id format",
    });

  try {
    await Todos.remove(id);
    return response.status(204).end();
  } catch (error) {
    next(error);
  }
});

export default todosRouter;
