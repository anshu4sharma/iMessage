import React from "react";
import { useNavigate } from "react-router-dom";
const Home = ({ children }) => {
  const navigate = useNavigate();
  let IsLoggedin = localStorage.getItem("IsLoggedin");
  if (!IsLoggedin) {
    navigate("/login");
  }
  return (
    <>
      {children}
    </>
  );
};

export default Home;
