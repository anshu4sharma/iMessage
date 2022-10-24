import React, { useEffect } from "react";
import { useRef } from "react";
import LoadingBar from 'react-top-loading-bar'

// import { Text } from "@nextui-org/react";
const ChatPage = ({ msgRec, pvtmsg, room }) => {
  const msgref = useRef();
  const scrolltoView = () => {
    let windowHeight = window.innerHeight;
    if (msgref.current?.lastChild) {
      msgref.current?.lastChild.scrollIntoView() ||
        window.scrollTo(0, windowHeight * windowHeight);
    }
  };
  useEffect(() => {
    scrolltoView();
  }, [msgRec, msgref.current?.lastChild]);
  return (
    <>
      <div className="home-page">
        <div className="container message-container">
          <div
            ref={msgref}
            className="my-1 msg-container"
            id="message-container-child"
          >
            {/* <Text
              small
              css={{
                borderRadius: "$xs", // radii.xs
                border: "$space$1 solid transparent",
                height: "$12", // space[12]
                boxShadow: "$md", // shadows.md
                display: "flex",
                justifyContent: "center",
              }}
              weight="light"
            >
              Anshu had left the Chat
            </Text> */}
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
                      <span style={{ fontSize: "12px" }}>{data.Usrname}</span>
                      <li> {data.msg}</li>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
