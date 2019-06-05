import React, {Component} from "react"
import Task from "./Task.js"

import './TaskGrid.css';

export default class TaskGrid extends Component {
    constructor(){
        super();
    }
    render() {
        const {
            notes,
            onTaskDelete,
        } = this.props;

        return (
            <div className="grid">
                {
                    notes.map(task =>
                        <Task
                            key={task.id}
                            id={task.id}
                            color={task.color}
                            onDelete={onTaskDelete}
                        >
                          {task.text}
                        </Task>
                    )
                }
            </div>
        );
    }
}
   
    