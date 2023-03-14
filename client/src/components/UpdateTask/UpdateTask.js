import React, { useEffect, useState } from "react";
import { Button, Dropdown, Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const UpdateTask = () => {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [tasksData, setTasksData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  const id = localStorage.getItem("id");
  console.log(id);
  useEffect(() => {
    fetch(`http://localhost:3001/homePage/${id}`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(`Requested item: ${data.item}`);
        setTasksData(tasksData.filter((item) => item._id === id));
        console.log("tasksData", tasksData);
      })
      .catch((error) => {
        console.error("Showing the desired item:", error);
      });
  }, []);

  // creating states for all variables:-
  const [description, setDescription] = useState(tasksData.description);
  const navigate = useNavigate();

  const handleChange = (e) => {
    // 1. setState
    console.log(tasksData.description);
    console.log("hello");
  };

  const saveChanges = (id) => {
    // 2.put request
    navigate("/homePage");
  };
  const handleOptionSelect = (eventKey) => {
    setSelectedOption(eventKey);
  };

  return (
    <div>
      <>
        <Modal id={id} show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                // controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  autoFocus
                  value={tasksData.title}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={tasksData.description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                // controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Due Date</Form.Label>
                <Form.Control
                  name="dueDate"
                  type="date"
                  autoFocus
                  value={tasksData.dueDate}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Notification Frequency</Form.Label>
                <Dropdown onSelect={handleOptionSelect}>
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    {selectedOption ? selectedOption : "Select an option"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item eventKey="daily">Daily</Dropdown.Item>
                    <Dropdown.Item eventKey="weekly">Weekly</Dropdown.Item>
                    <Dropdown.Item eventKey="monthly">Monthly</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>
              <Form.Group
                className="mb-3"
                // controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Notification Time</Form.Label>
                <Form.Control
                  type="time"
                  autoFocus
                  value={tasksData.title}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Label>Type of Notification</Form.Label>
              <Dropdown onSelect={handleOptionSelect}>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                  {selectedOption ? selectedOption : "Select an option"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="option1">Email</Dropdown.Item>
                  <Dropdown.Item eventKey="option2">SMS</Dropdown.Item>
                  <Dropdown.Item eventKey="option3">
                    Push Notification
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={saveChanges}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
};

export default UpdateTask;
