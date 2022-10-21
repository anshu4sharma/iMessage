import {
  Navbar,
  Modal,
  Button,
  Link,
  Text,
  Input,
  Avatar
} from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo.jsx";
import React, { useState } from "react";
export default function NavbarReact({ room, setRoom, joinRoom, userCount ,Usrname}) {
  const collapseItems = [
    "Features",
    "Pricing",
    "Team",
    "Help & Feedback",
    "Login",
    "Sign Up",
  ];
  const roomSubmit = async (e) => {
    e.preventDefault();
    await joinRoom();
    closeHandler();
  };
  const [visible, setVisible] = useState(false);
  const handler = () => {
    setVisible(true);
  };
  const closeHandler = async () => {
    await joinRoom();
    await setVisible(false);
  };
  return (
    <>
      <Navbar isBordered variant="sticky">
        <Navbar.Brand>
          <Navbar.Toggle aria-label="toggle navigation" />
          <AcmeLogo />
          <Text b color="inherit" hideIn="xs">
            Imessage
          </Text>
        </Navbar.Brand>
        <Navbar.Content enableCursorHighlight hideIn="xs" variant="underline">
          <Navbar.Link href="#">Features</Navbar.Link>
          <Navbar.Link isActive href="#">
            Chat
          </Navbar.Link>
          <Navbar.Link href="#">Pricing</Navbar.Link>
          <Navbar.Link href="#">About Us</Navbar.Link>
        </Navbar.Content>
        <Navbar.Content>
          {room.length > 4 ? (
            <Navbar.Item>
              <Button auto flat as={Link} href="#">
                {room}
              </Button>
            </Navbar.Item>
          ) : (
            <Navbar.Item>
              <Button onPress={handler} auto flat as={Link} href="#">
                Join room
              </Button>
            </Navbar.Item>
          )}
          <Navbar.Item>
            <Avatar pointer text={Usrname.slice(0,1).toUpperCase()} stacked />
            </Navbar.Item>
        </Navbar.Content>
        <Navbar.Collapse>
          {collapseItems.map((item, index) => (
            <Navbar.CollapseItem key={item}>
              <Link
                color="inherit"
                css={{
                  minWidth: "100%",
                }}
                href="#"
              >
                {item}
              </Link>
            </Navbar.CollapseItem>
          ))}
        </Navbar.Collapse>
      </Navbar>
      <div>
        <Modal
          blur
          closeButton
          preventClose
          aria-labelledby="modal-title"
          open={visible}
          onClose={closeHandler}
        >
          <Modal.Header>
            <Text b id="modal-title" size={18}>
              Enter your Room Id
            </Text>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={roomSubmit}>
              <Input
                clearable
                bordered
                fullWidth
                color="primary"
                size="lg"
                placeholder="Room Id"
                required
                value={room}
                onChange={(e) => setRoom(e.target.value)}
              />
            </form>
            {room.length < 4 && (
              <Text color="error">Room id must be at least 4 Characters</Text>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button disabled={room.length < 4} auto onClick={closeHandler}>
              Join room
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
