import { useState } from "react";

interface onAddTaskProp {
  onAddTask: (title: string) => void;
}

export default function TaskForm({ onAddTask }: onAddTaskProp) {
  const [title, setTitle] = useState<string>("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title) return;

    onAddTask(title);
    setTitle("");
  }

  return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Write your new task here!"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
				<button type="submit">Add</button>
      </form>
  );
}
