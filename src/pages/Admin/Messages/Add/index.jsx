import React from "react";
import { socket } from "../../../../context/socket";
import { Button, Col, Form, Input, Row } from "antd";
import { sendNewMessage } from "../../../../socketConnection";

const MessagesAdd = (props) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    sendNewMessage({
      text: values.text,
      id: props.id
    })
    form.resetFields();
  };

  return (
    <>
      <Form
        className="pr-15 pl-15"
        size="large"
        form={form}
        onFinish={onFinish}
      >
        <Row gutter={10}>
          <Col span={22}>
            <Form.Item
              name="text"
              rules={[
                {
                  required: true,
                  message: "الحقل مطلوب!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                ارسال
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default MessagesAdd;
