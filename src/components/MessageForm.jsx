import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
const MessageForm = ({
  msg,
  sendMsg,
  setMsg,
  room,
  sendPvtMsg,
  Usrname,
  socket,
}) => {
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
  };
  useEffect(() => {
    socket.emit("user_joined", { Usrname });
    // eslint-disable-next-line
  }, []);
  return (
    <footer>
      <Form onSubmit={formSubmit} className="grid my-2 mx-4 message-form">
        <Form.Control
          as="textarea"
          rows={1}
          required
          autoComplete="off"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Message"
        />
        <Button type="submit" variant="success send-message">
          <span class="material-symbols-outlined">send</span>
        </Button>
      </Form>
    </footer>
  );
};

export default MessageForm;
