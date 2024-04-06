import { Modal, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import EmptyData from "../../../../../components/Admin/EmptyData";
import {
  activateUser,
  deleteUser,
  deleteUserAll,
  getUsers,
  noActivateUser,
} from "../../../../../store/Admin/actions/users";
import {
  FaBan,
  FaCheckCircle,
  FaPlus,
  FaRegEdit,
  FaRegTrashAlt,
} from "react-icons/fa";
import useAppParams from "../../../../../hooks/useAppParams";
import UsersFilter from "../../Filter";

const ManagementUsersList = () => {
  const dispatch = useDispatch();

  const { UrlParams, handleSearch } = useAppParams({});
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  // const [page, setPageAdv] = useState();
  const { dataUsers, loading } = useSelector((state) => state.users);
 

  useEffect(() => {
    if (UrlParams) {
      dispatch(
        getUsers({
          params: { ...UrlParams, role: "MANAGEMENT" },
        })
      );
    }
  }, [dispatch, UrlParams]);

  useEffect(() => {
    setData(
      dataUsers?.data?.users?.map((row) => ({
        key: row?.id,
        id: row?.id,
        name: row?.full_name_ar,
        role: row?.role,
        blocked: row?.blocked,
        phone: row?.phone,
        email: row?.email,
      }))
    );
  }, [dataUsers]);

  const ChangePaginationAdv = (number) => {
    handleSearch({
      fields: {
        page: number,
      },
    });
    // setPageAdv(number);
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRowKeys);
    },
  };

  const columns = [
    {
      title: "الاسم",
      dataIndex: "name",
    },
    {
      title: "المسؤولية",
      dataIndex: "role",
    },
    {
      title: "الحالة",
      dataIndex: "blocked",
      render: (row) => (
        <div className={row === true ? 'text-danger' : row === false ? 'text-success' :null}>{row === true ? 'غير فعال' : row === false ? 'فعال' :null}</div>
      ),
    },
    {
      title: "رقم الهاتف",
      dataIndex: "phone",
    },
    {
      title: "البريد الإلكتروني",
      dataIndex: "email",
    },
    {
      title: "الاجراءات",
      key: "action",
      render: (value) => (
        <Space size="middle">
          <button
            className="text-danger bg-transparent pointer"
            onClick={() => {
              confirm({ id: value.id, type: "single", action: "delete" });
            }}
          >
            <FaRegTrashAlt />
          </button>
          <Link className="text-success" to={`${value?.id}/edit`}>
            <FaRegEdit />
          </Link>
        </Space>
      ),
    },
  ];

  const confirm = ({ id, type, action }) => {
    if (action === "delete") {
      if (type === "single") {
        Modal.confirm({
          title: "هل تريد حذف المستخدم",
          okText: "تأكيد",
          cancelText: "الغاء",
          onOk: () => 
          new Promise((resolve) => {
            dispatch(
              deleteUser({
                id,
                callback: () => {
                  dispatch(
                    getUsers({
                      params: { ...UrlParams, role: "MANAGEMENT" },
                    })
                  );
                  resolve();
                },
              })
            );
          }),
        });
      } else if (type === "multible") {
        if (selectedRows?.length === 0 || selectedRows?.length === undefined) {
          Modal.confirm({
            title: "الرجاء تحديد مستخدم",
            okText: "موافق",
            cancelText: "الغاء",
          });
        } else {
          Modal.confirm({
            title: "هل تريد حذف المستخدم",
            okText: "تأكيد",
            cancelText: "الغاء",
            onOk: () => {
              dispatch(
                deleteUserAll({
                  selectedRows,
                  callback: () => {
                    setSelectedRows([]);
                    dispatch(
                      getUsers({
                        params: { ...UrlParams, role: "MANAGEMENT" },
                      })
                    );
                  },
                })
              );
            },
          });
        }
      }
    } else if (action === "activate") {
      if (selectedRows?.length === 0 || selectedRows?.length === undefined) {
        Modal.confirm({
          title: "الرجاء تحديد مستخدم",
          okText: "موافق",
          cancelText: "الغاء",
        });
      }else{
        Modal.confirm({
          title: "هل تريد تفعيل الحساب",
          okText: "تأكيد",
          cancelText: "الغاء",
          onOk: () => {
            dispatch(
              activateUser({
                selectedRows,
                callback: () => {
                  setSelectedRows([]);
                  dispatch(
                    getUsers({
                      params: { ...UrlParams, role: "MANAGEMENT" },
                    })
                  );
                },
              })
            );
          },
        });
      }

    } else if (action === "noActivate") {
      if (selectedRows?.length === 0 || selectedRows?.length === undefined) {
        Modal.confirm({
          title: "الرجاء تحديد مستخدم",
          okText: "موافق",
          cancelText: "الغاء",
        });
      }else{
        Modal.confirm({
          title: "هل تريد تعطيل الحساب",
          okText: "تأكيد",
          cancelText: "الغاء",
          onOk: () => {
            dispatch(
              noActivateUser({
                selectedRows,
                callback: () => {
                  setSelectedRows([]);
                  dispatch(
                    getUsers({
                      params: { ...UrlParams, role: "MANAGEMENT" },
                    })
                  );
                },
              })
            );
          },
        });
      }
    }
  };

  return (
    <>

      <UsersFilter noneField={false} />
    
      <div className="mb-15 group-btn">
        <Link className="btn btn-add" to="create">
          <span className="icon">
            <FaPlus />
          </span>{" "}
          اضافة
        </Link>
        <button
          className="btn btn-delete"
          onClick={() => {
            confirm({ type: "multible", action: "delete" });
          }}
        >
          {" "}
          <span className="icon">
            <FaRegTrashAlt />
          </span>{" "}
          حذف
        </button>
        <button
          className="btn btn-activate"
          onClick={() => {
            confirm({ action: "activate" });
          }}
        >
          <span className="icon">
            <FaCheckCircle />
          </span>{" "}
          تفعيل
        </button>
        <button
          className="btn btn-blocked"
          onClick={() => {
            confirm({ action: "noActivate" });
          }}
        >
          {" "}
          <span className="icon">
            <FaBan />
          </span>{" "}
          تعطيل
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
          total: dataUsers?.data?.total,
          onChange: (page) => {
            ChangePaginationAdv(page);
          },
        }}
      />
    </>
  );
};

export default ManagementUsersList;
