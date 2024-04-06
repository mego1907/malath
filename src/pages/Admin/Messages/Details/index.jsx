import React, { useEffect, useRef, useState } from "react";
import { Avatar } from "antd";
import user from "../../../../assets/images/user.png";
import { useParams } from "react-router-dom";
import { socket } from "../../../../context/socket";
import Loading from "../../../../components/Admin/Loading/Loading";

import styles from "../style.module.scss";
import AssistantCounselorAdd from "../Add";
import { openMesssageSingle } from "../../../../socketConnection";
import { useSelector } from "react-redux";

const MessagesDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const { dataMessagesSingle } = useSelector(
    (state) => state.messagesSingle
    );
    

  useEffect(() => {
    openMesssageSingle(id);
  }, [id]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    if(dataMessagesSingle){
      setLoading(false)
    }
  }, [dataMessagesSingle , loading]);

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
                <Avatar
                  size={50}
                  shape="circle"
                  src={dataMessagesSingle?.avatar ? dataMessagesSingle?.avatar : user}
                />
                <h5 className="mr-5 ml-5">{dataMessagesSingle?.full_name}</h5>
              </div>
            </div>
            <div className={`${styles["message-body"]}`}>
              {dataMessagesSingle?.messages?.map((item) => (
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
                      <Avatar
                        size={50}
                        shape="circle"
                        src={dataMessagesSingle?.avatar ? dataMessagesSingle?.avatar : user}
                      />
                    ) : null}
                  </div>
                  <div className={`${styles["message-date"]}`}>
                    {item?.created_at}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
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
