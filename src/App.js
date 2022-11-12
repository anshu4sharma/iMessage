import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/SignUp";
import VerifyOtp from "./pages/VerifyOtp";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
const socket = io("https://imessage.up.railway.app");
// const socket = io("http://localhost:4000");
function App() {
  const [msg, setMsg] = useState("");
  const [room, setRoom] = useState("");
  const [msgRec, setmsgRec] = useState([]);
  const [pvtmsg, setpvtmsg] = useState([]);
  let UserName = localStorage?.getItem("name") ?? "";
  const [Usrname, setmUserName] = useState(UserName);
  const [userCount, setUserCount] = useState(0);
  const sendMsg = async () => {
    socket.emit("send_msg", { msg, Usrname });
    setMsg("");
  };
  const sendPvtMsg = async () => {
    socket.emit("send_pvt_msg", { msg, room, Usrname });
    setMsg("");
  };
  useEffect(() => {
    socket.on("all_messages", async (data) => {
      setmsgRec(data);
    });
    socket.on("received_msg", async (data) => {
      setmsgRec((prev) => [...prev, data]);
    });
    socket.on("pvt_received_msg", async (data) => {
      // this will braodcast message to other open another window to see result
      setpvtmsg((prev) => [...prev, data]);
    });
    socket.on("userCount", (data) => {
      setUserCount(data);
    });
    // eslint-disable-next-line
  }, [socket]);
  const joinRoom = () => {
    if (room !== "") {
      socket.on("showRoomMessages", async (data) => {
        setpvtmsg(data);
      });
      socket.emit("join_room", room);
    }
  };
  return (
    <>
      <LoadingBar
        color="#2998ff"
        height={"6px"}
        progress={100}
        onLoaderFinished={0}
      />
      <Routes>
        <Route path="/" element={<LoginPage setmUserName={setmUserName} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify" element={<VerifyOtp />} />
        <Route
          path="/chat"
          element={
            <Home
              room={room}
              setRoom={setRoom}
              joinRoom={joinRoom}
              setmUserName={setmUserName}
              userCount={userCount}
              Usrname={Usrname}
              msgRec={msgRec}
              pvtmsg={pvtmsg}
              socket={socket}
              msg={msg}
              sendPvtMsg={sendPvtMsg}
              sendMsg={sendMsg}
              setMsg={setMsg}
            />
          }
        />
        <Route path="*" element={<LoginPage setmUserName={setmUserName} />} />
      </Routes>
    </>
  );
}

export default App;
