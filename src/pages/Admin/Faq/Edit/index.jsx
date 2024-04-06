import { Alert, Button, Card, Col, Form, Input, notification, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editFaq, getFaqSingle } from "../../../../store/Admin/actions/faq";
import Loading from "../../../../components/Admin/Loading/Loading";

const FaqEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    dataFaqSingle,
    loading: loadingFaqSingle,
    error: errorFaqSingle,
  } = useSelector((state) => state.faqSingle);
  const { loading, error } = useSelector((state) => state.faqEdit);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getFaqSingle(id));
    // console.log(dataFaqSingle);
  }, [dispatch]);

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "تم تعديل السؤال بنجاح",
      duration: 2,
    });
  };

  const onFinish = (values) => {
    values = {
      ...values,
      type: "QUESTION",
      id: id,
    };
    dispatch(
      editFaq({
        values,
        callback: () => {
          openNotificationWithIcon("success");
          form.resetFields();
          navigate("/admin/faq");
        },
      })
    );
  };


  useEffect(() => {
    if (dataFaqSingle) {
      form.setFieldsValue(dataFaqSingle);
    }
  }, [dataFaqSingle]);


  return (
    <Card>
      <h3 className="mb-20">تعديل السؤال</h3>
      {error ? <Alert className="mb-10" message={error} type="error" /> : null}
      {errorFaqSingle ? (
        <Alert className="mb-10" message={errorFaqSingle} type="error" />
      ) : null}
      {loadingFaqSingle ? (
        <Loading />
      ) : (
        <Row justify="center">
          <Col lg={20}>
            <Form
             form={form}
              size="large"
              labelCol={{
                span: 24,
              }}
              wrapperCol={{
                span: 24,
              }}
              onFinish={onFinish}
              // fields={[
              //   {
              //     name: ["title"],
              //     value: dataFaqSingle?.title,
              //   },
              //   {
              //     name: ["body"],
              //     value: dataFaqSingle?.body,
              //   },
              // ]}
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
                    <Input placeholder="السؤال باللغة العربية" />
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
                    <Input placeholder="السؤال باللغة الانجلزية" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="body_ar"
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
                    name="body"
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
                  <Button loading={loading} type="primary" htmlType="submit">
                    حفظ التعديلات
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </Col>
        </Row>
      )}
    </Card>
  );
};

export default FaqEdit;
