import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

import {addTaskAC, removeTaskAC, tasksReducer} from './reducers/tasksReducer';
import {v1} from 'uuid';
import {changeFilterAC, filterReducer} from './reducers/filterReducer';

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {

    // let [tasks, setTasks] = useState([
    //     { id: v1(), title: "HTML&CSS", isDone: true },
    //     { id: v1(), title: "JS", isDone: true },
    //     { id: v1(), title: "ReactJS", isDone: false },
    //     { id: v1(), title: "Rest API", isDone: false },
    //     { id: v1(), title: "GraphQL", isDone: false },
    // ]);

    let [tasks, dispatchTasks] = useReducer(tasksReducer, [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Rest API', isDone: false},
        {id: v1(), title: 'GraphQL', isDone: false},
    ]);

    function removeTask(id: string) {
        // let filteredTasks = tasks.filter(t => t.id != id);
        // setTasks(filteredTasks);
        dispatchTasks(removeTaskAC(id))
    }

    function addTask(title: string) {
        // let task = { id: v1(), title: title, isDone: false };
        // let newTasks = [task, ...tasks];
        //
        dispatchTasks(addTaskAC(title))
    }

    let [filter, dispatchFilter] = useReducer(filterReducer, 'all');

    let tasksForTodolist = tasks;

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }

    function changeFilter(value: FilterValuesType) {
        // setFilter(value);
        dispatchFilter(changeFilterAC(value))
    }


    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}/>
        </div>
    );
}

export default App;
