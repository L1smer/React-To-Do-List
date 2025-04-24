import { useState, useEffect } from "react";

export type Task = {
  title: string;
  id: string;
  completed: boolean;
};

export function useTasks() {
  const [tasks, setTask] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [loading, setLoading] = useState<boolean>(true);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
  });

  function addTask(title: string): void {
    setTask((prev) => [
      ...prev,
      { title, id: crypto.randomUUID(), completed: false },
    ]);
  }

  function removeTask(id: string): void {
    setTask(tasks.filter((task) => task.id !== id));
  }

  function toggleTask(id: string): void {
    const update = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTask(update);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTask([
        { title: "Example 1", id: "1", completed: false },
        { title: "Example 2", id: "2", completed: true },
      ]);
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return {
    tasks: filteredTasks,
    loading,
    addTask,
    removeTask,
    toggleTask,
    filter,
    setFilter,
  };
}
