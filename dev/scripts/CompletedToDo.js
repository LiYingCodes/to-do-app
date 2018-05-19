import React from 'react'
{/* List to display completedToDo*/ }
const CompletedToDo = (props) => {
    return (
        <li>
            {props.task} - {props.counter}
        </li>
    )
};

export default CompletedToDo;