import { Avatar, Modal, Rate, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  FaEye,
  FaEyeSlash,
  FaRegTrashAlt,
} from "react-icons/fa";
import {
  deleteAllComment,
  deleteComment,
  getComment,
  hideAllComment,
  hideComment,
  showAllComment,
  showComment,
} from "../../../../store/Admin/actions/comments";
import EmptyData from "../../../../components/Admin/EmptyData";
import useAppParams from "../../../../hooks/useAppParams";

const CommentList = () => {
  const dispatch = useDispatch();

  const { UrlParams, handleSearch } = useAppParams({});
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  // const [page, setPageAdv] = useState();
  const { dataComment, loading } = useSelector((state) => state.comments);

  useEffect(() => {
    if (UrlParams) {
      dispatch(
        getComment({
          params: { ...UrlParams, role: "BENEFICIARY" },
        })
      );
    }
  }, [dispatch, UrlParams]);

  useEffect(() => {
    setData(
      dataComment?.data?.rates?.map((row) => ({
        key: row?.id,
        id: row?.id,
        name: row?.full_name,
        avatar: row?.avatar,
        role: row?.role,
        rate: row?.rate,
        text: row?.text,
        created_at: row?.created_at,
        hidden:row?.hidden
      }))
    );
  }, [dataComment]);

  const ChangePaginationAdv = (number) => {
    handleSearch({
      fields: {
        page: number,
      },
    });
    // setPageAdv(number);
  };

  // const rowSelection = {
  //   onChange: (selectedRowKeys, selectedRows) => {
  //     setSelectedRows(selectedRowKeys);
  //     exchangeMoney(selectedRowKeys[0]);
  //   },
  // };

  const rowSelection = {
    selectedRowKeys: selectedRows,
    onChange: (key) => {
      setSelectedRows(key);
      exchangeMoney(key[0]);
    }
  };

  function exchangeMoney(key) {
    console.log(key);
  }
  const columns = [
    {
      title: "الاسم",
      dataIndex: ["name", "avatar"],
      render: (index, row) => (
        <div key={index}>
          <Avatar size={40} src={row?.avatar} /> {row?.name}
        </div>
      ),
    },
    {
      title: "عضوية المستخدم",
      dataIndex: ["role"],
      render: (row) => (
        <div>{row === 'ADVISER' ? 'مستشار' : row === 'BENEFICIARY' ? 'مستفيد' : null}</div>
      ),
    },
    {
      title: "التقييم",
      dataIndex: ["rate"],
      render: (row) => (
        <Rate disabled style={{fontSize:"14px"}} defaultValue={row} />
      ),
    },
    {
      title: "التعليق",
      dataIndex: ["text"],
      render: (row) => (
        <div>{row}</div>
      ),
    },
    {
      title: "تاريخ التعليق",
      dataIndex: ["created_at"],
      render: (row) => (
        <div>{row}</div>
      ),
    },
    {
      title: "الاجراءات",
      key: "action",
      render: (value) => (
        <Space size="middle">
          <button
            className="btn btn-outline-danger"
            onClick={() => {
              confirm({ id: value.id, type: "single", action: "delete" });
            }}
          >
            حذف
          </button>
          {value?.hidden ? <button
            className="btn btn-outline-info"
            onClick={() => {
              confirm({ id: value.id, type: "single", action: "show" });
            }}
          >
            اظهار
          </button> :<button
            className="btn btn-outline-info"
            onClick={() => {
              confirm({ id: value.id, type: "single", action: "hide" });
            }}
          >
            اخفاء
          </button> }
          
          
        </Space>
      ),
    },
  ];

  const confirm = ({ id, type, action }) => {
    if (action === "delete") {
      if (type === "single") {
        Modal.confirm({
          title: "هل تريد حذف التعليق",
          okText: "تأكيد",
          cancelText: "الغاء",
          onOk: () =>
            new Promise((resolve) => {
              dispatch(
                deleteComment({
                  id,
                  callback: () => {
                    dispatch(
                      getComment({
                        params: { ...UrlParams },
                      })
                    );
                    setSelectedRows([]);
                    resolve();
                  },
                })
              );
            }),
        });
      } else if (type === "multible") {
        if (selectedRows?.length === 0) {
          Modal.confirm({
            title: "الرجاء تحديد تعليق",
            okText: "موافق",
            cancelText: "الغاء",
          });
        } else {
          Modal.confirm({
            title: "هل تريد حذف التعليق",
            okText: "تأكيد",
            cancelText: "الغاء",
            onOk: () =>
              new Promise((resolve) => {
                dispatch(
                  deleteAllComment({
                    selectedRows,
                    callback: () => {
                      setSelectedRows([]);
                      dispatch(
                        getComment({
                          params: { ...UrlParams },
                        })
                      );
                      setSelectedRows([]);
                      resolve();
                    },
                  })
                );
              }),
          });
        }
      }
    } else if (action === "hide") {
      if (type === "single") {
        Modal.confirm({
          title: "هل تريد اخفاء التعليق",
          okText: "تأكيد",
          cancelText: "الغاء",
          onOk: () =>
            new Promise((resolve) => {
              dispatch(
                hideComment({
                  id,
                  callback: () => {
                    dispatch(
                      getComment({
                        params: { ...UrlParams },
                      })
                    );
                    setSelectedRows([]);
                    resolve();
                  },
                })
              );
            }),
        });
      } else if (type === "multible") {
        if (selectedRows?.length === 0) {
          Modal.confirm({
            title: "الرجاء تحديد تعليق",
            okText: "موافق",
            cancelText: "الغاء",
          });
        } else {
          Modal.confirm({
            title: "هل تريد اخفاء التعليق",
            okText: "تأكيد",
            cancelText: "الغاء",
            onOk: () =>
              new Promise((resolve) => {
                dispatch(
                  hideAllComment({
                    selectedRows,
                    callback: () => {
                      setSelectedRows([]);
                      dispatch(
                        getComment({
                          params: { ...UrlParams },
                        })
                      );
                      setSelectedRows([]);
                      resolve();
                    },
                  })
                );
              }),
          });
        }
      }
    }
    else if (action === "show") {
      if (type === "single") {
        Modal.confirm({
          title: "هل تريد اظهار التعليق",
          okText: "تأكيد",
          cancelText: "الغاء",
          onOk: () =>
            new Promise((resolve) => {
              dispatch(
                showComment({
                  id,
                  callback: () => {
                    dispatch(
                      getComment({
                        params: { ...UrlParams },
                      })
                    );
                    setSelectedRows([]);
                    resolve();
                  },
                })
              );
            }),
        });
      } else if (type === "multible") {
        if (selectedRows?.length === 0) {
          Modal.confirm({
            title: "الرجاء تحديد تعليق",
            okText: "موافق",
            cancelText: "الغاء",
          });
        } else {
          Modal.confirm({
            title: "هل تريد اظهار التعليق",
            okText: "تأكيد",
            cancelText: "الغاء",
            onOk: () =>
              new Promise((resolve) => {
                dispatch(
                  showAllComment({
                    selectedRows,
                    callback: () => {
                      setSelectedRows([]);
                      dispatch(
                        getComment({
                          params: { ...UrlParams },
                        })
                      );
                      setSelectedRows([]);
                      resolve();
                    },
                  })
                );
              }),
          });
        }
      }
    }
  };
  return (
    <>
      <div className="mb-15 group-btn">
        <button
          className="btn btn-delete"
          onClick={() => {
            confirm({ type: "multible", action: "delete" });
          }}
        >
          <span className="icon">
            <FaRegTrashAlt />
          </span>
          حذف
        </button>
        <button
          className="btn btn-add"
          onClick={() => {
            confirm({ type: "multible", action: "hide" });
          }}
        >
          <span className="icon">
            <FaEyeSlash />
          </span>
          اخفاء 
        </button>
        <button
          className="btn btn-add"
          onClick={() => {
            confirm({ type: "multible", action: "show" });
          }}
        >
          <span className="icon">
            <FaEye />
          </span>
          اظهار
        </button>
      </div>
      <Table
        locale={{ emptyText: <EmptyData /> }}
        size="small"
        rowSelection={{
          ...rowSelection,
        }}
        columns={columns}
        loading={loading}
        dataSource={data}
        pagination={{
          current: Number(UrlParams?.page ? UrlParams?.page : 1),
          total: dataComment?.data?.total,
          onChange: (page) => {
            ChangePaginationAdv(page);
          },
        }}
      />
    </>
  );
};

export default CommentList;
