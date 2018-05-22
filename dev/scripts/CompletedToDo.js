import React from 'react'
{/* List to display completedToDo*/ }
const CompletedToDo = (props) => {
    return <li>
        <i className="fas fa-check fw"></i>
        {props.task}
      </li>;
};

export default CompletedToDo;