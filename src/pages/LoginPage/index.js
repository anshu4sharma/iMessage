import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  Input,
  Container,
  Text,
  Row,
  Loading,
} from "@nextui-org/react";
import { Mail } from "../../components/Mail";
import { useNavigate } from "react-router-dom";
import { Password } from "../../components/Password";
import { useFormik } from "formik";
import loginSchema from "../../components/schema/loginSchema";
import { toast } from "react-hot-toast";
export function LoginPage() {
  const navigate = useNavigate();
  const [isloading, setIsloading] = useState(false);
  const fetchData = async () => {
    try {
      setIsloading(true);
      let { data, status } = await axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER_URL}/users/login`,
        headers: { "Content-Type": "application/json" },
        data: { email: values.email, password: values.password },
      });
      if (status === 200) {
        localStorage.setItem("authtoken", data?.authToken);
        navigate(0);
        toast.success("Logged in successfully !");
      }
    } catch (error) {
      console.log(error?.response);
      toast.error(error?.response?.data);
    } finally {
      setIsloading(false);
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
  return (
    <div className="loginpage">
      <Container>
        <Card
            css={{
            mw: "400px",
            minWidth: "400px",
            p: 6,
            background: "#e5e5f7",
            border: "4px solid white",
          }}
        >
          <div className="loginpagechar">
            <img src={"./char1.png"} alt="char" width={"100"} height="100" />
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

              <Row>
                {isloading ? (
                  <Button className="my-3 w-75 mx-2" auto>
                    <Loading type="default" color={"white"} />
                  </Button>
                ) : (
                  <Button className="my-3 w-75 mx-2" type="submit" auto>
                    Login
                  </Button>
                )}
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
