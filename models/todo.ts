import { Dayjs } from "dayjs";

type Todo = {
  id?: number;
  title: string;
  isCompleted: boolean;
  description?: string;
  due?: Dayjs;
  priority?: "HIGH" | "MEDIUM" | "LOW";
};

export default Todo;
