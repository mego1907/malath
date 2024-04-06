import { Alert, Image, Modal, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import EmptyData from "../../../../components/Admin/EmptyData";
import { FaCheckCircle,  FaRegTrashAlt } from "react-icons/fa";
import useAppParams from "../../../../hooks/useAppParams";
// import UsersFilter from "../../Users//Filter/index";
import {
  getUsersActivations,
  deleteUserActivationAll,
  deleteActivationUser,
  activateActivationUser,
  activateUserActivationAll,
} from "../../../../store/Admin/actions/userActivation";
import { Link } from "react-router-dom";

const UserActivationList = () => {
  const dispatch = useDispatch();

  const { UrlParams, handleSearch } = useAppParams({});
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  // const [page, setPageAdv] = useState();
  const { dataUsersActivations, loading, error } = useSelector(
    (state) => state.usersActivations
  );


  useEffect(() => {
    if (UrlParams) {
      dispatch(
        getUsersActivations({
          params: { ...UrlParams },
        })
      );
    }
  }, [dispatch, UrlParams]);

  useEffect(() => {
    setData(
      dataUsersActivations?.data?.activations?.map((row) => ({
        key: row?.id,
        id: row?.id,
        full_name_ar: row?.user?.full_name_ar,
        avatar: row?.user?.avatar,
        qualification: row?.user?.qualification,
        gender: row?.user?.gender,
        dob: row?.user?.dob,
        phone: row?.user?.phone,
        identity: row?.user?.identity,
        nos: row?.user?.nos,
        workfield: row?.user?.workfield,
        experience: row?.user?.experience,
        role: row?.user?.role,
        phone: row?.user?.phone,
        email: row?.user?.email,
      }))
    );
  }, [dataUsersActivations]);

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
      render: (index, data) => (
        <span>
          <Image preview={false} width={20} src={data?.avatar} />
          <span className="mx-1">{data?.full_name_ar}</span>
        </span>
      ),
    },
    {
      title: "المؤهل العلمي",
      dataIndex: "qualification",
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
      title: "الهوية",
      dataIndex: "identity",
    },
    {
      title: "البريد الإلكتروني",
      dataIndex: "email",
    },
    {
      title: "مجال العمل",
      dataIndex: "workfield",
    },
    {
      title: " سنوات الخبرة",
      dataIndex: "experience",
    },
    {
      title: "عدد الجلسات المتاحة",
      dataIndex: "nos",
    },
    {
      title: "الاجراءات",
      key: "action",
      render: (value) => (
        <Space size="middle">
          <Link className="btn btn-outline-primary" to={`${value?.id}/show`}>مشاهدة</Link>
          <button
            className="btn btn-outline-success"
            onClick={() => {
              confirm({ id: value.id, type: "single", action: "activate" });
            }}
          >
            تفعيل
          </button>
          <button
            className="btn btn-outline-danger"
            onClick={() => {
              confirm({ id: value.id, type: "single", action: "delete" });
            }}
          >
            حذف
          </button>
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
                deleteActivationUser({
                  id,
                  callback: () => {
                    dispatch(
                      getUsersActivations({
                        params: { ...UrlParams },
                      })
                    );
                    setSelectedRows([selectedRows])
                    resolve();
                  },
                })
              );
            }),
        });
      } else if (type === "multible") {
        if (selectedRows?.length === 0) {
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
                  deleteUserActivationAll({
                    selectedRows,
                    callback: () => {
                      setSelectedRows([]);
                      dispatch(
                        getUsersActivations({
                          params: { ...UrlParams },
                        })
                      );
                      setSelectedRows([selectedRows])
                      resolve();
                    },
                  })
                );
              }),
          });
        }
      }
    } else if (action === "activate") {
      if (type === "single") {
        Modal.confirm({
          title: "هل تريد تفعيل الحساب",
          okText: "تأكيد",
          cancelText: "الغاء",
          onOk: () =>
            new Promise((resolve) => {
              dispatch(
                activateActivationUser({
                  id,
                  callback: () => {
                    setSelectedRows([]);
                    dispatch(
                      getUsersActivations({
                        params: { ...UrlParams },
                      })
                    );
                    setSelectedRows([selectedRows])
                    resolve();
                  },
                })
              );
              
            }),
        });
      } else if (type === "multible") {
        if (selectedRows?.length === 0) {
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
                  activateUserActivationAll({
                    selectedRows,
                    callback: () => {
                      setSelectedRows([]);
                      dispatch(
                        getUsersActivations({
                          params: { ...UrlParams },
                        })
                      );
                      setSelectedRows([selectedRows])
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
      {error ? <Alert className="mb-10" message={error} type="error" /> : null}

      {/* <UsersFilter noneField={false} /> */}

      <div className="mb-15 group-btn">
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
            confirm({ type: "multible", action: "activate" });
          }}
        >
          <span className="icon">
            <FaCheckCircle />
          </span>{" "}
          تفعيل
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
          total: dataUsersActivations?.data?.total,
          onChange: (page) => {
            ChangePaginationAdv(page);
          },
        }}
      />
    </>
  );
};

export default UserActivationList;
