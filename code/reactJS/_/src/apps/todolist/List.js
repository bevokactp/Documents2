
import React from "react";

export default class List extends React.Component {
    render() {

        return (
            <div>
                <ol>
                    {this.props.tasks.map((task_name, task_id) =>
                        <li key={task_id}>
                            {task_name}
                            <button value={task_id} onClick={this.props.handleEditTask}>Edit</button>
                            <button value={task_id} onClick={this.props.handleDelTask}>Del</button>
                        </li>
                    )}
                </ol>
            </div>
        )
    }
}