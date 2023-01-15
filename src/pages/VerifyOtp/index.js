import React, { useEffect } from "react";
import {
  Button,
  Card,
  Input,
  Container,
  Loading,
} from "@nextui-org/react";
import { useFormik } from "formik";
import axios from "axios";
import { Password } from "../../components/Password";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
const VerifyOtp = () => {
  const [isloading, setisLoading] = useState(false);
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
    try {
      setisLoading(true);
      let data = await axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER_URL}/users/verify`,
        headers: { "Content-Type": "application/json" },
        data: {
          email: location?.state?.email,
          otp: values.otp,
        },
      });
      if (data.status === 200) {
        toast.success("Successfully Verified!");
        navigate("/");
      }
    } catch (error) {
      toast.error("An error occured !");
    } finally {
      setisLoading(false);
    }
  };
  useEffect(() => {
    if (!location?.state?.email) {
      navigate(-1);
    }
  }, [location?.state?.email, navigate]);

  return (
    <>
      <div className="loginpage verifyotp">
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
              <img src={"./char1.png"} alt="char" width={"100"} height="100" />
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
                  type="number"
                  max="9999"
                  contentLeft={<Password fill="currentColor" />}
                />
                {isloading ? (
                  <Button auto type="submit" className="mt-5 w-100">
                    <Loading type="default" color={"white"} />
                  </Button>
                ) : (
                  <Button auto type="submit" bordered className="mt-5 w-100">
                    Submit
                  </Button>
                )}
              </form>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default VerifyOtp;
