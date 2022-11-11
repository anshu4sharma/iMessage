import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatPage from "../components/ChatPage";
import MessageForm from "../components/MessageForm";
import NavbarReact from "../components/Navbar/NavbarReact";
const Home = ({
  room,
  setRoom,
  joinRoom,
  setmUserName,
  userCount,
  Usrname,
  msgRec,
  pvtmsg,
  socket,
  msg,
  sendPvtMsg,
  sendMsg,
  setMsg,
}) => {
  const navigate = useNavigate();
  let IsLoggedin = localStorage.getItem("IsLoggedin");
  let authtoken = localStorage.getItem("authtoken");

  useEffect(() => {
    if (IsLoggedin == null || undefined) {
      navigate("/");
    }
  }, [IsLoggedin, authtoken]);

  return (
    <>
      <NavbarReact
        room={room}
        setRoom={setRoom}
        joinRoom={joinRoom}
        setmUserName={setmUserName}
        userCount={userCount}
        Usrname={Usrname}
      />
      <ChatPage
        room={room}
        setmUserName={setmUserName}
        setRoom={setRoom}
        msgRec={msgRec}
        pvtmsg={pvtmsg}
        socket={socket}
        Usrname={Usrname}
      />
      <MessageForm
        msg={msg}
        Usrname={Usrname}
        sendPvtMsg={sendPvtMsg}
        sendMsg={sendMsg}
        setMsg={setMsg}
        room={room}
        socket={socket}
      />
    </>
  );
};

export default Home;
