import { Task } from "../hooks/useTasks";

interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

export default function TaskItem({ task, onDelete, onToggle }: TaskItemProps) {
  return (
      <li>
        <span className={task.completed ? "completed" : ""}>{task.title}</span>
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
  );
}
