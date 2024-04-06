import React, { useEffect, useState } from "react";
import { Avatar, Space, Table } from "antd";
// import user from "../../../../../assets/images/user.png";
import { useParams } from "react-router-dom";
// import { socket } from "../../../../context/socket";
import Loading from "../../../../components/Admin/Loading/Loading";

import styles from "../style.module.scss";
import AssistantCounselorAdd from "../Add";
import { socket } from "../../../../context/socket";
const { io } = require("socket.io-client");
// let socket = null;
const messageList = [];

const MessagesDetails = () => {
  const [count, setCount] = useState(0);


  // socket = io("https://malath.onrender.com/", {
  //     extraHeaders: {
  //       Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTcsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY4MTU2ODYwNX0.FFQlUYaS-CLcfzy3wyrWdVzShty_2SI3fj2hubN7Wao`,
  //     },
  //     withCredentials: true,
  //   });


  console.log("rendering...");
  // after component mount...
  useEffect(() => {
    console.log("component mounted");
    // connect to the server
    // http://localhost:4000

    

    socket.emit("openConversation", { conversationid: 58 });
    socket.on("getConversationMessages", function (message) {
      console.log("received updated count from server: " + message);
      const obj = JSON.parse(JSON.stringify(message));
      messageList.push(obj);
      console.log(obj);
    });
    socket.on("newMessage", function (message) {
      console.log("received new message: " + message);
      const obj = JSON.parse(JSON.stringify(message));
      messageList.push(obj);
      console.log(obj);
    });
  }, []);
  return (
    <div>
      <br />
      <h1>get Message With naeem</h1>
    </div>
  );
}



export default MessagesDetails;
