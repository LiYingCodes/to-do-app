import React from 'react'
{/* List to display completedToDo*/ }
const CompletedToDo = (props) => {
    return (
        <li key={props.key}>
            {props.task} - {props.counter}
        </li>
    )
};

export default CompletedToDo;