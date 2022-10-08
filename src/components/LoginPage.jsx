import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
function LoginPage({ setmUserName }) {
  const isUsername = !!localStorage?.getItem("userName") ? false : true;
  const [show, setShow] = useState(isUsername);
  const [userName, setUsername] = useState("");
  const formSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userName", userName);
    setShow(false);
    setmUserName(userName);
    postData(userName)
  };
  // Example POST method implementation:
  const postData = async (userName) => {
    const url = "https://reactappanshu-default-rtdb.firebaseio.com/joined_user.json"
     await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userName),
    });
  };

  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        fullscreen
        aria-labelledby="welcome-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Welcome 😇
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formSubmit} className="grid my-2">
            <Form.Group className="mb-3" controlId="userName">
              <Form.Label>Please Enter you name</Form.Label>
              <Form.Control
                required
                type="text"
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Type here ..."
              />
              <Form.Text className="text-muted">
                We'll never share your details with anyone else.
              </Form.Text>
            </Form.Group>
            <Button type="submit" variant="outline-dark">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LoginPage;
