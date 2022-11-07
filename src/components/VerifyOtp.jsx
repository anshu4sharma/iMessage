import React from "react";
import { Button, Card, Input, Container } from "@nextui-org/react";
import { useFormik } from "formik";
import axios from "axios";
import { Password } from "./Password";
import { useLocation, useNavigate } from "react-router-dom";
import char from "../assets/images/char1.png";
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
        email: location?.state?.email,
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
  if (!location?.state?.email) {
    navigate(-1);
  }
  return (
    <>
      <div className="loginpage verifyotp">
        <Container>
          <Card css={{ p: "$6", mw: "400px"  , background: "#e5e5f7" , border:"4px solid white" }}>
            <div className="loginpagechar">
              <img src={char} alt="char" width={"100"} height="100" />
            </div>
            <Card.Body>
              <form onSubmit={handleSubmit}>
                <Input
                  aria-label="Verification code"
                  value={values.otp}
                  fullWidth
                  required
                  label="Enter the verification code"
                  color="primary"
                  name="otp"
                  size="lg"
                  onChange={handleChange}
                  placeholder="Type here ..."
                  minLength="4"
                  maxLength="4"
                  contentLeft={<Password fill="currentColor" />}
                />
                <Button
                  auto
                  type="submit"
                  bordered
                  className="mt-5 w-100"
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
