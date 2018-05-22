import React from 'react'
import TimeElapsed from './TimeElapsed'


{/* List to display todos*/ }
const Todo = (props) => {
    console.log(props.counter);
    return <li>
        <div className="task flex">
          <span>
            <i class="fas fa-thumbtack fw" />
            {props.task}
          </span>
          <span>{props.chores(props.counter)}</span>
        </div>
        <div className="finish flex">
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