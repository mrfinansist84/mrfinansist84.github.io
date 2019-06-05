import React, { Component } from "react"


import './Task.css';



    export default class Task extends Component{
    constructor(){
        super();
      this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete () {
        this.props.onDelete(this.props.id);
    }

    
    render() {
        const {
            color,
            children,
            onDelete,   
        } = this.props;
        
        return (
            <div className="note" style={{ backgroundColor: color }}>
                <span className="note__delete-icon" onClick={this.handleDelete}> × </span>
                {children}
                </div>
        )
    }
}

