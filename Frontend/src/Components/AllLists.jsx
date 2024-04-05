import React from "react";
import TodoItem from "./TodoItem";
import "./AllLists.css";

const AllLists = ({
  todos,
  setEditedTask,
  editedTask,
  markPending,
  markDone,
  saveEdit,
  editTodo,
  deleteTodo,
}) => {
  return (
    <div className="All_Todos">
      {todos.map((todo) => {
        return (
          <TodoItem
            key={todo._id}
            todo={todo}
            setEditedTask={setEditedTask}
            editedTask={editedTask}
            markPending={markPending}
            markDone={markDone}
            saveEdit={saveEdit}
            editTodo={editTodo}
            deleteTodo={deleteTodo}
          />
        );
      })}
    </div>
  );
};

export default AllLists;
