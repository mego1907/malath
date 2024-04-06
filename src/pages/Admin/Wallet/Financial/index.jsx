import {
  Avatar,
  Typography,
  Table,
  Modal,
  Button,
  Form,
  Input,
  Select,
} from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import EmptyData from "../../../../components/Admin/EmptyData";
import {
  getWalletUsers,
  depoistWithdraw,
  getWalletUsersAll,
} from "../../../../store/Admin/actions/wallet";
import user from "../../../../assets/images/user.png";
import useAppParams from "../../../../hooks/useAppParams";
import { FaMinus, FaPlus } from "react-icons/fa";
import WalletFilter from "../Filter";
const { Title } = Typography;
const { Option } = Select;

const Financial = () => {
  const dispatch = useDispatch();

  const [dataDepoistWallet, setDepoistWallet] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const { loading: loadingWalletWithdraw } = useSelector(
    (state) => state.walletWithdraw
  );
  const { dataWalletUsers, loading: loadingWalletUsers } = useSelector(
    (state) => state.walletUsers
  );
  const { dataWalletUsersAll, loading: loadingWalletUsersAll } = useSelector(
    (state) => state.walletUsersAll
    );
  const [form] = Form.useForm();
  const { UrlParams, handleSearch } = useAppParams({});

  useEffect(() => {
    if (UrlParams) {
      dispatch(
        getWalletUsers({
          params: { ...UrlParams },
        })
      );
      dispatch(
        getWalletUsersAll({
          params: { ...UrlParams },
        })
      );
    }
  }, [dispatch, UrlParams]);


  useEffect(() => {
    setData(
      dataWalletUsersAll?.data?.transactions?.map((row) => ({
        key: row.id,
        id: row.id,
        name : row?.user?.full_name_ar,
        avatar: row?.avatar,
        phone: row?.user?.phone,
        email: row?.user?.email,
        amount: row?.amount,
        details: row?.details,
        created_at: row?.created_at,
        type: row?.type,
      }))
    );
  }, [dataWalletUsersAll]);

  const ChangePagination = (number) => {
    handleSearch({
      fields: {
        page: number,
      },
    });
  };

  const columns = [
    {
      title: "الاسم",
      dataIndex: "name_beneficiary",
      render: (text, row) => (
        <>
          <Avatar
            size={40}
            src={row?.avatar ? row?.avatar : user}
          />{" "}
          {row?.name}
        </>
      ),
    },
    {
      title: "نوع الحركة",
      dataIndex: "type",
      render: (row) => (
        <>
          {row === 1 ? <span className="text-success">ايداع</span> : row === 2 ? <span className="text-danger">سحب</span> : null}
        </>
      ),
    },
    
    {
      title: "قيمة الحركة",
      dataIndex: "amount",
    },
    {
      title: "وصف الحركة",
      dataIndex: "details",
    },
    {
      title: "تاريخ الحركة",
      dataIndex: "created_at",
    },
    {
      title: "الهاتف",
      dataIndex: "phone",
    },
    {
      title: "البريد الالكتروني",
      dataIndex: "email",
    },
  ];


  const onFinish = (values) => {
    values = {
      ...values,
      type: Number(dataDepoistWallet?.type),
      walletid: dataDepoistWallet?.walletid,
    };
    dispatch(
      depoistWithdraw({
        values,
        callback: () => {
          form.resetFields();
          setIsModalOpen(false);
          dispatch(
            getWalletUsersAll({
              params: { ...UrlParams },
            })
          );
        },
      })
    );
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div class="mb-15 group-btn">
        <button
          className="btn btn-add"
          onClick={() => {
            showModal();
            setDepoistWallet({ type: "1" });
          }}
        >
          <span className="icon">
            <FaPlus />
          </span>
          إيداع
        </button>
        <button
          className="btn btn-delete"
          onClick={() => {
            showModal();
            setDepoistWallet({ type: "2"});
          }}
        >
          <span className="icon">
            <FaMinus />
          </span>
          سحب
          
        </button>
      </div>
      <WalletFilter/>
      <Table
        locale={{ emptyText: <EmptyData /> }}
        size="small"
        columns={columns}
        loading={loadingWalletUsersAll}
        dataSource={data}
        pagination={{
          current: Number(UrlParams?.page ? UrlParams?.page : 1),
          total: dataWalletUsers?.data?.total,
          onChange: (page) => {
            ChangePagination(page);
          },
        }}
      />
      <Modal
        className="ModalWalet"
        title={false}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
      >
        <h3>{dataDepoistWallet?.type === "1"
                ? "إيداع"
                : dataDepoistWallet?.type === "2"
                ? "سحب"
                : null}</h3>
        <Form
          size="large"
          form={form}
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            label="حدد اسم المستفيد او المستشار المطلوب"
            name="userId"
            rules={[
              {
                required: true,
                message: "الحقل مطلوب",
              },
            ]}
          >
            <Select placeholder="اختر" loading={loadingWalletUsers}>
              {dataWalletUsers?.data?.map((item) => (
                <Option value={item.id}>{item.full_name_ar}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="حدد المبلغ"
            name="amount"
            rules={[
              {
                required: true,
                message: "الحقل مطلوب",
              },
            ]}
          >
            <Input placeholder=" المبلغ المطلوب" />
          </Form.Item>
          <Form.Item
            label="ملاحظات"
            name="details"
          >
            <Input placeholder=" ملاحظات" />
          </Form.Item>
          <Form.Item className="text-center mt-20">
            <Button
              loading={loadingWalletWithdraw}
              key="submit"
              htmlType="submit"
              type="primary"
            >
              {dataDepoistWallet?.type === "1"
                ? "إيداع"
                : dataDepoistWallet?.type === "2"
                ? "سحب"
                : null}
            </Button>
            ,
            <Button type="primary" danger onClick={handleCancel}>
              إلغاء
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Financial;
