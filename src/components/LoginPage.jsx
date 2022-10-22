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
    localStorage.setItem("userName", userName);
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
            {isGuestUser ? (
              <>
                <Input
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
            ) : (
              <>
                <Input
                  clearable
                  bordered
                  fullWidth
                  required
                  color="primary"
                  size="lg"
                  placeholder="Email"
                  contentLeft={<Mail fill="currentColor" />}
                  className="my-2"
                />
                <Input
                  clearable
                  bordered
                  fullWidth
                  required
                  color="primary"
                  size="lg"
                  className="my-2"
                  placeholder="Password"
                  contentLeft={<Password fill="currentColor" />}
                />
              </>
            )}
          </Card.Body>
          <Card.Footer className="gap-2">
            {!isGuestUser ? (
              <>
                <Button auto>Sign in</Button>
                <Button auto>
                  <Loading type="points" color="currentColor" size="sm" />
                </Button>
              </>
            ) : (
              <Button
                auto
                disabled={userName.length < 4}
                onClick={loginasGuest}
              >
                Continue as Guest!
              </Button>
            )}

            <Button
              onClick={() => setisGuestUser(!isGuestUser)}
              auto
              bordered
              color="gradient"
            >
              {isGuestUser ? (
                <span> Login as User </span>
              ) : (
                <span> Login as Guest </span>
              )}
            </Button>
          </Card.Footer>
        </Card>
      </Container>
    </div>
  );
}

export default LoginPage;
