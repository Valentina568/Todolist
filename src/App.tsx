import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodoListType = {
    id: string
    title: string,
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {
            id: todoListId1,
            title: 'What to learn',
            filter: 'all'
        },
        {
            id: todoListId2,
            title: 'What to buy',
            filter: 'all'
        }
    ]);

    let [tasks, setTasks] = useState<TasksStateType>({
        [todoListId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
        ],
        [todoListId2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Bread', isDone: true},
        ]
    });

    function removeTask(id: string, todoListId: string) {
        let todoListTasks = tasks[todoListId];
        tasks[todoListId] = todoListTasks.filter(t => t.id !== id);
        setTasks({...tasks})
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        let todoList = todoLists.find(tl => tl.id === todoListId);
        if(todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists])
        }
    }

    function addTask(text: string, todoListId: string) {
        let newTask = {id: v1(), title: text, isDone: false};
        let todoListTasks = tasks[todoListId];
        tasks[todoListId] = [newTask, ...todoListTasks];
        setTasks({...tasks})
    }

    function changeStatus(id: string, isDone: boolean, todoListId: string) {
        let todoListTasks = tasks[todoListId];
        let task = todoListTasks.find(t => t.id === id);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks})
        }
    }

    function removeTodoList (id: string) {
        setTodoLists(todoLists.filter(tl => tl.id != id));
        delete tasks[id];
        setTasks({...tasks})
    }

    return (
        <div className="App">
            {todoLists.map(tl => {

                let allTodoListTasks = tasks[tl.id];
                let tasksForTodoList = allTodoListTasks;

                if (tl.filter === 'active') {
                    tasksForTodoList = allTodoListTasks.filter(t => t.isDone === false)
                }

                if (tl.filter === 'completed') {
                    tasksForTodoList = allTodoListTasks.filter(t => t.isDone === true)
                }

                return <TodoList key={tl.id}
                                 id={tl.id}
                                 title={tl.title}
                                 tasks={tasksForTodoList}
                                 removeTask={removeTask}
                                 changeFilter={changeFilter}
                                 addTask={addTask}
                                 changeStatus={changeStatus}
                                 filter={tl.filter}
                                 removeTodoList={removeTodoList}/>
            })
            }
        </div>
    );
}

export default App;
