import React, { useRef } from "react";
import { Input, Container } from "@nextui-org/react";
import { SendButton } from "./SendButton.jsx";
import { SendIcon } from "./SendIcon.jsx";
const MessageForm = ({
  msg,
  sendMsg = () => {},
  setMsg,
  room = "",
  sendPvtMsg = () => {},
}) => {
  const msgInput = useRef(null);
  const appendElem = () => {
    const para = document.createElement("p");
    const text = document.createTextNode(msg);
    para.appendChild(text);
    const div = document.createElement("div");
    div.classList.add("outgoing-msg");
    div.appendChild(para);
    const nodeDiv = div.cloneNode(true);
    document.getElementById("message-container-child").append(nodeDiv);
  };
  const formSubmit = (e) => {
    e.preventDefault();
    if (room === "") {
      sendMsg();
    } else {
      sendPvtMsg();
    }
    appendElem();
    msgInput.current.focus();
  };
  return (
    <footer>
      <Container>
        <form onSubmit={formSubmit} className="grid my-2  message-form">
          <Input
            contentRightStyling={false}
            placeholder="Type your message..."
            contentRight={
              <SendButton disabled={msg.length < 1}>
                <SendIcon />
              </SendButton>
            }
            aria-label="send-sms"
            id="send-message"
            required
            autoComplete="off"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            ref={msgInput}
            size="lg"
            fullWidth
          />
        </form>
      </Container>
    </footer>
  );
};

export default MessageForm;
