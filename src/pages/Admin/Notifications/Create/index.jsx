import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
} from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getUsersNotifi,
  sendNotifiSpecific,
  sendNotifi,
} from "../../../../store/Admin/actions/notifications";
const { Option } = Select;

const NotificationsCreate = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const [valueType, setValueType] = useState(1);
  const [selectUser, setSelectUser] = useState(false);
  const { dataUsersNotifi, loading } = useSelector(
    (state) => state.notificationUsers
  );
  const { loading: loadingNotificationSend } = useSelector(
    (state) => state.notificationSend
  );
  const { loading: loadingNotificationSendSpecific } = useSelector(
    (state) => state.notificationSendSpecific
  );
  const [form] = Form.useForm();

  const onFinish = (values) => {
    if(state){
      values = {
        ...values,
        ids: state?.id
      }
      dispatch(
        sendNotifiSpecific({
          values,
          callback: () => {
            // form.resetFields();
            form.setFieldsValue({ title: [] , body: []});
          },
        })
      );
    }else{
      if (valueType === "1" || valueType === "2" || valueType === "3") {
        dispatch(
          sendNotifi({
            values,
            callback: () => {
              form.resetFields();
            },
          })
        );
      } else if (valueType === "4") {
        dispatch(
          sendNotifiSpecific({
            values,
            callback: () => {
              form.resetFields();
            },
          })
        );
      }
    }
    // console.log(values)
    
  };

  const onChange = (values) => {
    setValueType(values);
    if (values === "4") {
      setSelectUser(true);
    } else {
      setSelectUser(false);
    }
  };

  useEffect(() => {
    dispatch(getUsersNotifi({}));
  }, [dispatch]);


  useEffect(() => {
    if(state){
      form.setFieldsValue(state);
    }
  }, [state]);

  return (
    <Card>
      <h3 className="mb-20">إرسال الى</h3>
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
            // initialValues={state?.name}
            // fields={[
            //   {
            //     name: ["type"],
            //     value: valueType,
            //   },
            // ]}
          >
            <Row gutter={20} justify="center">
              {state ? (
               <Col span={24}>
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "الحقل مطلوب",
                    },
                  ]}
                >
                  <Input disabled placeholder="الاسم" />
                </Form.Item>
                </Col>
              ) : (
                <>
                  <Col span={24}>
                    <Form.Item
                      name="type"
                      rules={[
                        {
                          required: true,
                          message: "الحقل مطلوب",
                        },
                      ]}
                    >
                      <Select
                        placeholder="اختر.."
                        loading={loading}
                        onChange={onChange}
                      >
                        <Option value="1">الكل</Option>
                        <Option value="2">المستشارين</Option>
                        <Option value="3">المستفيدين</Option>
                        <Option value="4">جزء معين</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  {selectUser ? (
                    <Col span={24}>
                      <Form.Item
                        name="ids"
                        rules={[
                          {
                            required: true,
                            message: "الحقل مطلوب",
                          },
                        ]}
                      >
                        <Select
                          mode="multiple"
                          placeholder="اختر ..."
                          loading={loading}
                        >
                          {dataUsersNotifi?.data?.map((item, index) => (
                            <Option key={index} value={item.id}>
                              {item.full_name_ar}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  ) : null}
                </>
              )}

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
                  <Input placeholder="عنوان الإشعار" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="body"
                  rules={[
                    {
                      required: true,
                      message: "نص الإشعار",
                    },
                  ]}
                >
                  <Input.TextArea rows={10} placeholder="نص الاشعار" />
                </Form.Item>
              </Col>
            </Row>
            <div className="text-center">
              <Form.Item>
                <Button
                  loading={
                    loadingNotificationSendSpecific || loadingNotificationSend
                  }
                  type="primary"
                  htmlType="submit"
                >
                  ارسال
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Col>
      </Row>
    </Card>
  );
};

export default NotificationsCreate;
