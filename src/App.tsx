import React, { useState } from 'react'
import './App.css'

type Task = {
	id: string;
	task: string;
	completed: boolean;
}

interface OnAddTaskProp {
	onAddTask : (task: string) => void;
}

interface TaskListProps {
	tasks : Task[];
	onDelete : (id : string) => void;
	onToggle : (id : string) => void
}


export default function App () {
	const [tasks,setTasks] = useState<Task[]>([]);

	function addTask(task : string) : void{
		setTasks(prev => [...prev, {id: crypto.randomUUID(), task, completed: false}])
	}

	function removeTask(id : string) : void {
		setTasks(prev => prev.filter(task => task.id !== id))
	}

	function toggleTask(id : string) : void {
		setTasks (prev => prev.map( task => task.id === id ? {...task, completed: !task.completed} : task))
	}

	return(
		<>
			<h1>To Do list</h1>
			<TaskForm onAddTask = {addTask}/>
			<TaskList tasks = {tasks} onToggle = {toggleTask} onDelete = {removeTask}/>
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

function TaskList ({tasks, onDelete, onToggle} : TaskListProps) {

	return(
		<ul>
			{tasks.map(task => <li key={task.id}>
				<span className = {task.completed ? 'completed' : ''}>{task.task}</span> 
				<button className='remove-button' onClick={() => onDelete(task.id)}>remove</button> 
				<button className={task.completed ? 'red' : 'green'} onClick={() => onToggle(task.id)}>{task.completed ? '✗' : '✓'}</button></li>)}
		</ul>
	)

}