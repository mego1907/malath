import io from "socket.io-client";

import store from "../store/store";
import {
  getConversationMessages,
  getMessageList,
} from "../store/Admin/actions/message";

let socket = null;

export const socketConnection = () => {
  socket = io("https://malath.onrender.com/", {
    extraHeaders: {
      // "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${
        JSON?.parse(localStorage?.getItem("user"))?.token
      }`,
    },
    withCredentials: true,
  });


  socket.on("getMessageList", function (message) {
    store.dispatch(getMessageList(message));
  });

  socket.on("getConversationMessages", function (message) {
    // console.log("🚀 ~ file: index.js:21 ~ message:", message);
    store.dispatch(getConversationMessages(message));
  });

  socket.on("newMessage", function (message) {
    socket?.emit("openConversation", { conversationid: message?.conversationid });
  });
  
};

export const requestMessageList = ({type , key , value}) => {
  socket?.emit("requestMessageList", { type: type, key: key  , state: value });
};

export const openMesssageSingle = (id) => {
  socket?.emit("openConversation", { conversationid: Number.parseInt(id) });
};


export const deleteMessage = (id , type , key) => {
  socket.emit("deleteConversation", { conversationids: id.toString() } );
  socket?.emit("requestMessageList", { type: type, key: key });
};

export const markResolved = ({id , type , key}) => {
  socket?.emit("markResolved", { conversationid: id });
  socket?.emit("requestMessageList", { type: type, key: key });
};


export const sendNewMessage = ({ text, id }) => {
  socket?.emit("sendNewMessage", {
    text,
    conversationid: id,
  });
  socket?.emit("openConversation", { conversationid: id });
};
