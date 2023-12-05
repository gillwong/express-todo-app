import express from "express";
import cors from "cors";
import { PORT } from "./utils/config";
import todosRouter from "./controllers/todos";
import { todoErrorHandler } from "./utils/middleware";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/todos", todosRouter);
app.use(todoErrorHandler);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
