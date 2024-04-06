import {  Avatar, Modal, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import EmptyData from "../../../../components/Admin/EmptyData";
import {
  deleteSessions,
  deleteSessionsAll,
  getSessions,
} from "../../../../store/Admin/actions/sessions";
import user from "../../../../assets/images/user.png";
import useAppParams from "../../../../hooks/useAppParams";
import SessionsFilter from "../Filter";
const SessionsList = () => {
  const dispatch = useDispatch();

  const { UrlParams, handleSearch } = useAppParams({});
  const [data, setData] = useState([]);
  // const [searchText, setSearchText] = useState("");
  const { dataSessions, loading } = useSelector(
    (state) => state.sessions
    );
  const [selectedRows, setSelectedRows] = useState([]);

  // useEffect(() => {
  //   handleSearch({
  //     fields: {
  //       page: 1,
  //     },
  //   });
  //  }, [])
  useEffect(() => {
    if (UrlParams) {
      dispatch(
        getSessions({
          params: { ...UrlParams },
        })
      );
    }
  }, [dispatch, UrlParams]);

  useEffect(() => {
    setData(
      dataSessions?.data?.sessions?.map((row) => ({
        key: row.id,
        id: row.id,
        name_beneficiary: row?.beneficiary?.full_name_ar,
        avatar_beneficiary: row?.beneficiary?.avatar,
        name_adviser: row?.adviser?.full_name_ar,
        avatar_adviser: row?.adviser?.avatar,
        state: row?.state,
        date: row?.date,
        start: row?.start,
      }))
    );
  }, [dataSessions]);

  const ChangePagination = (number) => {
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
      title: "إسم المستفيد",
      dataIndex: ["name_beneficiary" , "avatar_beneficiary"],
      render: (index, row) => (
        <div key={index}>
          <Avatar
            size={40}
            src={row?.avatar_beneficiary ? row?.avatar_beneficiary : user}
          />{" "}
          {row?.name_beneficiary}
        </div>
      ),
    },
    {
      title: "إسم المستشار",
      dataIndex: ["name_adviser" , "avatar_adviser"],
      render: (index, row) => (
        <div key={index}>
        <Avatar
          size={40}
          src={row?.avatar_adviser ? row?.avatar_adviser : user}
        />{" "}
        {row?.name_adviser}
      </div>
      ),
    },
    
    {
      title: "حالة الحجز",
      dataIndex: "state",
      render: (row) => (
        <div>
          {row === 0 ? (
            <span className="text-success">حجز قادم</span>
          ) : row === 1 ? (
            <span className="text-danger">حجز سابق</span>
          ) : row === 2 ? (
            <span className="text-danger">حجز ملغي</span>
          ) : null}
        </div>
      ),
    },
    {
      title: "تاريخ الحجز ",
      dataIndex: "date",
    },
    {
      title: "ساعة الحجز",
      dataIndex: "start",
    },

    {
      title: "الاجراءات",
      key: "action",
      render: (index, row) => (
        <span>
          {index.state === 0 ? (
            <Space size="middle">
              <button
                className="btn btn-outline-danger"
                onClick={() => {
                  confirm({ id: index?.id, type: "single" });
                }}
              >
                تعطيل
              </button>
            </Space>
          ) : null}
        </span>
      ),
    },
  ];
  let locale = {
    emptyText: <EmptyData />,
  };

  const confirm = ({ id, type }) => {
    if (type === "single") {
      Modal.confirm({
        title: "هل تريد تعطيل الحجز",
        okText: "تأكيد",
        cancelText: "الغاء",
        onOk: () =>
          new Promise((resolve) => {
            dispatch(
              deleteSessions({
                id,
                callback: () => {
                  dispatch(
                    getSessions({
                      params: { ...UrlParams },
                    })
                  );
                  resolve();
                },
              })
            );
          }),
      });
    } else {
      if (selectedRows?.length === 0) {
        Modal.confirm({
          title: "الرجاء تحديد حجز",
          okText: "موافق",
          cancelText: "الغاء",
        });
      } else {
        Modal.confirm({
          title: "هل تريد تعطيل الحجز",
          okText: "تأكيد",
          cancelText: "الغاء",
          onOk: () =>
            new Promise((resolve) => {
              dispatch(
                deleteSessionsAll({
                  selectedRows,
                  callback: () => {
                    dispatch(
                      getSessions({
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
  };

  return (
    <>
     <SessionsFilter />
      {/* <div className="mb-15 group-btn">
        <button
          className="btn btn-blocked"
          onClick={() => {
            confirm({ type: "multible" });
          }}
        >
          <span className="icon">
            <FaBan />
          </span>
          تعطيل
        </button>
      </div> */}
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
          defaultCurrent:1,
          current: Number(UrlParams?.page ? UrlParams?.page : 1),
          pageSize: 10,
          total: dataSessions?.data?.total,
          onChange: (page) => {
            ChangePagination(page);
          },
        }}
      />
    </>
  );
};

export default SessionsList;
