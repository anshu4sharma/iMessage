import React, { useState, useEffect, Suspense, lazy } from "react";
import io from "socket.io-client";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import {
  ProtectedPages,
  ProtectedAuthPages,
} from "./components/ProtectedPages";
import Loader from "./components/Loader";
import  { Toaster } from "react-hot-toast";
const Home = lazy(() => import("./pages/Home"));
const SignUp = lazy(() => import("./pages/SignUp"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const VerifyOtp = lazy(() => import("./pages/VerifyOtp"));
const socket = io(process.env.REACT_APP_SOCKET_URL);
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
      <Toaster />
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route element={<ProtectedAuthPages />}>
              <Route
                path="/"
                element={<LoginPage setmUserName={setmUserName} />}
              />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/verify" element={<VerifyOtp />} />
            </Route>
            <Route element={<ProtectedPages />}>
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
            </Route>
            <Route path="*" element={<Navigate to={"/"} />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
