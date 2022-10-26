import React, { useState } from "react";
import { Button, Card, Input, Container, Text, Row } from "@nextui-org/react";
import axios from "axios";
import { Mail } from "./Mail";
import { Password } from "./Password";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

function LoginPage() {
  const [iserror, setIserror] = useState(false);
  const navigate = useNavigate();
  // https://userdata.onrender.com/

  const submitForm = async () => {
    let data = await axios({
      method: "post",
      url: "https://userapi.azurewebsites.net/users",
      headers: { "Content-Type": "application/json" },
      data: {
        name: values.name,
        email: values.email,
        password: values.password,
      },
    });
    if (data.data == "User Already Exists!") {
      setIserror(true);
      navigate("/signup");
    } else {
      localStorage.setItem("name", values.name);
      navigate("/verify", { state: { email: values.email } });
    }
  };

  const { handleSubmit, values, handleChange } = useFormik({
    initialValues: {
      name: "",
      password: "",
      email: "",
    },
    onSubmit: () => {
      submitForm();
    },
  });

  return (
    <>
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
              <form onSubmit={handleSubmit}>
                <Input
                  aria-label="name"
                  label="Name"
                  placeholder="Enter your name"
                  required
                  type="text"
                  color="primary"
                  size="lg"
                  bordered
                  fullWidth
                  className="my-2"
                  value={values.name}
                  minLength={2}
                  onChange={handleChange}
                  name="name"
                />
                <Input
                  aria-label="email"
                  label="Email"
                  bordered
                  name="email"
                  fullWidth
                  type="email"
                  required
                  color="primary"
                  size="lg"
                  minLength={5}
                  value={values.email}
                  placeholder="Email"
                  contentLeft={<Mail fill="currentColor" />}
                  className="my-2"
                  onChange={handleChange}
                />
                <Input.Password
                  aria-label="password"
                  bordered
                  value={values.password}
                  fullWidth
                  required
                  label="Password"
                  color="primary"
                  name="password"
                  size="lg"
                  className="my-2"
                  onChange={handleChange}
                  placeholder="Password"
                  contentLeft={<Password fill="currentColor" />}
                  minLength={4}
                />
                {iserror && (
                  <Row>
                    <Text color="error">
                      User with email id already exists !
                    </Text>
                  </Row>
                )}
                <Row className="gap-2">
                  <Button
                    className="my-2"
                    type="submit"
                    auto
                    bordered
                    color="gradient"
                  >
                    Create Account
                  </Button>

                  <Button
                    onClick={() => navigate(-1)}
                    className="my-2 "
                    auto
                    bordered
                    color="gradient"
                  >
                    Back to login
                  </Button>
                </Row>
              </form>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </>
  );
}

export default LoginPage;
