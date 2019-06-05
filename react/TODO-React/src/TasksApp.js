import React, { Component } from "react"
import TaskEditor from "./TaskEditor.js"
import TaskGrid from "./TaskGrid.js"

import './TasksApp.css';

export default class TasksApp extends Component{
    constructor(){
        super();
        this.state ={
            notes: []
        }
        this.handleTaskDelete = this.handleTaskDelete.bind(this);
        this.handleNoteAdd = this.handleNoteAdd.bind(this);
    }

    handleTaskDelete(noteId) {
        this.setState({
            notes: this.state.notes.filter(note => note.id !== noteId)
        });
    }

    handleNoteAdd(newNote) {
        this.setState({
            notes: [newNote, ...this.state.notes]
        });
    }

    render() {
        return (
            <div className="app">
                <h2 className="app__header">TODO LIST</h2>

                <TaskEditor 
             
                onNoteAdd={this.handleNoteAdd} />

                <TaskGrid
                    notes={this.state.notes}
                    onTaskDelete={this.handleTaskDelete}
                   
                />
            </div>
        );
    }

}

  