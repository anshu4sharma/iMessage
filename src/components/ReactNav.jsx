import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
function ReactNav({ room, setRoom, joinRoom, userCount }) {
  const [showRoom, setshowRoom] = useState(false);
  const handleRoomClose = () => setshowRoom(false);
  const handleshowRoom = () => setshowRoom(true);
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
          <Modal.Title>Please Enter you Room Id</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={roomSubmit} className="grid my-2">
            <Form.Group className="mb-3" controlId="userName">
              <Form.Label>Room id should be uniq. </Form.Label>
              <Form.Control
                required
                type="text"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                placeholder="Type here ..."
              />
              <Form.Text className="text-muted">
                Share it with your friend and family to chat privately
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
      <Navbar bg="transparent">
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="#">
              {room !== "" ? (
                <Button variant="outline-secondary">
                  You are inside {room}
                </Button>
              ) : (
                <Button variant="outline-secondary " onClick={handleshowRoom}>
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

            {room !== "" ? (
              <>
                <Nav.Link>
                  <Button
                    onClick={() => setshowRoom(true)}
                    variant="outline-secondary"
                  >
                    Change Room
                    <span
                      style={{ fontSize: "16px", padding: "0 8px " }}
                      className="material-symbols-outlined"
                    >
                      edit
                    </span>
                  </Button>
                </Nav.Link>
              </>
            ) : (
              <>
                {userCount > 1 && (
                  <Button variant="outline-secondary">
                    <span>Online</span>
                    <Badge className="mx-2" bg="success">
                      {userCount - 1}
                    </Badge>
                  </Button>
                )}
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default ReactNav;
