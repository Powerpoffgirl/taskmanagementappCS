import HomePage from "components/HomePage/HomePage";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateTask.css";

const CreateTask = () => {
  const navigate = useNavigate();

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    dueDate: "",
    notificationFrequency: "",
    notificationTime: "",
    notificationType: "",
    taskCompleted: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = (e) => {
    console.log("submitted");

    fetch(`http://localhost:3001/createTask`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(taskData), // body data type must match "Content-Type" header
    });
    navigate("/homePage");
  };

  return (
    // Bootstrap Modal

    // Old structure
    <div className="createTask">
      <h2>CreateTask</h2>
      <div className="taskContainer">
        <div>
          <label>Title</label>
          <input
            name="title"
            value={taskData.title}
            onChange={handleChange}
            class="form-control"
            type="text"
            placeholder="Title"
          />
        </div>
        <div>
          <label>Description</label>
          <input
            name="description"
            value={taskData.description}
            onChange={handleChange}
            class="form-control"
            type="text"
            placeholder="Description"
          />
        </div>
        <div>
          <label>Due Date</label>
          <input
            name="dueDate"
            value={taskData.dueDate}
            onChange={handleChange}
            class="form-control"
            type="date"
          />
        </div>
        <div>
          <label>Notification Frequency</label>
          <select
            name="notificationFrequency"
            value={taskData.notificationFrequency}
            onChange={handleChange}
            class="form-control"
          >
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
          </select>
        </div>
        <div>
          <label>Notification Time</label>
          <input
            name="notificationTime"
            value={taskData.notificationTime}
            onChange={handleChange}
            class="form-control"
            type="time"
            placeholder="timeOfNotification"
          />
        </div>
        <div>
          <label>Type of Notification</label>
          <select
            name="notificationType"
            value={taskData.notificationType}
            onChange={handleChange}
            class="form-control"
          >
            <option>Email</option>
            <option>SMS</option>
            <option>Push Notification</option>
          </select>
        </div>
        <div>
          <label>Task Completed</label>
          <input
            type="checkbox"
            value={!taskData.taskCompleted}
            name="taskCompleted"
            onChange={handleChange}
          />
        </div>
      </div>
      <button onClick={handleSubmit} className="submitBtn">
        Submit
      </button>
    </div>
  );
};

export default CreateTask;
