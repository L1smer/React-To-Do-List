import React, { useEffect, useState } from "react";
import "./App.css";

type Task = {
  id: string;
  task: string;
  completed: boolean;
};

interface OnAddTaskProp {
  onAddTask: (task: string) => void;
}

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
	const [loading, setLoading] = useState<boolean>(true)

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
  });

  function addTask(task: string): void {
    setTasks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), task, completed: false },
    ]);
  }

  function removeTask(id: string): void {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  function toggleTask(id: string): void {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

	useEffect(() => {
		const timer = setTimeout(() => {
			setTasks([
				{ id: '1', task: 'Example 1', completed: false },
				{ id: '2', task: 'Example 2', completed: true },
			])
			setLoading(false)
		}, 2000)

		return () => clearTimeout(timer)
	}, [])

  return (
    <>
      <h1>To Do list</h1>
      <TaskForm onAddTask={addTask} />
      <div className="filter-buttons">
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter("all")}>All</button>
        <button className={filter === 'active' ? 'active' : ''} onClick={() => setFilter("active")}>Active</button>
        <button className={filter === 'completed' ? 'active' : ''} onClick={() => setFilter("completed")}>Completed</button>
      </div>
			{loading ? (<p>Loading...</p>) : (
				<TaskList
        tasks={filteredTasks}
        onToggle={toggleTask}
        onDelete={removeTask}
      />
			)}
    </>
  );
}

function TaskForm({ onAddTask }: OnAddTaskProp) {
  const [task, setTask] = useState<string>("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!task) return;

    onAddTask(task);
    setTask("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Write your new task here!"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}

function TaskList({ tasks, onDelete, onToggle }: TaskListProps) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <span className={task.completed ? "completed" : ""}>{task.task}</span>
          <button className="remove-button" onClick={() => onDelete(task.id)}>
            remove
          </button>
          <button
            className={task.completed ? "red" : "green"}
            onClick={() => onToggle(task.id)}
          >
            {task.completed ? "✗" : "✓"}
          </button>
        </li>
      ))}
    </ul>
  );
}
