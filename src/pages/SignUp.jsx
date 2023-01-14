import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Input,
  Container,
  Text,
  Row,
  Loading,
} from "@nextui-org/react";
import axios from "axios";
import { Mail } from "../components/Mail";
import { Password } from "../components/Password";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import char from "../assets/images/char1.png";
import signupSchema from "../components/schema/signupSchema";
function LoginPage() {
  const [iserror, setIserror] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const navigate = useNavigate();
  const submitForm = async () => {
    try {
      setIsloading(true);
      let data = await axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER_URL}/users`,
        headers: { "Content-Type": "application/json" },
        data: {
          name: values.name,
          email: values.email,
          password: values.password,
        },
      });
      if (data.status === 200) {
        localStorage.setItem("name", values.name);
        navigate("/verify", { state: { email: values.email } });
      }
    } catch (error) {
      setIserror(true);
      setIsloading(false);
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

  useEffect(() => {
    const authToken = localStorage.getItem('authtoken')
    if (authToken) {
      navigate('/chat')
    }
  }, [])
  return (
    <>
      <div className="loginpage">
        <Container>
          <Card
            css={{
              p: "$6",
              mw: "400px",
              background: "#e5e5f7",
              border: "4px solid white",
            }}
          >
            <div className="loginpagechar">
              <img src={char} alt="char" width={"100"} height="100" />
            </div>
            <Card.Body>
              <form onSubmit={handleSubmit}>
                <Input
                  aria-label="name"
                  label="Name"
                  placeholder="Enter your name"
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
                  {isloading ? (
                    <Button className="my-2" auto>
                      <Loading type="default" color={"white"} />
                    </Button>
                  ) : (
                    <Button className="my-2" type="submit" auto bordered>
                      Create Account
                    </Button>
                  )}

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
