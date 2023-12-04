import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT ?? 8000;

app.get("/", (request, response) => {
  response.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
