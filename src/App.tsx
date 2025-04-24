import "./App.css";
import { useTasks } from "./hooks/useTasks";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

export default function App() {
  const { tasks, loading, addTask, removeTask, toggleTask, filter, setFilter } =
    useTasks();
  return (
    <>
      <h1>TO DO LIST</h1>

      <TaskForm onAddTask={addTask} />
      <div className="filter-buttons">
        <button
          className={filter === "all" ? "focus" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={filter === "active" ? "focus" : ""}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className={filter === "completed" ? "focus" : ""}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <TaskList tasks={tasks} onDelete={removeTask} onToggle={toggleTask} />
      )}
    </>
  );
}
