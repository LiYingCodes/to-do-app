import React from 'react'

{/* List to display toDoSometime*/ }
const ToDoSometime = (props) => {
    return (
        <li>
            {props.task} - {props.counter}
            <button onClick={() => props.markAsComplete(props.firebaseKey)}>Done</button>
            <button onClick={() => props.removeToDo(props.firebaseKey)}>Remove</button>
        </li>
    )
};

export default ToDoSometime;