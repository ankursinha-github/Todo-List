const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const methodOverride = require("method-override");

const app = express();
const port = 8080;

// Middlewares
app.use(express.json());
app.use(cors());
// app.use(methodOverride("_method"));

// MongoDB connection
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/todo-list');
};

main()
.then((res) => {
    console.log("Connected to mongoDB");
})
.catch((err) => {
    console.log(err)
});

// Schema
const todoSchema = new mongoose.Schema({
    task: String,
    isEdit: Boolean,
    isDone: Boolean,
});

const Todo = mongoose.model("Todo", todoSchema);

// Server
app.get("/todos", async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

// Add New Task Route
app.post("/todos", async (req, res) => {
    const {task} = req.body;
    const newTask = new Todo({
        task: task,
        isEdit: false,
        isDone: false,
    });

    await newTask.save();
    res.json(newTask);
});

// Delete Route
app.post("/todos/delete", async (req, res) => {
    const { id } = req.body;
    const deletedTask = await Todo.findByIdAndDelete(id);
    res.json(deletedTask);
});

// Update Route
app.post("/todos/edit", async (req, res) => {
    const { id } = req.body;
    const updatedTask = await Todo.findByIdAndUpdate(id, {isEdit: true});
    res.json(updatedTask);
});

// Save Update Route
app.post("/todos/save", async (req, res) => {
    const { id, editedTask } = req.body;
    const savedTask = await Todo.findByIdAndUpdate(id, {
        task: editedTask,
        isEdit: false,
    });

    res.json(savedTask);
});

// Completed Task Route
app.post("/todos/done", async (req, res) => {
    const { id } = req.body;
    const doneTask = await Todo.findByIdAndUpdate(id, {isDone: true});
    res.json(doneTask);
});

// Pending Task Route
app.post("/todos/pending", async (req, res) => {
    const { id } = req.body;
    const pendingTask = await Todo.findByIdAndUpdate(id, {isDone: false});
    res.json(pendingTask);
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});