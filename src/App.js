import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Sound from "./assets/Sounds/notification.mp3";
import LoginPage from "./components/LoginPage";
import SignUp from "./components/SignUp";
import Home from "./Home";
import { Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import VerifyOtp from "./components/VerifyOtp";
const socket = io("https://scoket.azurewebsites.net");
function App() {
  const [msg, setMsg] = useState("");
  const [room, setRoom] = useState("");
  const [msgRec, setmsgRec] = useState([]);
  const [pvtmsg, setpvtmsg] = useState([]);
  let UserName = localStorage?.getItem("name") ?? "";
  const [Usrname, setmUserName] = useState(UserName);
  const [userCount, setUserCount] = useState(0);
  const audio = new Audio(Sound);
  const sendMsg = async () => {
    await socket.emit("send_msg", { msg, Usrname });
    setMsg("");
  };
  const sendPvtMsg = async () => {
    await socket.emit("send_pvt_msg", { msg, room, Usrname });
    setMsg("");
  };
  useEffect(() => {
    socket.on("received_msg", async (data) => {
      // this will braodcast message to other open another window to see result
      await setmsgRec((prev) => [...prev, data]);
      await audio.play();
    });
    socket.on("pvt_received_msg", async (data) => {
      // this will braodcast message to other open another window to see result
      await setpvtmsg((prev) => [...prev, data]);
      await audio.play();
    });
    socket.on("userCount", (data) => {
      setUserCount(data);
    });
    // eslint-disable-next-line
  }, [socket]);
  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
      console.log("Joined", room);
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
