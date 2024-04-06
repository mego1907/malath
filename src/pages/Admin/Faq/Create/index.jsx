import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  Input,
  notification,
  Row,
} from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createFaq } from "../../../../store/Admin/actions/faq";

const FaqCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.faqStore);
  const [form] = Form.useForm();


  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "تم اضافة السؤال بنجاح",
      duration: 2,
    });
  };


  const onFinish = (values) => {
    values = {
      ...values,
      type : 'QUESTION',
    }
    dispatch(
      createFaq
      ({
        values, 
        callback: () => {
          openNotificationWithIcon("success");
          form.resetFields();
          navigate("/admin/faq");
        },
      })
      );
  };


  return (
    <Card>
      <h3 className="mb-20">أضف سؤال</h3>
      {error ? <Alert className="mb-10" message={error} type="error" /> : null}
      <Row justify="center">
        <Col lg={20}>
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
                  <Input.TextArea rows={10} placeholder="نص المقال بالعربية" />
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
                  <Input.TextArea rows={10} placeholder="نص المقال بالانجليزية"  />
                </Form.Item>
              </Col>
            </Row>
            <div className="text-center">
              <Form.Item>
                <Button loading={loading} type="primary" htmlType="submit">
                إضافة السؤال
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Col>
      </Row>
    </Card>
  );
};

export default FaqCreate;
