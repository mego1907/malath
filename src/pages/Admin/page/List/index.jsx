import {
  Alert,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  notification,
  Row,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../../components/Admin/Loading/Loading";
import { getPage, updatePage } from "../../../../store/Admin/actions/page";
import { FaPlus } from "react-icons/fa";
import {
  cancellaionfee,
  cancellaionfeePost,
  cancellaionfeeDelete,
} from "../../../../store/Admin/actions/cancellaionfee";

const PageList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dataPage, loading, error } = useSelector((state) => state.page);
  const { loading: loadingPageUpdate, error: errorPageUpdate } = useSelector(
    (state) => state.pageUpdate
  );
  const { dataCancellaionfee, loading: loadingCancellaionfee } = useSelector(
    (state) => state.cancellaionfee
  );

  const { loading: loadingCancellaionfeePost } = useSelector(
    (state) => state.cancellaionfeePost
  );
  // const { loading: loadingCancellaionfeeDelete } = useSelector(
  //   (state) => state.cancellaionfeeDelete
  // );
  const { type } = useParams();

  const [data, setData] = useState();
  // const [stateUpdatePage, setUpdatePage] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [form2] = Form.useForm();

  useEffect(() => {
    if (type === "about") {
      setData("ABOUT");
    } else if (type === "policy") {
      setData("POLICY");
    } else if (type === "terms") {
      setData("TERMS");
    } else if (type === "cancel-policy") {
      setData("CANCELLATIONPOLICY");
    } else {
      navigate("/pageNotFound");
      // console.log(type)
    }
  }, [data, type]);

  useEffect(() => {
    if (data) {
      dispatch(getPage(data));
      // form.resetFields();
    }
  }, [dispatch, data]);

  useEffect(() => {
    if (type === "cancel-policy") {
      dispatch(cancellaionfee());
    }
  }, [dispatch , type]);

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "تم التعديل بنجاح",
      duration: 2,
    });
  };

  const onFinish = (values) => {
    values = {
      ...values,
      id: dataPage?.data?.id,
      type: dataPage?.data?.type,
    };
    dispatch(
      updatePage({
        values,
        callback: () => {
          // setUpdatePage(values);
          navigate(`/admin/page/${type}`);
          openNotificationWithIcon("success");
        },
      })
    );
  };

  const onFinish2 = (values) => {
    dispatch(
      cancellaionfeePost({
        values,
        callback: () => {
          dispatch(cancellaionfee());
          setIsModalOpen(false);
          form2.resetFields();
        },
      })
    );
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const confirm = ({ id }) => {
    Modal.confirm({
      title: "هل تريد الحذف",
      okText: "تأكيد",
      cancelText: "الغاء",
      onOk: () =>
        new Promise((resolve) => {
          dispatch(
            cancellaionfeeDelete({
              id,
              callback: () => {
                dispatch(cancellaionfee());
                resolve();
              },
            })
          );
        }),
    });
  };

  useEffect(() => {
    form.setFieldsValue(dataPage?.data)
  }, [dataPage , data])
    

  return (
    <>
      <Card>
        {error ? <Alert type="error" message={error} /> : null}
        {errorPageUpdate ? (
          <Alert type="error" message={errorPageUpdate} />
        ) : null}
        {loading ? (
          <Loading />
        ) : (
          <Row justify="center pt-20 pb-20">
            <Col span={24} lg={22}>
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
                // initialValues={dataPage?.data}
              >
                <Row gutter={20} justify="center">
                  <Col span={24}>
                    <Form.Item
                      name="title_ar"
                      rules={[
                        {
                          required: true,
                          message: "الحقل مطلوب",
                        },
                      ]}
                    >
                      <Input placeholder="العنوان باللغة العربية" />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      name="title"
                      rules={[
                        {
                          required: true,
                          message: "الحقل مطلوب",
                        },
                      ]}
                    >
                      <Input placeholder="العنوان باللغة الانجليزية" />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      name="data_ar"
                      rules={[
                        {
                          required: true,
                          message: "الحقل مطلوب",
                        },
                      ]}
                    >
                      <Input.TextArea
                        rows={10}
                        placeholder="نص المقال بالعربية"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      name="data"
                      rules={[
                        {
                          required: true,
                          message: "الحقل مطلوب",
                        },
                      ]}
                    >
                      <Input.TextArea
                        rows={10}
                        placeholder="نص المقال بالانجليزية"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <div className="text-center">
                  <Form.Item>
                    <Button
                      loading={loadingPageUpdate}
                      type="primary"
                      htmlType="submit"
                    >
                      حفظ التعديلات
                    </Button>
                  </Form.Item>
                </div>
              </Form>
              {type === "cancel-policy" ? (
                <>
                  <Divider />
                  <div className="d-flex align-items-center justify-content-between">
                    <h4>إلغاء الجلسة</h4>
                    <div className="mb-15 group-btn">
                      <button className="btn btn-add" onClick={showModal}>
                        <span className="icon">
                          <FaPlus />
                        </span>
                        إضافة إجراء جديد
                      </button>
                    </div>
                  </div>
                  <div className="card-cancel-policy">
                    {loadingCancellaionfee ? (
                      <Loading />
                    ) : dataCancellaionfee?.data?.length > 0 ? (
                      <>
                        {dataCancellaionfee?.data?.map((item) => (
                          <div className="cancellaionfee-card">
                            <div className="cancellaionfee">
                              <h4 className="cancellaionfee-label">
                                في حال تم الالغاء قبل هذة المدة من الموعد (الوقت
                                بالساعة)
                              </h4>
                              <div className="cancellaionfee-result">
                                {item?.hours}
                              </div>
                            </div>
                            <div className="cancellaionfee">
                              <h4 className="cancellaionfee-label">
                                مبلغ الخصم من المستفيد (المبلغ بالدولار)
                              </h4>
                              <div className="cancellaionfee-result">
                                {item?.fee}
                              </div>
                            </div>
                            <div className="text-end">
                              {/* <Button
                                onClick={() => deleteCancellaionfee(item?.id)}
                                danger
                                loading={loadingCancellaionfeeDelete}
                              >
                                حذف
                              </Button> */}
                              <Button
                                onClick={() => {
                                  confirm({ id: item?.id });
                                }}
                              >
                                حذف
                              </Button>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <h3 className="pt-5 pb-5 text-center">لا توجد بيانات</h3>
                    )}
                  </div>
                </>
              ) : null}
            </Col>
          </Row>
        )}
      </Card>

      <Modal
        title="أضف جديد"
        footer={false}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          size="large"
          form={form2}
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          onFinish={onFinish2}
          autoComplete="off"
        >
          <Form.Item
            label="في حال تم الالغاء قبل هذة المدة من الموعد (الوقت بالساعة)"
            name="hours"
            rules={[
              {
                required: true,
                message: "الحقل مطلوب!",
              },
            ]}
          >
            {/* <Input /> */}
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="مبلغ الخصم من المستفيد (المبلغ بالدولار)"
            name="fee"
            rules={[
              {
                required: true,
                message: "الحقل مطلوب!",
              },
            ]}
          >
            {/* <Input /> */}
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item className="text-center">
            <Button
              loading={loadingCancellaionfeePost}
              type="primary"
              htmlType="submit"
              className="width-110"
            >
              حفظ
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default PageList;
