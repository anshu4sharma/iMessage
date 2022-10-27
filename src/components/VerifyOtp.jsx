import React from "react";
import { Button, Card, Input, Container, Text } from "@nextui-org/react";
import { useFormik } from "formik";
import axios from "axios";
import { Password } from "./Password";
import { useLocation, useNavigate } from "react-router-dom";
const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { handleSubmit, values, handleChange } = useFormik({
    initialValues: {
      otp: "",
    },
    onSubmit: () => {
      verifyCode();
    },
  });
  const verifyCode = async () => {
    let data = await axios({
      method: "post",
      url: "https://userapi.azurewebsites.net/users/verify",
      headers: { "Content-Type": "application/json" },
      data: {
        email: location.state.email,
        otp: values.otp,
      },
    });
    if (data.data === "wrong otp") {
      alert("enter a valid otp");
    } else if (data.data === "Verified") {
      navigate("/");
    }
  };
  // console.log(location);
  if (!location.state.email) {
    navigate(-1);
  }
  return (
    <>
      <div className="loginpage">
        <Container>
          <Card css={{ p: "$4", mw: "400px" }}>
            <Card.Header>
              <Text
                css={{
                  textGradient: "45deg, $blue600 -20%, $pink600 50%",
                }}
                b
                size={24}
                h1
              >
                Enter the verification code
              </Text>
            </Card.Header>
            <Card.Body>
              <form onSubmit={handleSubmit}>
                <Input
                  aria-label="Verification code"
                  bordered
                  value={values.otp}
                  fullWidth
                  required
                  label="Verification code"
                  color="primary"
                  name="otp"
                  size="lg"
                  onChange={handleChange}
                  placeholder="Type here ..."
                  contentLeft={<Password fill="currentColor" />}
                />
                <Button
                  auto
                  bordered
                  color="gradient"
                  type="submit"
                  className="my-3 w-100"
                >
                  Submit
                </Button>
              </form>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default VerifyOtp;
