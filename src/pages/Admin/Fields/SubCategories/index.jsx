import { Modal, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import EmptyData from "../../../../components/Admin/EmptyData";

import { FaBan, FaCheckCircle, FaRegTrashAlt } from "react-icons/fa";
import useAppParams from "../../../../hooks/useAppParams";
// import UsersFilter from "../../Users/Filter/index";
import {
  getSubFields,
  deactivateFieldsAll,
  deleteFields,
  deleteFieldsAll,
  deactivateFields,
  activateFields,
  activateFieldsAll,
} from "../../../../store/Admin/actions/constants";
import FieldsCreate from "../Create";
// import FieldsSub from "../SubCategories";
import { Link, useParams } from "react-router-dom";

const SubCategories = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const {handleSearch } = useAppParams({});
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const { dataSubFields, loading } = useSelector((state) => state.subFields);

  useEffect(() => {
    if (id) {
      dispatch(getSubFields(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    setData(
      dataSubFields?.data?.map((row) => ({
        key: row?.id,
        id: row?.id,
        name: row?.name,
        name_ar: row?.name_ar,
        valid: row?.valid,
      }))
    );
  }, [dataSubFields]);

  const ChangePaginationAdv = (number) => {
    handleSearch({
      fields: {
        page: number,
      },
    });
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRowKeys);
    },
  };

  const columns = [
    {
      title: "الاسم",
      dataIndex: "name_ar",
    },
    {
      title: "الحالة",
      dataIndex: "valid",
      render: (row) => (
        <div
          className={
            row === true ? "text-success" : row === false ? "text-danger" : null
          }
        >
          {row === true ? "فعال" : row === false ? "غير فعال" : null}
        </div>
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
              confirm({ idField: value.id, type: "single", action: "delete" });
            }}
          >
            حذف
          </button>
          {value.valid ? (
            <button
              className="btn btn-outline-danger"
              onClick={() => {
                confirm({
                  idField: value.id,
                  type: "single",
                  action: "deactivate",
                });
              }}
            >
              تعطيل
            </button>
          ) : (
            <button
              className="btn btn-outline-success"
              onClick={() => {
                confirm({
                  idField: value.id,
                  type: "single",
                  action: "activate",
                });
              }}
            >
              تفعيل
            </button>
          )}

          <FieldsCreate parentId={id} subFields="subFieldsEdit" value={value} />
          {/* <Link to={`${value.id}/sub_categories`}>المجالات الفرعية</Link> */}
          {/* <FieldsSub id={value.id} /> */}
        </Space>
      ),
    },
  ];

  const confirm = ({ idField, type, action }) => {
    if (action === "delete") {
      if (type === "single") {
        Modal.confirm({
          title: "هل تريد حذف المجال",
          okText: "تأكيد",
          cancelText: "الغاء",
          onOk: () =>
            new Promise((resolve) => {
              dispatch(
                deleteFields({
                  id: idField,
                  callback: () => {
                    dispatch(getSubFields(id));
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
            title: "الرجاء تحديد مجال",
            okText: "موافق",
            cancelText: "الغاء",
          });
        } else {
          Modal.confirm({
            title: "هل تريد حذف المجال",
            okText: "تأكيد",
            cancelText: "الغاء",
            onOk: () =>
              new Promise((resolve) => {
                dispatch(
                  deleteFieldsAll({
                    selectedRows,
                    callback: () => {
                      dispatch(getSubFields(id));
                      setSelectedRows([selectedRows]);
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
          title: "هل تريد تفعيل المجال",
          okText: "تأكيد",
          cancelText: "الغاء",
          onOk: () =>
            new Promise((resolve) => {
              dispatch(
                activateFields({
                  id: idField,
                  callback: () => {
                    // setSelectedRows(rowSelection);
                    dispatch(getSubFields(id));
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
            title: "الرجاء تحديد مجال",
            okText: "موافق",
            cancelText: "الغاء",
          });
        } else {
          Modal.confirm({
            title: "هل تريد تفعيل المجال",
            okText: "تأكيد",
            cancelText: "الغاء",
            onOk: () =>
              new Promise((resolve) => {
                dispatch(
                  activateFieldsAll({
                    selectedRows,
                    callback: () => {
                      dispatch(getSubFields(id));
                      setSelectedRows([selectedRows]);
                      resolve();
                    },
                  })
                );
              }),
          });
        }
      }
    } else if (action === "deactivate") {
      if (type === "single") {
        Modal.confirm({
          title: "هل تريد تعطيل المجال",
          okText: "تأكيد",
          cancelText: "الغاء",
          onOk: () =>
            new Promise((resolve) => {
              dispatch(
                deactivateFields({
                  id: idField,
                  callback: () => {
                    dispatch(getSubFields(id));
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
            title: "الرجاء تحديد مجال",
            okText: "موافق",
            cancelText: "الغاء",
          });
        } else {
          Modal.confirm({
            title: "هل تريد تعطيل مجال",
            okText: "تأكيد",
            cancelText: "الغاء",
            onOk: () =>
              new Promise((resolve) => {
                dispatch(
                  deactivateFieldsAll({
                    selectedRows,
                    callback: () => {
                      dispatch(getSubFields(id));
                      setSelectedRows([selectedRows]);
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
      {/* <UsersFilter /> */}

      <div className="mb-15 group-btn">
        <FieldsCreate parentId={id} subFields="subFieldsCreate" />
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
        <button
          className="btn btn-blocked"
          onClick={() => {
            confirm({ type: "multible", action: "deactivate" });
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
      />
    </>
  );
};

export default SubCategories;
