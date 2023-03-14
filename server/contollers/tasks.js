import Task from "../models/Task.js";
import User from "../models/User.js";

// CREATE
export const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      dueDate,
      notificationFrequency,
      notificationTime,
      notificationType,
      taskCompleted,
    } = req.body;
    const newTask = new Task({
      title,
      description,
      dueDate,
      notificationFrequency,
      notificationTime,
      notificationType,
      taskCompleted,
    });

    console.log(newTask);
    await newTask.save();

    const task = await Task.find();
    res.status(201).json(task);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

// DELETE mongo
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    // res.status(201).json(task);
    res
      .status(200)
      .json({ message: `Task with ID ${id} deleted successfully.` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE id, data
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      dueDate,
      notificationFrequency,
      notificationTime,
      notificationType,
      taskCompleted,
    } = req.body; // define updatedTask with new data
    const updatedTask = await Task.findByIdAndUpdate(id, {
      taskCompleted: "true",
    });
    res.send(taskCompleted);
  } catch (error) {
    res.status(404).json({ message: err.message });
  }
};

// VIEW all tasks
export const viewTasks = async (req, res) => {
  try {
    const task = await Task.find({});
    console.log("I am coimng from viewTasks", task);
    res.send(task);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// View task by id
export const viewTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    console.log("I am coimng from viewTaskById", task);
    res.send(task);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
