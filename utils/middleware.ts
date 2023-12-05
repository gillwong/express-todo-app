import { Request, Response, NextFunction } from "express";
import { TodoError } from "../models/todo";

export function todoErrorHandler(
  error: unknown,
  request: Request,
  response: Response,
  next: NextFunction
) {
  console.error((error as Error).message);
  if (error instanceof TodoError)
    return response.status(500).json({
      error: error.message,
    });
  next(error);
}
