import React from 'react'
import TimeElapsed from './TimeElapsed'


{/* List to display toDoNows */ }
const Todo = (props) => {
    console.log(props.counter);
    return <li>
        <div className="task">
          <span>{props.task}</span>
          <span>{props.chores(props.counter)}</span>
        </div>
        <div className="finish">
          <button onClick={() => props.markAsComplete(props.firebaseKey)}>
            Done
          </button>
          <button onClick={() => props.removeToDo(props.firebaseKey)}>
            Remove
          </button>
        </div>
        <TimeElapsed inputTime={props.inputTime} />
      </li>;
};

export default Todo;