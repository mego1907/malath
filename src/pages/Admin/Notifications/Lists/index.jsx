import {  Avatar,  Modal, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import EmptyData from "../../../../components/Admin/EmptyData";
import {
  deleteNotification,
  getNotifications,
  deleteNotificationAll,
} from "../../../../store/Admin/actions/notifications";
import user from "../../../../assets/images/user.png";
import useAppParams from "../../../../hooks/useAppParams";
const NotificationsLists = () => {
  const dispatch = useDispatch();

  const { UrlParams, handleSearch } = useAppParams({});
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const { dataNotifications, loading } = useSelector(
    (state) => state.notifications
  );
  // useEffect(() => {
  //   handleSearch({
  //     fields: {
  //       page: 1,
  //     },
  //   });
  // }, []);
  useEffect(() => {
    if (UrlParams) {
      dispatch(
        getNotifications({
          params: { ...UrlParams,  limit:10   , page :Number(UrlParams?.page ? UrlParams?.page : 1) },
          // params: { ...UrlParams  ,  limit:10 , page : 1},
        })
      );
    }
  }, [dispatch, UrlParams]);

  useEffect(() => {
    setData(
      dataNotifications?.data?.notifications?.map((row) => ({
        key: row?.id,
        id: row?.id,
        name: row?.full_name,
        avatar: row?.avatar,
        role: row?.role,
        message: row?.message,
        body: row?.body,
        date: row?.created_at,
        action: row?.id,
      }))
    );
  }, [dataNotifications]);

  const ChangePagination = (number) => {
    handleSearch({
      fields: {
        page: number,
      },
    });
  };

  const rowSelection = {
    onChange: (selectedRows) => {
      setSelectedRows(selectedRows);
    },
  };

  const columns = [
    {
      title: "الإسم",
      dataIndex: "name",
      render: (row) => (
        <>
          <Avatar size={40} src={row?.avatar ? row?.avatar : user} /> {row}
        </>
      ),
    },
    {
      title: "عضوية المستخدم",
      dataIndex: "role",
    },
    {
      title: "عنوان الإشعار",
      dataIndex: "message",
    },
    {
      title: "نص الإشعار",
      dataIndex: "body",
    },
    {
      title: "تاريخ الإشعار",
      dataIndex: "date",
    },

    {
      title: "الاجراءات",
      key: "action",
      render: (row) => (
        <Space size="middle">
          <button
            className="btn btn-outline-danger"
            onClick={() => {
              confirm({ id: row?.id, type: "single" });
            }}
          >
            حذف
          </button>
        </Space>
      ),
    },
  ];
  let locale = {
    emptyText: <EmptyData />,
  };

  const confirm = ({ id, type }) => {
    if (type === "single") {
      Modal.confirm({
        title: "هل تريد حذف الإشعار",
        okText: "تأكيد",
        cancelText: "الغاء",
        onOk: () =>
          new Promise((resolve) => {
            dispatch(
              deleteNotification({
                id,
                callback: () => {
                  dispatch(
                    getNotifications({
                      params: { ...UrlParams,  limit:10   , page :Number(UrlParams?.page ? UrlParams?.page : 1) },
                    })
                  );
                  setSelectedRows([selectedRows]);
                  resolve();
                },
              })
            );
          }),
      });
    } else if (type === "multible") {
      if (selectedRows?.length === 0) {
        Modal.confirm({
          title: "الرجاء تحديد إشعار",
          okText: "موافق",
          cancelText: "الغاء",
        });
      } else {
        Modal.confirm({
          title: "هل تريد حذف الإشعار",
          okText: "تأكيد",
          cancelText: "الغاء",
          onOk: () =>
            new Promise((resolve) => {
              dispatch(
                deleteNotificationAll({
                  selectedRows,
                  callback: () => {
                    setSelectedRows([]);
                    dispatch(
                      getNotifications({
                        params: { ...UrlParams,  limit:10   , page :Number(UrlParams?.page ? UrlParams?.page : 1) },
                      })
                    );
                    setSelectedRows([selectedRows]);
                    resolve();
                  },
                })
              );
            }),
        });
      }
    }
  };

  return (
    <>
      <div className="mb-15 group-btn">
        <Link className="btn btn-add" to="create">
          {" "}
          <span className="icon">
            <FaPlus />
          </span>{" "}
          اضافة
        </Link>
        <button
          className="btn btn-delete"
          to="create"
          onClick={() => {
            confirm({ type: "multible" });
          }}
        >
          {" "}
          <span className="icon">
            <FaRegTrashAlt />
          </span>{" "}
          حذف
        </button>
      </div>
      <Table
        locale={locale}
        size="small"
        rowSelection={{
          ...rowSelection,
        }}
        columns={columns}
        loading={loading}
        dataSource={data}
        pagination={{
          defaultCurrent: 1,
          current: Number(UrlParams?.page ? UrlParams?.page : 1),
          pageSize: 10,
          total: dataNotifications?.data?.total,
          onChange: (page) => {
            ChangePagination(page);
          },
        }}
      />
    </>
  );
};

export default NotificationsLists;
