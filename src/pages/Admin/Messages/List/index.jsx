import React, { useEffect, useState } from "react";
import { socket } from "../../../../context/socket";
import { Avatar, Col, Modal, Row, Select, Space, Table } from "antd";
import EmptyData from "../../../../components/Admin/EmptyData";
import user from "../../../../assets/images/user.png";
import { Link, useParams } from "react-router-dom";
import { FaRegEye, FaRegTrashAlt } from "react-icons/fa";
import MessageFilter from "../Filter";
import {
  deleteMessage,
  markResolved,
  requestMessageList,
} from "../../../../socketConnection";
import { useSelector } from "react-redux";
const { Option } = Select;

const MessagesList = () => {
  const { typeMessage } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const { dataMessages } = useSelector((state) => state.messages);
  const [value, setValue] = useState("0");
  var type = null;
  var state = 0;

  if (typeMessage === "messages") {
    type = 1;
  } else if (typeMessage === "assistant-counselor") {
    type = 2;
  }
  useEffect(() => {
    setLoading(true);
    requestMessageList({ type });
  }, [typeMessage]);

  useEffect(() => {
    setValue("0")
  }, [typeMessage])
  

  useEffect(() => {
    setData(
      dataMessages?.map((row) => ({
        key: row?.id,
        id: row?.id,
        full_name: row?.full_name,
        avatar: row?.avatar,
        text: row?.lastMessage?.text,
        seen: row?.lastMessage?.seen,
        created_at: row?.lastMessage?.created_at,
        phone: row?.phone,
        action: row?.id,
        state: row?.state,
      }))
    );
  }, [dataMessages]);

  useEffect(() => {
    setLoading(true);
    if (dataMessages != undefined) {
      setLoading(false);
    }
  }, [dataMessages]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRowKeys);
    },
  };

  const columns = [
    {
      title: "الإسم",
      dataIndex: ["full_name", "avatar"],
      render: (index, row) => (
        <div key={index}>
          <Avatar size={40} src={row?.avatar ? row?.avatar : user} />{" "}
          {row?.full_name}
        </div>
      ),
    },
    {
      title: "الرسالة",
      dataIndex: "text",
    },
    {
      title: "حالة الرسالة",
      dataIndex: "seen",
      render: (row) => (
        <div>
          {row === true ? (
            <span className="text-success">مقروءة</span>
          ) : (
            <span className="text-danger">غير مقروءة</span>
          )}
        </div>
      ),
    },
    {
      title: "تسصنيف الرسالة",
      dataIndex: "state",
      render: (row) => (
        <div>
          {row === 1 ? (
            <span className="text-danger">في الانتظار</span>
          ) : row === 2 ? (
            <span className="text-info">جاري الحل</span>
          ) : row === 3 ? (
            <span className="text-success">تم حلها</span>
          ) : null}
        </div>
      ),
    },
    {
      title: "تاريح الرسالة",
      dataIndex: "created_at",
    },
    {
      title: "رقم الهاتف",
      dataIndex: "phone",
    },

    {
      title: "الاجراءات",
      key: "action",
      width: "20%",
      render: (index, row) => (
        // console.log(row)
        <span>
          <Space size="middle">
            <button
              onClick={() => {
                confirm({ id: row?.id, type: "single" });
              }}
              className="text-danger bg-transparent"
            >
              <FaRegTrashAlt />
            </button>
            <Link className="text-info" to={`/admin/message/${row?.id}/show`}>
              <FaRegEye />
            </Link>
            {row?.state === 3 ? (
              <div className="btn btn-primary btn-resolved cursor-text">
                تم الانهاء
              </div>
            ) : row?.state === 1 ? <></>  : (
              <button
                className="btn btn-outline-primary"
                onClick={() => {
                  confirm({ id: row?.id, state: row?.state, type: "resolved" });
                }}
              >
                انهاء الطلب
              </button>
            )}
          </Space>
        </span>
      ),
    },
  ];
  let locale = {
    emptyText: <EmptyData />,
  };

  const confirm = ({ id, type, state }) => {
    
    if (type === "single") {
      Modal.confirm({
        title: "هل تريد حذف الرسالة",
        okText: "تأكيد",
        cancelText: "الغاء",
        onOk: () =>
          new Promise((resolve) => {
            deleteMessage(id);
            setLoading(true);
            if (typeMessage === "assistant-counselor") {
              requestMessageList({ type: 2, key: "" });
            } else if (typeMessage === "messages") {
              requestMessageList({ type: 1, key: "" });
            }
            setLoading(false);
            resolve();
          }),
      });
    } else if (type === "multible") {
      if (selectedRows?.length === 0) {
        Modal.confirm({
          title: "الرجاء تحديد رسالة",
          okText: "موافق",
          cancelText: "الغاء",
        });
      } else {
        Modal.confirm({
          title: "هل تريد حذف المستخدم",
          okText: "تأكيد",
          cancelText: "الغاء",
          onOk: () =>
            new Promise((resolve) => {
              deleteMessage(selectedRows);
              setLoading(true);
              if (typeMessage === "assistant-counselor") {
                requestMessageList({ type: 2, key: "" });
              } else if (typeMessage === "messages") {
                requestMessageList({ type: 1, key: "" });
              }
              setLoading(false);
              resolve();
            }),
        });
      }
    } else if (type === "resolved") {
      Modal.confirm({
        title: "هل تريد انهاء الطلب",
        okText: "تأكيد",
        cancelText: "الغاء",
        onOk: () =>
          new Promise((resolve) => {
            setLoading(true);
            if (typeMessage === "assistant-counselor") {
              markResolved({ id: id, type: 2, key: "" });
            } else if (typeMessage === "messages") {
              markResolved({ id: id, type: 1, key: "" });
            }
            // markResolved( id );
            setLoading(false);
            resolve();
          }),
      });
    }
  };

  const handleChange = (value) => {
    setValue(value)
    var typeFilter = null
    if (typeMessage === "assistant-counselor") {
      typeFilter = 2
    } else if (typeMessage === "messages") {
      typeFilter = 1
    }
    requestMessageList({ value : value , type:typeFilter });
  };

  return (
    <>
      <MessageFilter typeMessage={typeMessage} />
      {/* <div className="mb-15 group-btn">
        <button
          className="btn btn-blocked"
          onClick={() => {
            confirm({ type: "multible" });
          }}
        >
          <span className="icon">
            <FaRegTrashAlt />
          </span>
          حذف
        </button>
      </div> */}
      {typeMessage === "messages" ? <Row className="mb-15" justify="end">
        <Col lg={4}>
          <Select
            value={value}
            onChange={handleChange}
            size="large"
            style={{ width: "100%" }}
            defaultValue="0"
          >
            <Option value="0">الكل</Option>
            <Option value="1">في الانتظار</Option>
            <Option value="2">جاري الحل</Option>
            <Option value="3">تم حلها</Option>
          </Select>
        </Col>
      </Row>  : null}
      

      <Table
        locale={locale}
        size="small"
        rowSelection={{
          ...rowSelection,
        }}
        columns={columns}
        loading={loading}
        dataSource={data}
        // pagination={{
        //   defaultCurrent:1,
        //   current:Number(UrlParams?.page),
        //   pageSize: 10,
        //   total: dataSessions?.data?.total,
        //   onChange: (page) => {
        //     ChangePagination(page);
        //   },
        // }}
      />
    </>
  );
};

export default MessagesList;
