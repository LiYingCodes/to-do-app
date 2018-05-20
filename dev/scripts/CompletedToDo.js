import React from 'react'
{/* List to display completedToDo*/ }
const CompletedToDo = (props) => {
    return (
        <li>
            {props.task}
        </li>
    )
};

export default CompletedToDo;