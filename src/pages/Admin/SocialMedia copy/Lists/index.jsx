import { Avatar, Modal, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import EmptyData from "../../../../components/Admin/EmptyData";
import { SocialMediaActicvate, SocialMediaDeactivate, deleteSocialMedia, getSocialMedia } from "../../../../store/Admin/actions/socialMedia";
const SocialMediaLists = () => {
  const dispatch = useDispatch();


  const [data, setData] = useState([]);
  const {dataSocialMedia, loading } = useSelector((state) => state.socialMedia);


  useEffect(() => {
      dispatch(
        getSocialMedia()
      );
    
  }, [dispatch]);


  useEffect(() => {
    setData(
      dataSocialMedia?.data?.map((row) => ({
        key: row?.id,
        id: row?.id,
        image: row?.image,
        name: row?.name,
        url: row?.url,
        valid: row?.valid,
      }))
    );
  }, [dataSocialMedia]);


  const columns = [
    {
      title: "الايقونة",
      dataIndex: "image",
      render: (row) => (
        <><Avatar size={40} src={row} /></>
      ),
    },
    {
      title: "موقع التواصل الاجتماعي",
      dataIndex: "name",
    },
    {
      title: "الرابط",
      dataIndex: "url",
      render: (row) => (
        <><a href={row} target="_blank">{row}</a></>
      ),
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
      render: (row) => (
        <Space size="middle">
          <button className="btn btn-outline-danger" onClick={() => { confirm({ id: row.id, action: "delete" }); }}>
            حذف
          </button>
          {/* <button className="btn btn-outline-danger" onClick={()=>{showModal(row.id);setTypeDelete('single')}}>
            حذف
          </button> */}
          <Link className="btn btn-outline-info" to={`/admin/social-media/${row.id}/edit`}>تعديل</Link>
          <button className="btn btn-outline-success" onClick={() => { confirm({ id: row.id, action: "activate" }); }}>
            تفعيل
          </button>
          <button className="btn btn-outline-danger" onClick={() => { confirm({ id: row.id, action: "deactivate" }); }}>
            تعطيل
          </button>
        </Space>
      ),
    },
  ];
  let locale = {
    emptyText: <EmptyData /> ,
  };
 


  const confirm = ({ id, action }) => {
    if (action === "delete") {
      Modal.confirm({
        title: "هل تريد حذف موقع التواصل الاجتماعي",
        okText: "تأكيد",
        cancelText: "الغاء",
        onOk: () => 
          new Promise((resolve) => {
          dispatch(
            deleteSocialMedia({
              id,
            callback: () => {
              dispatch(getSocialMedia())
              resolve();
            },
          })
          );
        })
      });
    }
    else if (action === "activate") {
      Modal.confirm({
        title: "هل تريد تفعيل موقع التواصل الاجتماعي",
        okText: "تأكيد",
        cancelText: "الغاء",
        onOk: () => 
          new Promise((resolve) => {
          dispatch(
            SocialMediaActicvate({
              id,
            callback: () => {
              dispatch(getSocialMedia())
              resolve();
            },
          })
          );
        })
      });
    }
    else if (action === "deactivate") {
      Modal.confirm({
        title: "هل تريد تعطيل موقع التواصل الاجتماعي",
        okText: "تأكيد",
        cancelText: "الغاء",
        onOk: () => 
          new Promise((resolve) => {
          dispatch(
            SocialMediaDeactivate({
              id,
            callback: () => {
              dispatch(getSocialMedia())
              resolve();
            },
          })
          );
        })
      });
    }
  }
  // const showModal = async  (id) => {
  //   setNotifiId(id)
  //   setOpen(true);
  //   console.log(typeDelete)
  //   console.log(typeDelete)
  // };
  // const handleOk = async  () => {
  //   if(typeDelete === 'single'){
  //     dispatch(
  //       deleteSocialMedia({
  //       notifiId,
  //       callback: () => {
  //         setOpen(false);
  //       },
  //     })
  //     );
  //   }else if(typeDelete === 'multible'){
  //     dispatch(
  //       deleteSocialMediaAll({
  //         selectedRows,
  //       callback: () => {
  //         setOpen(false);
  //       },
  //     })
  //     );
  //   }
  // };
  // const handleCancel = () => {
  //   setOpen(false);
  // };


  // useEffect(() => {
  //   console.log(typeDelete)
  // }, [typeDelete])
  


  return (
    <>
      <div className="mb-15 group-btn">
        <Link className="btn btn-add" to="create"> <span className="icon"><FaPlus/></span> اضافة</Link>
        {/* <button className="btn btn-delete" to="create"  onClick={()=>{showModal() ; setTypeDelete('multible')}}> <span className="icon"><FaRegTrashAlt/></span> حذف</button> */}
      </div>
      <Table locale={locale} size="small"
        columns={columns}
        loading={loading}
        dataSource={data}
      />
        {/* <Modal
          open={open}
          title="هل تريد حذف وسيلة التواصل الاجتماعي ؟"
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              اغلاق 
            </Button>,
            <Button key="submit" type="primary" loading={loadingNotificationDelete} onClick={()=>{handleOk(notifiId);setTypeDelete('single')}}>
              حذف
            </Button>,
          ]}
        >
          {errorNotificationDelete? <Alert message={errorNotificationDelete} type="error" /> : null}
        </Modal> */}
    </>
  );
};

export default SocialMediaLists;
