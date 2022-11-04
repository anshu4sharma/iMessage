import {
  Navbar,
  Modal,
  Button,
  Link,
  Text,
  Input,
  Avatar,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
export default function NavbarReact({
  room,
  setRoom,
  joinRoom,
  Usrname,
  setmUserName,
}) {
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
  const authtoken = localStorage.getItem("authtoken");
  const fetchUserDetails = async () => {
    let data = await axios({
      method: "post",
      url: "https://userapi.azurewebsites.net/users/getuser",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authtoken,
      },
    });
    setmUserName(data.data.name);
  };
  useEffect(() => {
    if (authtoken !== undefined || null) {
      fetchUserDetails();
    }
  }, []);
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
      <div>
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
              Enter your Room Id
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
                  onClick={closeHandler}
                >
                  Join room
                </Button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}
