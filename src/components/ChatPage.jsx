import React, { useEffect } from "react";
import LoginPage from "./LoginPage";
import Badge from "react-bootstrap/Badge";
import { ToastContainer, toast } from "react-toastify";

const ChatPage = ({ msgRec, pvtmsg, room, setmUserName, socket, Usrname }) => {
  useEffect(() => {
    socket.on("user_left", () => {
      toast(`Someone had left the chat !`);
    });
  }, [socket]);
  useEffect(() => {
    let Someone = "Someone";
    socket.on("new_user_joined", (data) => {
      toast(`${data.Usrname || Someone}  has joined the chat`);
    });
  }, []);

  return (
    <>
      {Usrname ? (
        <>
          <ToastContainer />
          <div className="container message-container">
            <div className="my-1 upcoming-msg-parent">
              {room === ""
                ? msgRec.map((data, index) => {
                    return (
                      <div className="upcoming-message" key={index}>
                        <Badge bg="secondary">{data.Usrname}</Badge>
                        <li> {data.msg}</li>
                      </div>
                    );
                  })
                : pvtmsg.map((data, index) => {
                    return (
                      <div className="upcoming-message" key={index}>
                        <li> {data.msg}</li>
                      </div>
                    );
                  })}
            </div>
            <div id="outgoing-msg"></div>
          </div>
        </>
      ) : (
        <LoginPage setmUserName={setmUserName} />
      )}
    </>
  );
};

export default ChatPage;
