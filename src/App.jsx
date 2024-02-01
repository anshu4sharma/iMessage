import React, { useState, useEffect, Suspense, lazy } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import {
  ProtectedPages,
  ProtectedAuthPages,
} from "./components/ProtectedPages";
import { useSocket } from "./context/Socket";
import Loader from "./components/Loader";
import { Toaster } from "react-hot-toast";
import { decodeToken } from "react-jwt";
import { authtoken } from "./constants";
import ChatToUser from "./pages/ChatToUser";
import { useUserContext } from "./context/UserDetails";
const Home = lazy(() => import("./pages/Home"));
const SignUp = lazy(() => import("./pages/SignUp"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const VerifyOtp = lazy(() => import("./pages/VerifyOtp"));

function App() {
  const { user } = useUserContext();
  const [msg, setMsg] = useState("");
  const [room, setRoom] = useState("");
  const [msgRec, setmsgRec] = useState([]);
  const [pvtmsg, setpvtmsg] = useState([]);
  let UserName = localStorage?.getItem("name") ?? "";
  const [Usrname, setmUserName] = useState(UserName);
  const [userCount, setUserCount] = useState(0);
  // const [socket, setSocket] = useState(null);
  const { socket } = useSocket();
  const sendMsg = async () => {
    socket.emit("send_msg", { msg, Usrname, id: user.id });
    setMsg("");
  };
  const sendPvtMsg = async () => {
    socket.emit("send_pvt_msg", { msg, room, Usrname, id: user.id });
    setMsg("");
  };
  const set_old_messages_Messages = async (data) => {
    setmsgRec(data);
  };
  const getAllMessages = async (data) => {
    setmsgRec((prev) => [...prev, data]);
  };
  const getAll_PVT_Messages = async (data) => {
    // this will braodcast message to other open another window to see result
    setpvtmsg((prev) => [...prev, data]);
  };
  const get_user_count = (data) => {
    setUserCount(data);
  };
  const sendJWT = () => {
    socket.emit("jwtToken", authtoken);
  };

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on("old_messages", set_old_messages_Messages);
    socket.on("received_msg", getAllMessages);
    socket.on("pvt_received_msg", getAll_PVT_Messages);
    socket.on("userCount", get_user_count);
    socket.on("connect", sendJWT);
    return () => {
      socket.off("old_messages", set_old_messages_Messages);
      socket.off("received_msg", getAllMessages);
      socket.off("pvt_received_msg", getAll_PVT_Messages);
      socket.off("userCount", get_user_count);
    };
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
            <Route path="/chat" element={<ProtectedPages />}>
              <Route
                index
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
              <Route path=":receiverId" element={<ChatToUser msgRec={msgRec}  />} />
            </Route>
            <Route path="*" element={<Navigate to={"/"} />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
