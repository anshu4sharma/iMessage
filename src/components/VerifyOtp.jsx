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
      url: "https://userdata.onrender.com/users/verify",
      headers: { "Content-Type": "application/json" },
      data: {
        email: location.state,
        otp: values.otp,
      },
    });
    if (data.data === "wrong otp") {
      alert("enter a valid otp");
    } else if (data.data === "Verified") {
      localStorage.setItem("IsLoggedin", true);
      navigate("/chat");
    }
  };
  // console.log(location);
  let IsLoggedin = localStorage.getItem("IsLoggedin");
  if (!location.state) {
    navigate(-1);
  } else if (IsLoggedin) {
    navigate("/chat");
  }
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
                  className="my-2"
                  onChange={handleChange}
                  placeholder="Type here ..."
                  contentLeft={<Password fill="currentColor" />}
                />
                <Button type="submit" className="my-3">
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
