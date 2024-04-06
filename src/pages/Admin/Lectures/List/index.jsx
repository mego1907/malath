import { Modal, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import EmptyData from "../../../../components/Admin/EmptyData";
import {
  deleteLecture,
  deleteLectureAll,
  getLectures,
  updateLectureOrder,
} from "../../../../store/Admin/actions/lectures";
import {
  FaPlus,
  FaRegEdit,
  FaRegTrashAlt,
} from "react-icons/fa";
import { CSS } from '@dnd-kit/utilities';
import { MdOutlineOndemandVideo } from "react-icons/md";
import useAppParams from "../../../../hooks/useAppParams";
import LecturesFilter from "../Filter";
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';

const LecturesList = () => {
  const dispatch = useDispatch();

  const { UrlParams, handleSearch } = useAppParams({});
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const { dataLectures, loading } = useSelector((state) => state.lectures);
 
  useEffect(() => {
    if (UrlParams) {
      dispatch(
        getLectures({
          params: { ...UrlParams },
        })
      );
    }
  }, [dispatch, UrlParams]);

  useEffect(() => {
    setData(
      dataLectures?.lectures?.map((row, index) => ({
        key: `${row?.order_no}`,
        id: row?.id,
        adviser_name: row?.adviser_name,
        title: row?.title,
        video: row?.video,
        order: row?.order_no,
      }))
    );
  }, [dataLectures]);

  const ChangePaginationLectures = (number) => {
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
      title: "اسم المستشار",
      dataIndex: "adviser_name",
    },
    {
      title: "العنوان",
      dataIndex: "title",
    },
    {
      title: "الفيديو",
      dataIndex: "video",
      render: (value) => (
        <Space size="middle">
          <Link to={value}>
              <div className="row">
                <p className="text-center">
                  <MdOutlineOndemandVideo className="text-primary" />
                  <p>Preview</p>
                </p>
              </div>
          </Link>
        </Space>
      ),
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

  const confirm = ({ id, type, action }) => {
    if (action === "delete") {
      if (type === "single") {
        Modal.confirm({
          title: "هل تريد حذف المحاضرة",
          okText: "تأكيد",
          cancelText: "الغاء",
          onOk: () => 
          new Promise((resolve) => {
            dispatch(
              deleteLecture({
                id,
                callback: () => {
                  dispatch(
                    getLectures({
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
            title: "الرجاء تحديد مستخدم",
            okText: "موافق",
            cancelText: "الغاء",
          });
        } else {
          Modal.confirm({
            title: "هل تريد حذف المحاضرة",
            okText: "تأكيد",
            cancelText: "الغاء",
            onOk: () => {
              dispatch(
                deleteLectureAll({
                  selectedRows,
                  callback: () => {
                    setSelectedRows([]);
                    dispatch(
                      getLectures({
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

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    }),
  );

  const onDragEnd = ({ active, over }) => {

    if (active.id !== over?.id) {
      setData((prev) => {
        const activeIndex = prev.findIndex((i) => i.key == active.id);
        const overIndex = prev.findIndex((i) => i.key == over?.id);
        const sortedItems = arrayMove(prev, activeIndex, overIndex);

        const id = prev[activeIndex]?.id;

        dispatch(
          updateLectureOrder({
            id: id,
            values: { order: overIndex },
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

  return (
    <>

      <LecturesFilter noneField={false} />
    
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
            components={{
              body: {
                row: Row,
              },
            }}
            rowKey="key"
            columns={columns}
            loading={loading}
            dataSource={data}
            pagination={{
              current: Number(UrlParams?.page ? UrlParams?.page : 1),
              total: dataLectures?.total || 0,
              onChange: (page) => {
                ChangePaginationLectures(page);
              },
            }}
          />
        </SortableContext>
      </DndContext>
    </>
  );
};

export default LecturesList;
