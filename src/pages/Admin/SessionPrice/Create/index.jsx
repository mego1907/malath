import { Button, Card, Checkbox, Col, Form,InputNumber, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sessionPrice , sessionPricePost } from "../../../../store/Admin/actions/sessionPrice";

const SessionPrice = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { dataSessionPrice, loading } = useSelector(
    (state) => state.sessionPrice
  );

  const { loading:loadingPost } = useSelector(
    (state) => state.sessionPricePost
  );

  useEffect(() => {
    dispatch(sessionPrice());
  }, [dispatch]);

  useEffect(() => {
    if (dataSessionPrice) {
      form.setFieldsValue(dataSessionPrice?.data);
    }
  }, [dataSessionPrice]);

  const onFinish = (values) => {
    // values ={
    //   ...values,
    //   sessionprice:Number(values.sessionprice),
    //   sessiontax:Number(values.sessiontax)
    // }
    // console.log("Success:", values);
    dispatch(sessionPricePost(values));
  };

  return (
    <Row justify="center">
      <Col span={24} lg={8}>
        <Card loading={loading}>
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
            autoComplete="off"
          >
            <Form.Item
              label="سعر الجلسة الكلي (المبلغ بالدولار $)"
              name="sessionprice"
              rules={[
                {
                  required: true,
                  message: "الحقل مطلوب!",
                },
              ]}
            >
              <InputNumber min={0} style={{width:"100%"}}  />
            </Form.Item>

            <Form.Item
              label="سعر الجلسة الكلي (المبلغ بالدولار $)"
              name="sessiontax"
              rules={[
                {
                  required: true,
                  message: "الحقل مطلوب!",
                },
              ]}
            >
              <InputNumber min={0} style={{width:"100%"}}  />
            </Form.Item>
            <Form.Item
              label="الحد الادنى للسحب (المبلغ بالدولار $)"
              name="holdlimit"
              rules={[
                {
                  required: true,
                  message: "الحقل مطلوب!",
                },
              ]}
            >
              <InputNumber min={1} style={{width:"100%"}}  />
            </Form.Item>

            <Form.Item name="ispromo" valuePropName="checked">
              <Checkbox>سعر عرض مؤقت</Checkbox>
            </Form.Item>

            <Form.Item className="text-center">
              <Button loading={loadingPost} type="primary" htmlType="submit" className="width-110">
                تعديل
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default SessionPrice;
