import React, { useState } from "react";
import { Button, Card, Input, Container, Text, Row } from "@nextui-org/react";
import axios from "axios";
import { Mail } from "./Mail";
import { Password } from "./Password";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import char from "../assets/images/char1.svg";
import signupSchema from "./schema/signupSchema";
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

  const { handleSubmit, values, handleChange, touched, errors } = useFormik({
    initialValues: {
      name: "",
      password: "",
      email: "",
    },
    validationSchema: signupSchema,
    onSubmit: () => {
      submitForm();
    },
  });

  return (
    <>
      <div className="loginpage">
        <Container>
          <Card css={{ p: "$6", mw: "400px", background: "#e5e5f7" , border:"2px solid white" }}>
            <div className="loginpagechar">
              <img src={char} alt="char" width={"100"} height="100" />
            </div>
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
                  fullWidth
                  className="my-2"
                  value={values.name}
                  minLength={2}
                  onChange={handleChange}
                  name="name"
                />

                {errors.name && touched.name ? (
                  <Text color="error">{errors.name}</Text>
                ) : null}
                <Input
                  aria-label="email"
                  label="Email"
                  name="email"
                  fullWidth
                  type="email"
                  color="primary"
                  size="lg"
                  minLength={5}
                  value={values.email}
                  placeholder="Email"
                  contentLeft={<Mail fill="currentColor" />}
                  className="my-2"
                  onChange={handleChange}
                />
                {errors.email && touched.email ? (
                  <Text color="error">{errors.email}</Text>
                ) : null}
                <Input.Password
                  aria-label="password"
                  value={values.password}
                  fullWidth
                  label="Password"
                  color="primary"
                  name="password"
                  size="lg"
                  className="my-2"
                  onChange={handleChange}
                  placeholder="Password"
                  contentLeft={<Password fill="currentColor" />}
                />
                {errors.password && touched.password ? (
                  <Text color="error">{errors.password}</Text>
                ) : null}
                {iserror && (
                  <Row>
                    <Text color="error">
                      User with email id already exists !
                    </Text>
                  </Row>
                )}
                <Row className="gap-2">
                  <Button className="my-2" type="submit" auto bordered>
                    Create Account
                  </Button>

                  <Button onClick={() => navigate(-1)} className="my-2 " auto>
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
