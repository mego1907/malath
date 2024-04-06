import { Image, Modal, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import EmptyData from "../../../../components/Admin/EmptyData";

import { FaBan, FaCheckCircle, FaRegTrashAlt } from "react-icons/fa";
import useAppParams from "../../../../hooks/useAppParams";
// import UsersFilter from "../../Users/Filter/index";
import {
  getFields,
  deactivateFieldsAll,
  deleteFields,
  deleteFieldsAll,
  deactivateFields,
  activateFields,
  activateFieldsAll,
  changeFieldsOrder,
} from "../../../../store/Admin/actions/constants";
import FieldsCreate from "../Create";
// import FieldsSub from "../SubCategories";
import { Link } from "react-router-dom";
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const FieldsList = () => {
  const dispatch = useDispatch();

  const { UrlParams, handleSearch } = useAppParams({});
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const { dataFields, loading } = useSelector((state) => state.fields);

  useEffect(() => {
    if (UrlParams) {
      dispatch(getFields());
    }
  }, [dispatch, UrlParams]);

  useEffect(() => {
    setData(
      dataFields?.data?.map((row) => ({
        key: `${row?.order_no}`,
        id: row?.id,
        image: row?.image,
        name: row?.name,
        name_ar: row?.name_ar,
        valid: row?.valid,
      }))
    );
  }, [dataFields]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRowKeys);
    },
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    }),
  );

  const Row = (props) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
      id: props['data-row-key'],
    });
  
    const style = {
      ...props.style,
      transform: CSS.Transform?.toString(transform && { ...transform, scaleY: 1 }),
      transition,
      cursor: 'move',
      ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
    };
  
    return <tr {...props} ref={setNodeRef} style={style} {...attributes} {...listeners} />;
  };

  const onDragEnd = ({ active, over }) => {

    if (active.id !== over?.id) {
      setData((prev) => {
        const activeIndex = prev.findIndex((i) => i.key == active.id);
        const overIndex = prev.findIndex((i) => i.key == over?.id);
        const sortedItems = arrayMove(prev, activeIndex, overIndex);

        const id = prev[activeIndex]?.id;

        dispatch(
          changeFieldsOrder({
            id: id,
            values: { order_no: overIndex },
            callback: () => {
               setSelectedRows([]);
               return sortedItems;
            },
          }),
        );

        return sortedItems;
      });
    }
  };

  const columns = [
    {
      title: "الصورة",
      dataIndex: "image",
      render: (row) => (
        // console.log(row)
        <Image width={80} height={80} src={row} />
      ),
    },
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
          <FieldsCreate value={value} />
          <Link to={`${value.id}/sub_categories`}>المجالات الفرعية</Link>
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
                  id:idField,
                  callback: () => {
                    dispatch(getFields());
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
                      dispatch(getFields());
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
                  id:idField,
                  callback: () => {
                    // setSelectedRows(rowSelection);
                    dispatch(getFields());
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
                      dispatch(getFields());
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
                  id:idField,
                  callback: () => {
                    dispatch(getFields());
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
                      dispatch(getFields());
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
        <FieldsCreate />
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
      <DndContext sensors={sensors} modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
        <SortableContext
          items={data?.map((i) => i.key) || []}
          strategy={verticalListSortingStrategy}
        >
          <Table
            locale={{ emptyText: <EmptyData /> }}
            size="small"
            rowSelection={{
              ...rowSelection,
            }}
            rowKey="key"
            components={{ body: { row: Row } }}
            columns={columns}
            loading={loading}
            dataSource={data}
          />
        </SortableContext>
      </DndContext>
    </>
  );
};

export default FieldsList;
