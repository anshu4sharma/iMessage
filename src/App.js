import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import ChatPage from "./components/ChatPage";
import MessageForm from "./components/MessageForm";
import ReactNav from "./components/ReactNav";
import Sound from "./assets/Sounds/notification.mp3";
import LoginPage from "./components/LoginPage";
//  it's import to initialize it here
// const socket = io("https://socket-io-server-production.up.railway.app");
// const socket = io("http://localhost:5000");
// const socket = io("https://socket-server-sq5h.onrender.com");
const socket = io("https://socketserver.adaptable.app");
function App() {
  const [msg, setMsg] = useState(""); 
  const [room, setRoom] = useState("");
  const [msgRec, setmsgRec] = useState([]);
  const [pvtmsg, setpvtmsg] = useState([]);
  let UserName = localStorage?.getItem("userName") ?? "";
  const [Usrname, setmUserName] = useState(UserName);
  const [userCount, setUserCount] = useState(0);
  const audio = new Audio(Sound);
  const submitData = async (msg, userName) => {
    const url =
      "https://reactappanshu-default-rtdb.firebaseio.com/msg_sent.json";
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ msg, userName }),
    });
  };
  const sendMsg = async () => {
    await socket.emit("send_msg", { msg, Usrname });
    submitData(msg, Usrname);
    setMsg("");
  };
  const sendPvtMsg = async () => {
    await socket.emit("send_pvt_msg", { msg, room, Usrname });
    submitData(msg, Usrname);
    setMsg("");
  };
  useEffect(() => {
    socket.on("received_msg", async (data) => {
      audio.play();
      // this will braodcast message to other open another window to see result

      setmsgRec((prev) => [...prev, data]);
    });

    socket.on("pvt_received_msg", (data) => {
      audio.play();
      // this will braodcast message to other open another window to see result
      setpvtmsg((prev) => [...prev, data]);
    });

    socket.on("userCount", (data) => {
      setUserCount(data);
    });

    // eslint-disable-next-line
  }, [socket]);
  const postData = async () => {
    const url =
      "https://reactappanshu-default-rtdb.firebaseio.com/room_created.json";
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(room),
    });
  };

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
      postData();
    }
  };

  return (
    <>
      {!UserName ? (
        <LoginPage   setmUserName={setmUserName} />
      ) : (
        <>
          <ReactNav
            room={room}
            setRoom={setRoom}
            joinRoom={joinRoom}
            setmUserName={setmUserName}
            userCount={userCount}
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
      )}
    </>
  );
}

export default App;
