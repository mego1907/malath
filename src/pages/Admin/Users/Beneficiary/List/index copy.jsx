import { Alert, Button, Modal, notification, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import EmptyData from "../../../../../components/Admin/EmptyData";
import { deleteUser, deleteUserAll, getUsers } from "../../../../../store/Admin/actions/users";
import { FaBan, FaCheckCircle, FaPlus, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import UsersFilter from "../../Filter";
import useAppParams from "../../../../../hooks/useAppParams";

const BeneficiaryUsersList = () => {
  const dispatch = useDispatch();
  const { urlParams, handleSearch } = useAppParams();
  const [pageBene, setPageBene] = useState(1);
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [typeDelete, setTypeDelete] = useState();
  const [userId, setUserId] = useState([]);
  const [open, setOpen] = useState(false);
  const { dataUsers, loading, error } = useSelector((state) => state.users);
  const { loading:loadingUserDelete, error:errorUserDelete } = useSelector((state) => state.userDelete);
  
  
  // ,

  useEffect(() => {
    dispatch(
      getUsers({
        params:{...urlParams , role:'BENEFICIARY'},
      })
    );
  }, [dispatch , pageBene ,loadingUserDelete , urlParams]);

  useEffect(() => {
    setData(
      dataUsers?.data?.users?.map((row) => ({
        key: row?.id,
        id: row?.id,
        name: row?.full_name_ar,
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
      }))
    );
  }, [dataUsers]);

 
  const ChangePaginationBene = (number) => {
    handleSearch({
      fields: {
        page: number,
      },
    });
    setPageBene(number);
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        selectedRowKeys
      );
      setSelectedRows(selectedRowKeys)
    },
  };

 
  const columns_bene = [
    {
      title: "الاسم",
      dataIndex: "name",
    },
    {
      title: "الحالة",
      dataIndex: "blocked",
      render: (row) => (
        <div className={row === true ? 'text-success' : row === false ? 'text-danger' :null}>{row === true ? 'فعال' : row === false ? 'غير فعال' :null}</div>
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
      title: "الاجراءات",
      key: "action",
      render: (value) => (
        <Space size="middle">
          <button className="text-danger bg-white pointer"
            onClick={()=>{showModal(value.id);setTypeDelete('single')}}>
            <FaRegTrashAlt />
          </button>
          <Link className="text-success"
            to={`${value?.id}/edit`}>
            <FaRegEdit />
          </Link>
          {/* <Link
            to={`${value?.id}`}
            onClick={() => {
              setState({ value });
            }}>
            <FaRegTrashAlt />
          </Link> */}
        </Space>
      ),
    },
  ];
  let locale = {
    emptyText: <EmptyData /> ,
  };


  const openNotificationWithIcon = type => {
    notification[type]({
      message: 'تم حذف المستخدم بنجاح',
      duration: 2
    })
  }

  const showModal = async  (id) => {
    setUserId(id)
    setOpen(true);
    console.log(userId)
  };
  const handleOk = async  () => {
    if(typeDelete === 'single'){
      dispatch(
        deleteUser({
          userId,
        callback: () => {
          openNotificationWithIcon('success')
          setOpen(false);
        },
      })
      );
    }else if(typeDelete === 'multible'){
      console.log(selectedRows)
      dispatch(
        deleteUserAll({
          selectedRows,
        callback: () => {
          openNotificationWithIcon('success')
          setOpen(false);
        },
      })
      );
    }
  }
  
  const handleCancel = () => {
    setOpen(false);
  };
  
  return (
    <>
      {error ? <Alert message={error} type="error" /> : null}
      <UsersFilter />
      <div className="mb-15 group-btn">
        <Link className="btn btn-add" to="create"> <span className="icon"><FaPlus/></span> اضافة</Link>
        <button className="btn btn-delete" to="create"  onClick={()=>{showModal() ; setTypeDelete('multible')}}> <span className="icon"><FaRegTrashAlt/></span> حذف</button>
        <Link className="btn btn-activate" to="create"> <span className="icon"><FaCheckCircle/></span> تفعيل</Link>
        <Link className="btn btn-blocked" to="create"> <span className="icon"><FaBan/></span> تعطيل</Link>
      </div>
      
      <Table locale={locale} size="small"
        rowSelection={{
          ...rowSelection,
        }}
        columns={columns_bene}
        loading={loading}
        dataSource={data}
        pagination={{
          pageSize: 10,
          total: dataUsers?.data?.total,
          onChange: (page) => {
            ChangePaginationBene(page) 
          },
        }}
      />
      <Modal
        open={open}
        title="هل تريد حذف المستخدم ؟"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            اغلاق 
          </Button>,
          <Button key="submit" type="primary" loading={loadingUserDelete} onClick={()=>handleOk(userId)}>
            حذف
          </Button>,
        ]}
      >
        {errorUserDelete? <Alert message={errorUserDelete} type="error" /> : null}
      </Modal>
    </>
  );
};

export default BeneficiaryUsersList;
