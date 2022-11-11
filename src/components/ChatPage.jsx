import React, { useEffect } from "react";
import { useRef } from "react";
import moment from "moment";
import { Container } from "@nextui-org/react";
const ChatPage = ({ msgRec, pvtmsg, room }) => {
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
            {room === ""
              ? msgRec?.map((data, index) => {
                  return (
                    <div className="upcoming-message" key={index}>
                      <span className="recMsgusername" style={{ fontSize: "12px" }}>{data?.Usrname}</span>
                      <li> {data?.msg}</li>
                      <span className="messageTimestamp">
                        {moment(data?.timeStamp).format('LTS').toString()}
                      </span>
                    </div>
                  );
                })
              : pvtmsg?.map((data, index) => {
                  return (
                    <div className="upcoming-message" key={index}>
                      <span  className="recMsgusername"  style={{ fontSize: "12px" }}>{data?.Usrname}</span>
                      <li> {data?.msg}</li>
                      <span className="messageTimestamp">
                        {moment(data?.timeStamp).format('LTS').toString()}
                      </span>
                    </div>
                  );
                })}
          </div>
        </Container>
      </div>
    </>
  );
};

export default ChatPage;
