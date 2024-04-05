import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import InputBox from "./Components/InputBox";
import AllLists from "./Components/AllLists";

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [editedTask, setEditedTask] = useState("");

  // Accessing Todo List from Database
  async function fetchTodo() {
    const response = await axios.get("http://localhost:8080/todos");
    setTodos(response.data);
  }

  useEffect(() => {
    fetchTodo();
  }, []);

  // Function to add a new Todo
  async function addTodo(event) {
    event.preventDefault();
    await axios.post("http://localhost:8080/todos", { task });
    setTask("");
    fetchTodo();
  }

  // Function to delete Todo
  async function deleteTodo(id) {
    await axios.post("http://localhost:8080/todos/delete", { id });
    fetchTodo();
  }

  // Function to edit Todo
  async function editTodo(id) {
    await axios.post("http://localhost:8080/todos/edit", { id });
    fetchTodo();
  }

  // Function to save edited Todo
  async function saveEdit(id) {
    await axios.post("http://localhost:8080/todos/save", { id, editedTask });
    setEditedTask("");
    fetchTodo();
  }

  // Function to mark Todo as Completed
  async function markDone(id) {
    await axios.post("http://localhost:8080/todos/done", { id });
    fetchTodo();
  }

  // Function to mark Todo as Pending
  async function markPending(id) {
    await axios.post("http://localhost:8080/todos/pending", { id });
    fetchTodo();
  }

  return (
    <div className="Todo_box">
      <InputBox addTodo={addTodo} task={task} setTask={setTask} />
      <div className="heading">
        <h1>Todo List</h1>
        <div className="count">Total Task : {todos.length}</div>
      </div>
      <AllLists
        todos={todos}
        setEditedTask={setEditedTask}
        editedTask={editedTask}
        markPending={markPending}
        markDone={markDone}
        saveEdit={saveEdit}
        editTodo={editTodo}
        deleteTodo={deleteTodo}
      />
    </div>
  );
}

export default App;
