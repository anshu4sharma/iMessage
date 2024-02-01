import {
  Navbar,
  Modal,
  Button,
  Text,
  Input,
  Avatar,
  Container,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";
import {authtoken} from "../../constants"

export default function NavbarReact({
  room,
  setRoom,
  joinRoom,
  Usrname,
  setmUserName,
}) {
  const navigate = useNavigate();
  const roomSubmit = async (e) => {
    e.preventDefault();
    joinRoom();
  };
  const [visible, setVisible] = useState(false);
  const handler = () => {
    setVisible(true);
  };
  const closeHandler = async () => {
    setVisible(false);
  };
  useEffect(() => {
    const fetchUserDetails = async () => {
      const myDecodedToken = decodeToken(authtoken);
      try {
        if (myDecodedToken.name) {
          setmUserName(myDecodedToken.name);
        } else {
          throw Error("Invalid Token");
        }
      } catch (error) {
        console.log("auth failed");
        localStorage.clear();
        navigate(0);
      }
    };
    if (authtoken !== undefined || null) {
      fetchUserDetails();
    }
  }, [navigate, setmUserName]);
  return (
    <>
      <Navbar variant={"sticky"}>
        <Navbar.Brand>
          <Text size={"1.2rem"} b color="primary">
            iMessage
          </Text>
        </Navbar.Brand>
        <Navbar.Content>
          {room.length > 3 ? (
            <Navbar.Item>
              <Button auto flat>
                {room}
              </Button>
            </Navbar.Item>
          ) : (
            <Navbar.Item>
              <Button onPress={handler} auto flat>
                Join room
              </Button>
            </Navbar.Item>
          )}
          {Usrname.length > 1 && (
            <Navbar.Item>
              <Avatar
                pointer
                text={Usrname.slice(0, 1).toUpperCase()}
                stacked
              />
            </Navbar.Item>
          )}
        </Navbar.Content>
      </Navbar>
      <Container>
        <Modal
          blur
          closeButton
          aria-labelledby="submitroom"
          fullScreen
          open={visible}
          onClose={closeHandler}
        >
          <Modal.Header justify="flex-start">
            <Text b id="submitroom" size={18}>
              Create or join a Room
            </Text>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={roomSubmit}>
              <Input
                bordered
                fullWidth
                color="primary"
                size="lg"
                placeholder="Room Id"
                required
                value={room}
                className="my-3"
                onChange={(e) => setRoom(e.target.value)}
                aria-label="join-room"
              />

              {room.length < 4 && (
                <Text>Room id must be uniq and at least of 4 Characters.</Text>
              )}

              <div className="join_roombtn">
                <Button
                  className="my-3"
                  disabled={room.length < 4}
                  auto
                  type="submit"
                  onClick={closeHandler}
                >
                  Join room
                </Button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
}
