import React from 'react'
import './InputBox.css'

const InputBox = ({ addTodo, task, setTask }) => {
  return (
    <form onSubmit={addTodo} className='Input_Box'>
        <input
          type="text"
          placeholder="Enter Todo's"
          onChange={(event) => setTask(event.target.value)}
          value={task}
        />
        <button>Add Todo</button>
    </form>
  )
}

export default InputBox
