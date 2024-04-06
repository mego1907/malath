import React, { useEffect, useState } from "react";
import { Avatar } from "antd";
// import user from "../../../../../assets/images/user.png";
import { useParams } from "react-router-dom";
import { socket } from "../../../../context/socket";
import Loading from "../../../../components/Admin/Loading/Loading";

import styles from "../style.module.scss";
import AssistantCounselorAdd from "../Add";


const MessagesDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    // connect to the server
    // http://localhost:4000
    socket.emit("openConversation", { conversationid: id });
    socket.on("getConversationMessages", function (message) {
      console.log("received updated count from server: ");
      setData(JSON.parse(JSON.stringify(message)));
    });
  }, [data]);

  useEffect(() => {
    socket.on("newMessage", function (message) {
      console.log("received new message: " + message);
      console.log("received new  data: " + data);
      const obj = JSON.parse(JSON.stringify(message));
      if(data.length > 0){

        console.log("🚀 ~ file: index.jsx:35 ~ obj:", data)
        console.log("🚀 ~ file: index.jsx:35 ~ obj:", obj)
        let newTabData = [...data.messages];
        const id = obj.id; // id to be removed
        const index = newTabData.findIndex((data) => data.id === id);
        if (index > -1) {
          newTabData.splice(index, 1, obj);
        } else {
        newTabData.push(obj);
      }

      setData({ messages: newTabData });
    }
    });
  }, [data]);



  return (
    <>
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
          <AssistantCounselorAdd id={id} />
        </div>
      </div>
    </>
  );
};

export default MessagesDetails;
