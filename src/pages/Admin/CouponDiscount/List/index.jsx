import { Modal, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import EmptyData from "../../../../components/Admin/EmptyData";
import {
  deleteCoupon,
  deleteCouponAll,
  getCoupons,
} from "../../../../store/Admin/actions/discountCoupon";
import {
  FaPlus,
  FaRegEdit,
  FaRegTrashAlt,
} from "react-icons/fa";
import useAppParams from "../../../../hooks/useAppParams";
import CouponsFilter from "../Filter";

const DiscountCouponsList = () => {
  const dispatch = useDispatch();

  const { UrlParams, handleSearch } = useAppParams({});
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const { dataCoupons, loading } = useSelector((state) => state.coupons);
 
  useEffect(() => {
    if (UrlParams) {
      dispatch(
        getCoupons({
          params: { ...UrlParams },
        })
      );
    }
  }, [dispatch, UrlParams]);

  useEffect(() => {
    setData(
      dataCoupons?.coupons?.map((row, index) => ({
        key: row?.id,
        id: row?.id,
        discount_code: row?.discount_code,
        discount_percentage: row?.discount_percentage,
        title: row?.title,
        start_date: row?.start_date,
        end_date: row?.end_date,
      }))
    );
  }, [dataCoupons]);

  const ChangePaginationCoupons = (number) => {
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
      title: "عنوان الكوبون",
      dataIndex: "title",
    },
    {
      title: "كود الخصم",
      dataIndex: "discount_code"
    },
    {
      title: "نسبة الخصم",
      dataIndex: "discount_percentage"
    },
    {
      title: "تاريخ بداية الصلاحية",
      dataIndex: "start_date",
    },
    {
      title: "تاريخ نهاية الصلاحية",
      dataIndex: "end_date",
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
          title: "هل تريد حذف الكوبون",
          okText: "تأكيد",
          cancelText: "الغاء",
          onOk: () => 
          new Promise((resolve) => {
            dispatch(
              deleteCoupon({
                id,
                callback: () => {
                  dispatch(
                    getCoupons({
                      params: { ...UrlParams },
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
            title: "الرجاء تحديد كوبون",
            okText: "موافق",
            cancelText: "الغاء",
          });
        } else {
          Modal.confirm({
            title: "هل تريد حذف الكوبون",
            okText: "تأكيد",
            cancelText: "الغاء",
            onOk: () => {
              dispatch(
                deleteCouponAll({
                  selectedRows,
                  callback: () => {
                    setSelectedRows([]);
                    dispatch(
                      getCoupons({
                        params: { ...UrlParams },
                      })
                    );
                  },
                })
              );
            },
          });
        }
      }
    }
  };

  return (
    <>

      <CouponsFilter noneField={false} />
    
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
          total: dataCoupons?.total || 0,
          onChange: (page) => {
            ChangePaginationCoupons(page);
          },
        }}
      />
    </>
  );
};

export default DiscountCouponsList;
