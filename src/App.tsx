import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'rest api', isDone: false},
        {id: v1(), title: 'graphQL', isDone: false},
    ]);


    let [filter, setFilter] = useState<FilterValuesType>('all');

    let tasksForTodoList = tasks;

    if (filter === 'active') {
        tasksForTodoList = tasks.filter(t => t.isDone === false)
    }

    if (filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone === true)
    }

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id);
        setTasks(filteredTasks)
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    function addTask(text: string) {
        let newTask = {id: v1(), title: text, isDone: false};
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks)
    }

    function changeStatus (id: string, isDone: boolean) {
        let task = tasks.find(t => t.id === id);
        if(task) {
            task.isDone = isDone;
            setTasks([...tasks])
        }
    }

    return (
        <div className="App">
            <TodoList title='What to learn'
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeStatus={changeStatus}/>
        </div>
    );
}

export default App;
