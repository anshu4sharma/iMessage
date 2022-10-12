import React, { useEffect } from "react";
import LoginPage from "./LoginPage";
import { ToastContainer, toast } from "react-toastify";
import { useRef } from "react";

const ChatPage = ({ msgRec, pvtmsg, room, setmUserName, socket, Usrname }) => {
  const msgref = useRef();
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
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (msgref.current?.lastChild) {
      msgref.current.lastChild.scrollIntoView();
      console.log(msgref.current);
    }
  }, [msgRec, msgref.current?.lastChild]);

  return (
    <>
      {Usrname ? (
        <>
          <ToastContainer />
          <div className="container message-container">
            <div
              ref={msgref}
              className="my-1 msg-container"
              id="message-container-child"
            >
              {room === ""
                ? msgRec.map((data, index) => {
                    return (
                      <div className="upcoming-message" key={index}>
                        <span style={{ fontSize: "12px" }}>{data.Usrname}</span>
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
          </div>
        </>
      ) : (
        <LoginPage setmUserName={setmUserName} />
      )}
    </>
  );
};

export default ChatPage;
