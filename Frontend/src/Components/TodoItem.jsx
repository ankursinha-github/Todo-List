import React from "react";
import "./TodoItem.css";

const TodoItem = ({
  todo,
  setEditedTask,
  editedTask,
  markPending,
  markDone,
  saveEdit,
  editTodo,
  deleteTodo,
}) => {
  return (
    <div className="Todo_item" key={todo._id}>
      {todo.isEdit ? (
        <input
          type="text"
          placeholder="Enter Todo"
          onChange={(event) => setEditedTask(event.target.value)}
          value={editedTask}
        />
      ) : (
        <div style={todo.isDone ? { textDecoration: "line-through" } : null}>
          {todo.task}
        </div>
      )}
      <div className="btns">
        {todo.isDone ? (
          <button onClick={() => markPending(todo._id)}>Mark Pending</button>
        ) : (
          <button onClick={() => markDone(todo._id)}>Mark Done</button>
        )}
        {todo.isEdit ? (
          <button onClick={() => saveEdit(todo._id)}>Save</button>
        ) : (
          <button onClick={() => editTodo(todo._id)}>Edit</button>
        )}
        <button onClick={() => deleteTodo(todo._id)}>Delete</button>
      </div>
    </div>
  );
};

export default TodoItem;
