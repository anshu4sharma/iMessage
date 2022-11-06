import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Input, Container, Text, Row } from "@nextui-org/react";
import { Mail } from "./Mail";
import { useNavigate } from "react-router-dom";
import { Password } from "./Password";
import { useFormik } from "formik";
import char from "../assets/images/char1.png";
import loginSchema from "./schema/loginSchema";
function LoginPage() {
  const navigate = useNavigate();
  let IsLoggedin = localStorage.getItem("IsLoggedin");
  const [iserror, setIserror] = useState(false);
  const [isEmailVerified, setisEmailVerified] = useState(false);
  const fetchData = async () => {
    try {
      let data = await axios({
        method: "post",
        url: "https://userapi.azurewebsites.net/users/login",
        headers: { "Content-Type": "application/json" },
        data: { email: values.email, password: values.password },
      });
      if (data?.data?.authToken !== undefined || null) {
        localStorage.setItem("authtoken", data.data.authToken);
        localStorage.setItem("IsLoggedin", true);
        navigate("/chat");
      }
    } catch (error) {
      if (error.response.status === 401) {
        setisEmailVerified(true);
      } else {
        setIserror(true);
      }
    }
  };
  const { handleSubmit, values, handleChange, errors, touched } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: () => {
      fetchData();
    },
  });
  let authToken = localStorage.getItem("authtoken");
  useEffect(() => {
    if (IsLoggedin || authToken) {
      navigate("/chat");
    }
  }, []);
  return (
    <div className="loginpage">
      <Container>
        <Card css={{ p: "$6", mw: "400px", background: "#e5e5f7",border:"4px solid white" }}>
          <div className="loginpagechar">
            <img src={char} alt="char" width={"100"} height="100" />
          </div>
          <Card.Body>
            <form onSubmit={handleSubmit}>
              <Input
                aria-label="email"
                label="Login"
                fullWidth
                color="primary"
                size="lg"
                placeholder="Email"
                contentLeft={<Mail fill="currentColor" />}
                value={values.email}
                className="my-2"
                onChange={handleChange}
                name="email"
                autoComplete="true"
                type="email"
              />

              {errors.email && touched.email ? (
                <Text color="error">{errors.email}</Text>
              ) : null}
              <Input.Password
                aria-label="password"
                autoComplete="true"
                fullWidth
                color="primary"
                size="lg"
                name="password"
                className="my-2"
                placeholder="Password"
                onChange={handleChange}
                value={values.password}
                contentLeft={<Password fill="currentColor" />}
              />

              {errors.password && touched.password ? (
                <Text color="error">{errors.password}</Text>
              ) : null}
              {iserror && (
                <Row>
                  <Text color="error">Please enter valid credentials</Text>
                </Row>
              )}
              {isEmailVerified && (
                <Row>
                  <Text color="error">You have not verified your email.</Text>
                </Row>
              )}
              <Row>
                <Button className="my-3 w-75 mx-2" type="submit" auto>
                  Login
                </Button>
                <Button
                  className="my-3 w-75 mx-2"
                  bordered
                  auto
                  onClick={() => navigate("signup")}
                >
                  Create Account
                </Button>
              </Row>
            </form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default LoginPage;
