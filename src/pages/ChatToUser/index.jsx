import React, { useEffect, useState } from "react";
import { useRef } from "react";
import moment from "moment";
import { Container } from "@nextui-org/react";
import { decodeToken } from "react-jwt";
import { authtoken } from "../../constants";
import { SocketProvider, useSocket } from "../../context/Socket";
import { useUserContext } from "../../context/UserDetails";
import MessageForm from "../../components/MessageForm";
import { useParams } from "react-router-dom";
const Index = ({  }) => {
  const { socket } = useSocket();
  const { user } = useUserContext();
  const [msg, setMsg] = useState("");
  const { receiverId } = useParams();
  const [msgRec,setmsgRec] = useState([])
  const msgref = useRef();
  const scrolltoView = () => {
    let windowHeight = window.innerHeight;
    if (msgref.current?.lastChild) {
      msgref.current?.lastChild.scrollIntoView() ||
        window.scrollTo(0, windowHeight * windowHeight);
    }
  };
  const tapToScroll = (event) => {
    if (msgref.current?.contains(event.target)) {
      scrolltoView();
    }
  };
  useEffect(() => {
    scrolltoView();
  }, [msgRec, msgref.current?.lastChild]);

  const sendMsg = async () => {
    socket.emit("send_personal_msg", { msg, Usrname:user.name, receiverId, id: user.id });
    setMsg("");
  };
  useEffect(() => {
    if (!socket) {
      return;
    }
    // Send message to specific user
    // socket.on("send_personal_msg", async (data) => {
    //   const { id, msg, Usrname } = data;
    //   let socketIdTosend = onlineUser.get(id);
    //   const newMsg = new Msg(data);
    //   await newMsg.save();
    // });

    socket.on("received_personal_msg", (data) => {
      console.log(data);
      setmsgRec((prev) => [...prev, data]);
    });
    return () => {};
  }, [socket]);

  return (
    <>
      <div className="home-page">
        <Container className=" message-container">
          <div
            ref={msgref}
            className="my-1 msg-container"
            id="message-container-child"
            onClick={tapToScroll}
          >
            {msgRec?.map((data, index) => {
              return (
                <div
                  className={
                    data?.id === user?.id
                      ? "outgoing-msg"
                      : "upcoming-message"
                  }
                  key={index}
                >
                  <span className="recMsgusername" style={{ fontSize: "12px" }}>
                    {data?.Usrname}
                  </span>
                  <li> {data?.msg}</li>
                  <span className="messageTimestamp">
                    {moment(data?.timeStamp).format("LTS").toString()}
                  </span>
                </div>
              );
            })}
          </div>
        </Container>
      </div>
      <MessageForm sendMsg={sendMsg} setMsg={setMsg} msg={msg} />
    </>
  );
};

export default Index;
