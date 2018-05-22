import React from 'react'
import TimeElapsed from './TimeElapsed'


{/* List to display todos*/ }
const Todo = (props) => {
  return <li>
      <div className="task flex">
        <span>
          <i className="fas fa-thumbtack fw" />
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