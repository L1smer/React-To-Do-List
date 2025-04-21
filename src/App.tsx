import React, { useState } from 'react'
import './App.css'

type Tasks = {
	task: string;
	id: string;
}

interface OnAddTaskProp {
	onAddTask : (task: string) => void;
}

interface TaskListProps {
	tasks : Tasks[];
	onDelete : (id : string) => void;
}


export default function App () {
	const [tasks,setTasks] = useState<Tasks[]>([]);

	function addTask(task : string) : void{
		setTasks(prev => [...prev, {id: crypto.randomUUID(), task}])
	}

	function removeTask(id : string) : void {
		setTasks(prev => prev.filter(task => task.id !== id))
	}

	return(
		<>
			<h1>To Do list</h1>
			<TaskForm onAddTask = {addTask}/>
			<TaskList tasks = {tasks} onDelete = {removeTask}/>
		</>
	)
}

function TaskForm({onAddTask} : OnAddTaskProp) {
	const [task,setTask] = useState<string>('');

	function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (!task) return;

		onAddTask(task);
		setTask('')
	}

	return(
		<form onSubmit={handleSubmit}>
			<input type="text" 
			placeholder='Write your new task here!'
			value={task}
			onChange={e => setTask(e.target.value)}/>
			<button type='submit'>Add</button>
		</form>
	)
}

function TaskList ({tasks, onDelete} : TaskListProps) {

	return(
		<ul>
			{tasks.map(task => <li key={task.id}><span>{task.task}</span> <button className='remove-button' onClick={() => onDelete(task.id)}>remove</button></li>)}
		</ul>
	)

}