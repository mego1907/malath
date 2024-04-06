import {
  Avatar,
  Card,
  Col,
  Typography,
  Row,
  Space,
  Table,
  Modal,
} from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import EmptyData from "../../../../components/Admin/EmptyData";
import {
  getTransactions,
  getWallet,
  returnWallet,
  deactivateWallet,
  activateWallet,
} from "../../../../store/Admin/actions/wallet";
import user from "../../../../assets/images/user.png";
import useAppParams from "../../../../hooks/useAppParams";
const { Title } = Typography;

const TransactionsList = () => {
  const dispatch = useDispatch();

  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  // const { loading: loadingWalletWithdraw } = useSelector(
  //   (state) => state.walletWithdraw
  // );
  const { dataTransactions, loading: loadingTransactions } = useSelector(
    (state) => state.transactions
    );
  const { dataWallet, loading } = useSelector((state) => state.wallet);
  // const [form] = Form.useForm();
  const { UrlParams, handleSearch } = useAppParams({});

  useEffect(() => {
    if (UrlParams) {
      dispatch(
        getTransactions({
          params: { ...UrlParams },
        })
      );
    }
  }, [dispatch, UrlParams]);

  // useEffect(() => {
  //     dispatch(
  //       getTransactions({
  //         // page:page
  //       })
  //     );
  // }, [dispatch , page])

  useEffect(() => {
    dispatch(getWallet());
  }, [dispatch]);

  useEffect(() => {
    setData(
      dataTransactions?.data?.transactions?.map((row) => ({
        key: row.id,
        id: row.id,
        name_beneficiary: row?.beneficiary?.full_name,
        avatar_beneficiary: row?.beneficiary?.avatar,
        name_adviser: row?.adviser?.full_name,
        avatar_adviser: row?.adviser?.avatar,
        amount: row?.amount,
        state: row?.state,
        tax: row?.tax,
        type: row?.type,
        walletid: row?.walletid,
      }))
    );
  }, [dataTransactions]);

  const ChangePagination = (number) => {
    handleSearch({
      fields: {
        page: number,
      },
    });
  };

  const columns = [
    {
      title: "إسم المستفيد",
      dataIndex: "name_beneficiary",
      render: (text, row) => (
        <>
          <Avatar
            size={40}
            src={row?.avatar_beneficiary ? row?.avatar_beneficiary : user}
          />{" "}
          {row?.name_beneficiary}
        </>
      ),
    },
    {
      title: "إسم المستشار",
      dataIndex: "name_adviser",
      render: (text, row) => (
        <>
          <Avatar
            size={40}
            src={row?.avatar_beneficiary ? row?.avatar_beneficiary : user}
          />{" "}
          {row?.name_adviser}
        </>
      ),
    },
    {
      title: "المبلغ",
      dataIndex: "amount",
    },
    {
      title: "الضريبة المستفادة",
      dataIndex: "tax",
    },
    {
      title: "حالة الحوالة",
      dataIndex: "state",
      render: (row) => (
        <div>
          {row === 1 ? (
            <span className="text-success">فعالة</span>
          ) : row === 2 ? (
            <span className="text-danger">معطلة</span>
          ) :  row === 3 ? (
            <span className="text-danger">مرجعة</span>
          ) : null}
        </div>
      ),
    },

    {
      title: "الاجراءات",
      key: "action",
      render: (row) => (
        <Space size="middle">
          {/* <button
            className="btn btn-outline-danger"
            onClick={() => {
              showModal();
              setDepoistWallet({ type: "2", walletid: row?.walletid });
            }}
          >
            سحب
          </button>
          <button
            className="btn btn-outline-info"
            onClick={() => {
              showModal();
              setDepoistWallet({ type: "1", walletid: row?.walletid });
            }}
          >
            إيداع
          </button> */}
          {row?.state === 2 ? (
            <div><button onClick={() => { confirm({ id: row?.id, action: "activate" }) }} className="btn btn-outline-success ml-10"> تفعيل </button>
            <button onClick={() => { confirm({ id: row?.id, action: "return" }) }} className="btn btn-outline-danger"> ارجاع </button></div>
            ) : row?.state === 1 ? (
            <button onClick={() => { confirm({ id: row?.id, action: "deactivate" }) }} className="btn btn-outline-danger"> تعطيل </button>
          )  : null}
        </Space>
      ),
    },
  ];


  const confirm = ({ id, action }) => {
    if (action === "activate") {
      Modal.confirm({
        title: "هل تريد تفعيل الحوالة",
        okText: "تأكيد",
        cancelText: "الغاء",
        onOk: () => 
          new Promise((resolve) => {
          dispatch(
            activateWallet({
              id,
              callback: () => {
                dispatch(
                  getTransactions({
                    params: { ...UrlParams },
                  })
                );
                resolve()
              },
            })
          );
        })
      });
    } else if (action === "deactivate") {
      Modal.confirm({
        title: "هل تريد تعطيل الحوالة",
        okText: "تأكيد",
        cancelText: "الغاء",
        onOk: () => 
          new Promise((resolve) => {
            dispatch(
              deactivateWallet({
                id,
                callback: () => {
                  dispatch(
                    getTransactions({
                      params: { ...UrlParams },
                    })
                  );
                  resolve()
                },
              })
            );
          })
      });
    }
    else if (action === "return") {
      Modal.confirm({
        title: "هل تريد ارجاع الحوالة",
        okText: "تأكيد",
        cancelText: "الغاء",
        onOk: () => 
          new Promise((resolve) => {
            dispatch(
              returnWallet({
                id,
                callback: () => {
                  dispatch(
                    getTransactions({
                      params: { ...UrlParams },
                    })
                  );
                  resolve()
                },
              })
            );
          })
      });
    }
  };



  // const onFinish = (values) => {
  //   values = {
  //     ...values,
  //     type: Number(dataDepoistWallet?.type),
  //     walletid: dataDepoistWallet?.walletid,
  //   };
  //   console.log(values);
  //   dispatch(
  //     depoistWithdraw({
  //       values,
  //       callback: () => {
  //         form.resetFields();
  //         setIsModalOpen(false);
  //       },
  //     })
  //   );
  // };
  // const showModal = () => {
  //   setIsModalOpen(true);
  // };
  // const handleCancel = () => {
  //   setIsModalOpen(false);
  // };

  return (
    <>
      <Row gutter={20}>
        <Col lg={4} md={6} span={24}>
          <Card className="mb-20 text-center" loading={loading}>
            <h4 className="mb-10">المبلغ الكلي</h4>
            <Title className="mb-0" level={1}>
            $ {dataWallet?.data?.total}
            </Title>
          </Card>
        </Col>
        <Col lg={4} md={6} span={24}>
          <Card className="mb-20 text-center" loading={loading}>
            <h4 className="mb-10">الأرباح</h4>
            <Title className="mb-0" level={1}>
            $ {dataWallet?.data?.available}
            </Title>
          </Card>
        </Col>
      </Row>
      <Table
        locale={{ emptyText: <EmptyData /> }}
        size="small"
        columns={columns}
        loading={loadingTransactions}
        dataSource={data}
        pagination={{
          current: Number(UrlParams?.page ? UrlParams?.page : 1),
          total: dataTransactions?.data?.total,
          onChange: (page) => {
            ChangePagination(page);
          },
        }}
      />
      {/* <Modal
        className="ModalWalet"
        title={false}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
      >
        <Form
          size="large"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            label={
              dataDepoistWallet?.type === "1"
                ? "إيداع مبلغ"
                : dataDepoistWallet?.type === "2"
                ? "سحب مبلغ"
                : null
            }
            name="amount"
            rules={[
              {
                required: true,
                message: "الحقل مطلوب",
              },
            ]}
          >
            <Input placeholder="إضافة المبلغ المطلوب" />
          </Form.Item>
          <Form.Item>
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
      </Modal> */}
    </>
  );
};

export default TransactionsList;
