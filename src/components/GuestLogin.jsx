import React, { useState } from "react";
import {
  Button,
  Card,
  Input,
  Container,
  Text,
  Loading,
} from "@nextui-org/react";
import { Mail } from "./Mail";
import { Password } from "./Password";
function LoginPage({ setmUserName }) {
  const [userName, setUsername] = useState("");
  const loginasGuest = () => {
    sessionStorage.setItem("userName", userName);
    setmUserName(userName);
  };

  const [isGuestUser, setisGuestUser] = useState(false);
  return (
    <div className="loginpage">
      <Container>
        <Card css={{ p: "$6", mw: "400px" }}>
          <Card.Header>
            <Text
              css={{
                textGradient: "45deg, $blue600 -20%, $pink600 50%",
              }}
              b
              size={28}
              h1
            >
              Welcome to iMessage
            </Text>
          </Card.Header>
          <Card.Body>
            <>
              <Input
                aria-label="name"
                clearable
                label="Name"
                placeholder="Enter your name"
                required
                type="text"
                color="primary"
                size="lg"
                bordered
                fullWidth
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
              />
            </>
          </Card.Body>
          <Card.Footer className="gap-2">
            <Button auto disabled={userName.length < 4} onClick={loginasGuest}>
              Continue as Guest!
            </Button>
          </Card.Footer>
        </Card>
      </Container>
    </div>
  );
}

export default LoginPage;
