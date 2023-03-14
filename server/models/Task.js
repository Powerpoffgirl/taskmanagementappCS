import mongoose from "mongoose";

const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    dueDate: {
      type: String,
    },
    notificationFrequency: {
      type: String,
    },
    notificationTime: {
      type: String,
    },
    notificationType: {
      type: String,
    },
    taskCompleted: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
