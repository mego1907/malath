import { Avatar, Modal, Space, Table } from "antd";
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
  FaRegBell,
  FaRegEdit,
  FaRegEye,
  FaRegTrashAlt,
} from "react-icons/fa";
import useAppParams from "../../../../../hooks/useAppParams";
import UsersFilter from "../../Filter";

const BeneficiaryUsersList = () => {
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
          params: { ...UrlParams, role: "BENEFICIARY" },
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
        avatar: row?.avatar,
        blocked: row?.blocked,
        email: row?.email,
        qualification: row?.qualification,
        gender: row?.gender,
        dob: row?.dob,
        phone: row?.phone,
        identity: row?.identity,
        fields: row?.fields,
        experience: row?.experience,
        nos: row?.nos,
        country: row?.country,
        completedSessionsCount: row?.completedSessionsCount,
        newSessionCount: row?.newSessionCount,
        total: row?.wallet?.total,
        available: row?.wallet?.available,
        onhold: row?.wallet?.onhold,
        
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
      dataIndex: ["name", "avatar"],
      render: (index, row) => (
        <div key={index}>
        <Avatar
          size={40}
          src={row?.avatar}
        />{" "}
        {row?.name}
      </div>
      ),
    },
    {
      title: "الحالة",
      dataIndex: "blocked",
      render: (row) => (
        <div
          className={
            row === true ? "text-danger" : row === false ? "text-success" : null
          }
        >
          {row === true ? "غير فعال" : row === false ? "فعال" : null}
        </div>
      ),
    },
    {
      title: "الجنس",
      dataIndex: "gender",
    },
    {
      title: "تاريخ الميلاد",
      dataIndex: "dob",
    },
    {
      title: "رقم الهاتف",
      dataIndex: "phone",
    },
    {
      title: "رقم الهوية",
      dataIndex: "identity",
    },
    {
      title: "البريد الإلكتروني",
      dataIndex: "email",
    },
    {
      title: "الدولة",
      dataIndex: "country",
    },
    {
      title: "عدد الجلسات التي تمت",
      dataIndex: "completedSessionsCount",
    },
    {
      title: "عدد الجلسات الجديدة",
      dataIndex: "newSessionCount",
    },
    {
      title: "الرصيد الكلي",
      dataIndex: "total",
    },
    {
      title: "الرصيد المتاح",
      dataIndex: "available",
    },
    {
      title: "الرصيد المعلق",
      dataIndex: "onhold",
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
          <Link className="text-primary" to={`/admin/notifications/create`} state={{id:value?.id,name:value?.name}}>
            <FaRegBell />
          </Link>
          <Link className="text-info" to={`/admin/users/${value?.id}/show`}>
            <FaRegEye />
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
                        params: { ...UrlParams, role: "BENEFICIARY" },
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
            onOk: () => 
              new Promise((resolve) => {
                dispatch(
                  deleteUserAll({
                    selectedRows,
                    callback: () => {
                      setSelectedRows([]);
                      dispatch(
                        getUsers({
                          params: { ...UrlParams, role: "BENEFICIARY" },
                        })
                      );
                      setSelectedRows()
                      resolve()
                    },
                  })
                );
              }),
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
      } else {
        Modal.confirm({
          title: "هل تريد تفعيل الحساب",
          okText: "تأكيد",
          cancelText: "الغاء",
          onOk: () => 
            new Promise((resolve) => {
              dispatch(
                activateUser({
                  selectedRows,
                  callback: () => {
                    setSelectedRows([]);
                    dispatch(
                      getUsers({
                        params: { ...UrlParams, role: "BENEFICIARY" },
                      })
                    );
                    setSelectedRows([selectedRows])
                    resolve()
                  },
                })
              );
            }),
        });
      }
    } else if (action === "noActivate") {
      if (selectedRows?.length === 0 || selectedRows?.length === undefined) {
        Modal.confirm({
          title: "الرجاء تحديد مستخدم",
          okText: "موافق",
          cancelText: "الغاء",
        });
      } else {
        Modal.confirm({
          title: "هل تريد تعطيل الحساب",
          okText: "تأكيد",
          cancelText: "الغاء",
          onOk: () => 
            new Promise((resolve) => {
              dispatch(
                noActivateUser({
                  selectedRows,
                  callback: () => {
                    setSelectedRows([]);
                    dispatch(
                      getUsers({
                        params: { ...UrlParams, role: "BENEFICIARY" },
                      })
                    );
                    setSelectedRows([selectedRows])
                    resolve()
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

      <UsersFilter />

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

export default BeneficiaryUsersList;
