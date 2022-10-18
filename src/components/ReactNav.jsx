import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
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
        <Nav className="me-auto">
          <Nav.Link href="#">
            {room !== "" ? (
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip id="button-tooltip-2">
                    You are inside Room {room}
                  </Tooltip>
                }
              >
                <Button variant="outline-secondary">{room}</Button>
              </OverlayTrigger>
            ) : (
              <Button variant="outline-secondary " onClick={handleshowRoom}>
                Join Room
                <span className="visually-hidden">unread messages</span>
              </Button>
            )}
          </Nav.Link>
          {userCount > 1 && (
            <Button variant="outline-secondary">
              <span>Online</span>
              <Badge className="mx-2" bg="success">
                {userCount - 1}
              </Badge>
            </Button>
          )}
          {room !== "" && (
            <>
              <Nav.Link href="/">
                <Button variant="outline-secondary">Exit Room</Button>
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar>
    </>
  );
}

export default ReactNav;
