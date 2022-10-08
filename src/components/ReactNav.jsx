import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
function ReactNav({ setmUserName, room, setRoom, joinRoom }) {
  const [userName, setUserName] = useState("");
  const [show, setShow] = useState(false);
  const [showRoom, setshowRoom] = useState(false);

  const handleClose = () => setShow(false);
  const handleRoomClose = () => setshowRoom(false);
  // const handleShow = () => setShow(true);
  const handleshowRoom = () => setshowRoom(true);

  const formSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userName", userName);
    setmUserName(userName);
    handleClose();
  };
  const roomSubmit = (e) => {
    e.preventDefault();
    joinRoom();
    localStorage.setItem("roomId", room);
    handleRoomClose();
  };
  if (showRoom) {
    return (
      <Modal show={showRoom} onHide={handleRoomClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter You Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={roomSubmit} className="grid my-2">
            <Form.Group className="mb-3" controlId="userName">
              <Form.Label>Please Enter you Room Id</Form.Label>
              <Form.Control
                required
                type="text"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                placeholder="Type here ..."
              />
              <Form.Text className="text-muted">
                Room id should be uniq. Share it with your friend and family to
                chat privately
              </Form.Text>
            </Form.Group>
            <Button variant="success" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
  return (
    <>
      {show ? (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Enter You Name</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={formSubmit} className="grid my-2">
              <Form.Group className="mb-3" controlId="userName">
                <Form.Label>Please Enter you name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Type here ..."
                />
                <Form.Text className="text-muted">
                  We'll never share your details with anyone else.
                </Form.Text>
              </Form.Group>
              <Button variant="success" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      ) : (
        <Navbar bg="transparent">
          <Container>
            <Nav className="me-auto">
              <Nav.Link href="#">
                {room !== "" ? (
                  <Button variant="outline-success">
                    <Badge bg="success">You are inside {room}</Badge>
                  </Button>
                ) : (
                  <Button variant="outline-secondary" onClick={handleshowRoom}>
                    Join Room
                    <span className="visually-hidden">unread messages</span>
                  </Button>
                )}
              </Nav.Link>
              {/* <Nav.Link href="#">
                <Button onClick={handleShow} variant="success">
                  <Badge bg="secondary">
                    Change Name
                    <span
                      style={{ fontSize: "16px", padding: "0 8px " }}
                      className="material-symbols-outlined"
                    >
                      edit
                    </span>
                  </Badge>
                </Button>
              </Nav.Link> */}
              {room !== "" && (
                <Nav.Link href="#">
                  <Button
                    onClick={() => setshowRoom(true)}
                    variant="outline-success"
                  >
                    <Badge bg="success">
                      Change Room
                      <span
                        style={{ fontSize: "16px", padding: "0 8px " }}
                        className="material-symbols-outlined"
                      >
                        edit
                      </span>
                    </Badge>
                  </Button>
                </Nav.Link>
              )}
            </Nav>
          </Container>
        </Navbar>
      )}
    </>
  );
}

export default ReactNav;
