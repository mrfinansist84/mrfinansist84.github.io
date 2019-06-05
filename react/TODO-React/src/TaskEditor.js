import React, {Component} from "react"

import './TaskEditor.css';


export default class TaskEditor extends Component {
    constructor(){
        super();
        this.state ={
            text: ''
        }
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleNoteAdd = this.handleNoteAdd.bind(this);
    }
    
    handleTextChange(event)  {
        this.setState({
           text: event.target.value
        })
       
    }

    handleNoteAdd  ()  {
        const newNote = {
            text: this.state.text,
            color: "green",
            id: Date.now()
            };

        this.props.onNoteAdd(newNote);
        this.resetState();
    }

    resetState () {
        this.setState({
            text: ''
        });
    }

    render() {
        return (
            <div className="editor">
                <textarea
                    rows={5}
                    placeholder="Enter your note here..."
                    className="editor__textarea"
                    value={this.state.text}
                    onChange={this.handleTextChange}
                />

                <button
                    className="editor__button"
                    onClick={this.handleNoteAdd}
                >
                    Add
                </button>
            </div>
        );
    }
}
