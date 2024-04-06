import React, { useEffect, useState } from "react";
import { Avatar, Space, Table } from "antd";
// import user from "../../../../../assets/images/user.png";
import { useParams } from "react-router-dom";
// import { socket } from "../../../../context/socket";
import Loading from "../../../../components/Admin/Loading/Loading";

import styles from "../style.module.scss";
import AssistantCounselorAdd from "../Add";
const { io } = require("socket.io-client");

let socket = null;
const messageList = [];

const MessagesDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
      socket = io('https://malath.onrender.com/', {
    extraHeaders: {
      // "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${JSON?.parse(localStorage?.getItem("user"))?.token}`
    },
    withCredentials: true,
    });
    // if (id) {
    console.log(
      "🚀 ~ file: index.jsx:19 ~ useEffect ~ id:111111111111111111111111111111111111111111111111111",
      id
    );
    // setLoading(true);
    socket.emit("openConversation", { conversationid: id });
    socket.on("getConversationMessages", function (message) {
      console.log("received updated count from server: " + message);
      let aa = JSON.stringify(message);
      console.log(
        "🚀 ~ file: index.jsx:16 ~ socket.on ~ aa:",
        JSON.parse(JSON.stringify(message))
      );
      setData(JSON.parse(JSON.stringify(message)));
      // setLoading(false);
    });
    // }

    socket.on("newMessage", function (message) {
      console.log("received new message: " + message);
      const obj = JSON.parse(JSON.stringify(message));
      messageList.push(obj);
      console.log(obj);
    });
    
  }, []);

  useEffect(() => {
    // socket.on("newMessage",  function () {
    //   console.log("🚀 ~ file: index.jsx:35 ~ socket.on ~ message:");
    // });
  }, []);

  useEffect(() => {
   
  }, []);
  
  
 

  // useEffect(() => {
  //   console.log(data);
  // }, [socket]);

  // socket.on('event', (data)=>{
  //     console.log(data)
  // });

  return (
    <>
      <div className="mb-15 group-btn">
        {/* <button
          className="btn btn-blocked"
          onClick={() => {
            confirm({ type: "multible" });
          }}
        >
          <span className="icon">
            <FaBan />
          </span>
          تعطيل
        </button> */}
      </div>
      <div className={`${styles["message"]}`}>
        {loading ? (
          <div className="pt-20 pb-20">
            <Loading />
          </div>
        ) : (
          <>
            <div className={`${styles["message-head"]}`}>
              <div className="d-flex align-items-center">
                <Avatar size={50} shape="circle" src={data?.avatar} />
                <h5 className="mr-5 ml-5">{data?.full_name}</h5>
              </div>
            </div>
            <div className={`${styles["message-body"]}`}>
              {data?.messages?.map((item) => (
                <div
                  className={`${styles["message-item"]} ${
                    item?.senderid === 0 ? `${styles["message-received"]}` : ""
                  }`}
                >
                  <div className="d-flex align-items-start">
                    <div className={`${styles["message-content"]} ml-5`}>
                      {item?.text}
                    </div>
                    {item?.senderid != 0 ? (
                      <Avatar size={50} shape="circle" src={data?.avatar} />
                    ) : null}
                  </div>
                  <div className={`${styles["message-date"]}`}>
                    {item?.created_at}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <div className={`${styles["message-footer"]}`}>
          {/* <AssistantCounselorAdd id={id} /> */}
        </div>
      </div>
    </>
  );
};

export default MessagesDetails;
