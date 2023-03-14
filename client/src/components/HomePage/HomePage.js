import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [tasksData, setTasksData] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [displayData, setDisplayData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3001/homePage`)
      .then((response) => response.json())
      .then((response) => {
        setTasksData(response);
        setDisplayData(response);
        console.log("response", response);
      });
  }, []);

  const handleCreate = () => {
    navigate("/createTask");
  };

  const handleUpdate = (id) => {
    console.log(typeof id);
    localStorage.setItem("id", id);
    navigate("/updateTask");
  };

  const handleView = (id) => {
    fetch(`http://localhost:3001/homePage/${id}`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(`Requested item: ${data.item}`);
        setDisplayData(tasksData.filter((item) => item._id === id));
        console.log("tasksData", tasksData);
      })
      .catch((error) => {
        console.error("Showing the desired item:", error);
      });
  };

  const handleDelete = async (id) => {
    fetch(`http://localhost:3001/homePage/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("response", response);
        setDisplayData(tasksData.filter((item) => item._id !== id));
        console.log(tasksData);
      })
      .catch((error) => {
        console.error("Deleted the desired item:", error);
      });
  };

  const handleSortChange = (e) => {
    const newSortOrder = e.target.value;

    setSortOrder(newSortOrder);
    if (newSortOrder === "dateCreated") {
      sortByDateCreated();
    } else {
      sortByDateDue();
    }
  };

  const sortByDateCreated = () => {
    setDisplayData(
      tasksData.sort((a, b) => {
        if (a.createdAt < b.createdAt) return -1;
        else if (a.createdAt > b.createdAt) return 1;
        else return 0;
      })
    );
    console.log("I am sorted tasks array by dateCreated", displayData);
  };

  const sortByDateDue = () => {
    console.log(tasksData);
    tasksData.sort((a, b) => {
      if (a.dueDate < b.dueDate) return -1;
      else if (a.dueDate > b.dueDate) return 1;
      else return 0;
    });
    setTasksData(tasksData);
    setDisplayData(tasksData);
    console.log("I am sorted tasks array by dateDue", displayData);
  };
  console.log("I am line 101", displayData);

  const handleChange = (e) => {
    const obj = tasksData.map((item) => {
      if (item._id == e) {
        item.taskCompleted = true;
        fetch(`http://localhost:3001/homePage/${e}`, {
          method: "PUT", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(), // body data type must match "Content-Type" header
        });
        console.log(item);
      }
    });
  };

  const handleCompletedTasks = () => {
    const completedTasks = tasksData.filter((item) => {
      if (item.taskCompleted === true) {
        return item;
      }
    });
    setDisplayData(completedTasks);
  };

  return (
    <div className="homePage">
      <div className="heading">
        <h1>Task Management</h1>
      </div>
      <div className="navBar">
        <div>
          <Button
            onClick={() => {
              handleCompletedTasks();
            }}
          >
            Completed Tasks
          </Button>
        </div>
        <Button
          className="createTaskBtn"
          variant="success"
          onClick={() => {
            handleCreate();
          }}
        >
          Create Task
        </Button>
        <div>
          <label>Sort by</label>
          <select id="sortOrder" value={sortOrder} onChange={handleSortChange}>
            <option value="dateCreated">Date created</option>
            <option value="dateDue">Date Due</option>
          </select>
        </div>
      </div>

      <Row xs={1} md={3} className="g-4">
        {displayData?.map((item) => (
          <Col>
            <Card className="card">
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <div className="buttonGroup">
                  <Button
                    variant="warning"
                    className="button"
                    onClick={() => {
                      handleView(item._id);
                    }}
                  >
                    View
                  </Button>
                  <Button
                    variant="primary"
                    className="button"
                    onClick={() => {
                      handleUpdate(item._id);
                    }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="danger"
                    className="button"
                    onClick={() => {
                      handleDelete(item._id);
                    }}
                  >
                    Delete
                  </Button>
                  <input
                    type="checkbox"
                    value={!item.taskCompleted}
                    name="taskCompleted"
                    onChange={() => handleChange(item._id)}
                    checked={item.taskCompleted}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HomePage;
