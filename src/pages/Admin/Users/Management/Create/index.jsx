import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Upload,
} from "antd";

import { FaRegImage, FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  createUser,
  getOneUser,
  updateUser,
} from "../../../../../store/Admin/actions/users";
import {
  getCountries,
} from "../../../../../store/Admin/actions/constants";
import Loading from "../../../../../components/Admin/Loading/Loading";

const { Option } = Select;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const ManagementUsersCreate = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

 
  const [isUpdate, setIsUpdate] = useState(false);

  const { dataUser, loading: loadingUser } = useSelector((state) => state.user);
  const { loading: loadingUpdate } = useSelector((state) => state.userUpdate);
  const { loading: loadingCreate } = useSelector((state) => state.userCreate);

  const [imageUrl, setImageUrl] = useState(undefined);
  const [loadingImage, setLoadingImage] = useState(false);

  useEffect(() => {
      dispatch(getCountries());
      if (id) {
        setIsUpdate(true);
        dispatch(getOneUser(id));
      }
  }, [dispatch]);

 

  const onFinish = (values) => {
    values = {
      ...values,
      timezone: "+3",
      id: id,
      role: "MANAGEMENT",
    };
    const formData = new FormData();
    Object.keys(values).forEach((element) =>
      formData.append(element, values[element])
    );
    if (!imageUrl) {
      Modal.error({
        title: "حقل الصورة مطلوب",
      });
    } else {
      if (id) {
        dispatch(
          updateUser({
            values: formData,
            callback: () => {
              form.resetFields();
              navigate(`/admin/management/users`);
            },
          })
        );
      } else {
        dispatch(
          createUser({
            values: formData,
            callback: () => {
              form.resetFields();
              navigate(`/admin/management/users`);
            },
          })
        );
      }
    }
  };

  
 
  const uploadButton = (
    <div>
      {loadingImage ? <FaSpinner /> : <FaRegImage />}
      <div
        style={{
          marginTop: 8,
        }}
      ></div>
    </div>
  );

  const handleChange = ({ file }) => {
    if (file && file?.originFileObj) {
      setLoadingImage(true)
      form.setFieldsValue({
        avatar: file.originFileObj,
      });
    }
    getBase64(file.originFileObj, (url) => {
      setLoadingImage(false)
      setImageUrl(url);
    });
  };

  useEffect(() => {
    if (isUpdate) {
      form.setFieldsValue({ avatar: [] });
      const {  country, avatar, ...otherData } = dataUser;
     
      form.setFieldsValue({
        ...otherData,
      });
      setImageUrl(avatar);
    }
  }, [form, dataUser]);



  return (
    <Card>
      {loadingUser ? (
        <Loading />
      ) : (
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
          autoComplete="off"
          // scrollToFirstError={{
          //   behavior: "smooth",
          //   block: "center",
          // }}
        >
          <Row gutter={20} justify="center">
            <Col span={24} md={10}>
              <Form.Item name="avatar" className="text-center">
                <Upload 
                  accept="image/png, image/gif, image/jpeg"
                  beforeUpload={false}
                  name="avatar"
                  listType="picture-circle"
                  className="avatar-uploader"
                  showUploadList={false}
                  onChange={handleChange}
                >
                  {imageUrl ? (
                    <img src={imageUrl} alt="image" style={{ width: "100%" }} />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </Form.Item>
              <Form.Item
                name="full_name"
                rules={[
                  {
                    required: true,
                    message: "الحقل مطلوب",
                  },
                ]}
              >
                <Input placeholder="الإسم باللغة العربية" />
              </Form.Item>
              <Form.Item
                name="full_name_ar"
                rules={[
                  {
                    required: true,
                    message: "الحقل مطلوب",
                  },
                ]}
              >
                <Input placeholder="الإسم باللغة الانجليزية" />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "الحقل مطلوب",
                  },
                  {
                    type: "email",
                    message: "ادخل بريد الكتروني صحيح",
                  },
                ]}
              >
                <Input placeholder="البريد الإلكتروني" />
              </Form.Item>
              <Form.Item
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "الحقل مطلوب",
                  },
                ]}
              >
                <Input placeholder="رقم الهاتف" />
              </Form.Item>
              <Form.Item
                name="role"
                rules={[
                  {
                    required: true,
                    message: "الحقل مطلوب",
                  },
                ]}
              >
                <Select placeholder="نوع المستخدم">
                  <Option value="ADMIN">ADMIN</Option>
                  <Option value="BENEFICIARY">BENEFICIARY</Option>
                  <Option value="ADVISER">ADVISER</Option>
                  <Option value="SUBADVISER">SUBADVISER</Option>
                  <Option value="MANAGEMENT">MANAGEMENT</Option>
                </Select>
              </Form.Item>
              {!id ? (
                <>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "الحقل مطلوب",
                      },
                      {
                        min: 8,
                        message: "يجب أن تكون كلمة المرور 8 أحرف على الأقل",
                      },
                    ]}
                  >
                    <Input.Password placeholder="كلمة المرور" />
                  </Form.Item>

                  <Form.Item
                    name="password_confirmation"
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "الحقل مطلوب",
                      },
                      {
                        min: 8,
                        message: "يجب أن تكون كلمة المرور 8 أحرف على الأقل",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("كلمة المرور غير متطابقة")
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password placeholder="تأكيد كلمة المرور" />
                  </Form.Item>
                </>
              ) : null}

              <Form.Item className="text-center">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loadingCreate || loadingUpdate}
                >
                   {id ? 'حفظ التعديلات' : 'إضافة '}
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
    </Card>
  );
};

export default ManagementUsersCreate;
