import React, { useState } from "react";
import { Button, Card, Input, Container } from "@nextui-org/react";
function LoginPage({ setmUserName }) {
  const [userName, setUsername] = useState("");
  const formSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userName", userName);
    setmUserName(userName);
  };
  return (
    <Container className="loginpage">
      <Card css={{ mw: "400px" }}>
        <Card.Body>
          <form onSubmit={formSubmit}>
            <Input
              clearable
              helperText="Please enter your name"
              label="Name"
              placeholder="Enter your name"
              required
              type="text"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button className="mt-5" type="submit">
              Submit
            </Button>
          </form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default LoginPage;
