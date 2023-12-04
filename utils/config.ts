import dotenv from "dotenv";
import mysql from "mysql2";

dotenv.config();

export const PORT = process.env.PORT ?? 8000;

const db = mysql.createConnection({
  host: process.env.DB_HOST ?? "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME ?? "todo_app",
});

db.connect((err) => {
  if (err) console.error({ error: err });
});

export default db;
