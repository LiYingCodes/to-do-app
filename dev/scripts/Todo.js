import React from 'react'
import TimeElapsed from './TimeElapsed'


{/* List to display toDoNows */ }
const Todo = (props) => {
    console.log(props.counter);
    return (
        <li>
            {props.task} - {props.chores(props.counter)}
            <button onClick={() => props.markAsComplete(props.firebaseKey)}>Done</button>
            <button onClick={() => props.removeToDo(props.firebaseKey)}>Remove</button>
            <TimeElapsed inputTime={props.inputTime}/>
        </li>
        
    )
};

export default Todo;