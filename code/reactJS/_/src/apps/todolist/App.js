
import React from "react";

import List from "./List"


const errors = {
    0: "",
    1: "Invalid a name or already exists",
}

export default class ToDoList extends React.Component {
    constructor(){
        super();
        this.state = {
            tasks: [],
            task_new_name: "",
            msg: errors[0],
        }
    }

    handleAddTask = (e) => {
        const task_new_name = this.trimAndCheckNewTaskName(this.state.task_new_name);
        if (task_new_name != null) {
            this.setState((prevV) => ({
                tasks: [...prevV.tasks, task_new_name],
                msg: errors[0],
            }))
        } else {
            this.setState((prevV) => ({
                msg: errors[1],
            }))
        }
    }

    handleEditTask = (e) => {
        let task_new_name = prompt('Enter new name: ');
        task_new_name = this.trimAndCheckNewTaskName(task_new_name);
        if (task_new_name != null) {
            let todo = [...this.state.tasks];
            todo[parseInt(e.target.value)] =  task_new_name;
            this.setState((prevV) => ({
                tasks: todo,
                msg: errors[0],
            }))
        } else {
            this.setState((prevV) => ({
                msg: errors[1],
            }))
        }
    }

    handleDelTask = (e) => {
        let tasks = this.state.tasks;
        tasks.splice(parseInt(e.target.value), 1)
        this.setState((prevV) => ({
            tasks: tasks,
            msg: errors[0],
        }))
    }

    trimAndCheckNewTaskName = (task_new_name) => {
        task_new_name = task_new_name.trim();
        if (task_new_name && !this.state.tasks.includes(task_new_name))
            return task_new_name;
        return null;
    }

    handleOnChangeInputTextTask = (e) => {
        this.setState((prevV) => ({
            task_new_name: e.target.value,
        }))
    }

    render() {
        const {task_new_name} = this.state;
        return (
            <div>
                <div>
                    <h1 style={{color: "red"}}>{this.state.msg}</h1>
                    <input type="text" name="input_text_todolist" id="input_text_todolist" value={task_new_name} onChange={this.handleOnChangeInputTextTask} />
                    <button onClick={this.handleAddTask}>Add</button>
                </div>
                <List tasks={this.state.tasks} handleEditTask={this.handleEditTask} handleDelTask={this.handleDelTask} />
            </div>
        )
    }
}