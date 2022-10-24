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
import { useNavigate } from "react-router-dom";
import { Password } from "./Password";
function LoginPage({ setmUserName }) {
  const [userName, setUsername] = useState("");
  const loginasGuest = () => {
    sessionStorage.setItem("userName", userName);
    setmUserName(userName);
  };
  const navigate = useNavigate();
  let IsLoggedin = localStorage.getItem("IsLoggedin");
  const [isGuestUser, setisGuestUser] = useState(false);
  if (IsLoggedin) {
    navigate("/chat");
  }
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
            ) : (
              <>
                <Input
                  aria-label="email"
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
                  aria-label="password"
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
            <>
              <Button bordered color="gradient" auto>
                Login
              </Button>
              <Button
                bordered
                color="gradient"
                auto
                onClick={() => navigate("signup")}
              >
                Create Account
              </Button>
            </>
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
