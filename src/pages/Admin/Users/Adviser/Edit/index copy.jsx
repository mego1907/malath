import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Upload,
} from "antd";
import dayjs from "dayjs";

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
  getFields,
} from "../../../../../store/Admin/actions/constants";

const { Option } = Select;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const AdviserUsersEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dataCountries, loading } = useSelector((state) => state.countries);
  const { dataFields, loading: fieldsLoading } = useSelector(
    (state) => state.fields
  );
  const {
    dataUser,
    loading: loadingUser,
  } = useSelector((state) => state.user);
  const { loading: loadingUpdate } = useSelector(
    (state) => state.userUpdate
  );
  const { loading: loadingCreate } = useSelector((state) => state.userCreate);

  const [city, setCity] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  const [form] = Form.useForm();

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getFields());
  }, [dispatch]);


  const onFieldsChange = (_changed, allFields) => {
    const image = allFields?.find(item => item.name[0] === "image")
    if (!image.value) {
      form.setFields([
        {
          name: "image",
          errors: ["الحقل مطلوب"],
        },
      ]);
    }
  };

  const onFinish = (values) => {
    values = {
      ...values,
      timezone: "+3",
      dob: new Date(values.dob.$d).toISOString().slice(0, 10),
    };
    console.log("Success:sss", values);
    dispatch(
      updateUser({
        values,
        callback: () => {
          form.resetFields();
          navigate(`/admin/adviser/users`);
        },
      })
    )
  };
  const handlecounty = (value) => {
    const getcountryId = value;
    const getStatedata = dataCountries?.data?.find(
      (item) => item.id === getcountryId
    );
    setCity(getStatedata);
  };

  useEffect(() => {
      dispatch(getOneUser(id));
  }, [dispatch]);

  useEffect(() => {
    form.setFieldsValue({...dataUser , dob:  dayjs(new Date(dataUser?.dob) )});
  }, [form, dataUser , id]);

  const uploadButton = (
    <div>
      {loading ? <FaSpinner /> : <FaRegImage />}
      <div
        style={{
          marginTop: 8,
        }}
      ></div>
    </div>
  );

  const handleChange = ({ file }) => {
    if (file && file?.originFileObj) {
      form.setFieldsValue({
        image: file.originFileObj,
      });
    }
    getBase64(file.originFileObj, (url) => {
      setImageUrl(url);
    });
  };

  return (
    <Card loading={loadingUser}>
      <Form
        size="large"
        initialValues={{...dataUser , dob:  dayjs(new Date(dataUser?.dob) )}}
        form={form}
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        onFinish={onFinish}
        onFieldsChange={onFieldsChange}
        autoComplete="off"
        scrollToFirstError={{
          behavior: "smooth",
          block: "center",
        }}
      >
        <Row gutter={20}>
          <Col span={24} md={24}>
            <Form.Item name="image" className="text-center">
              <Upload
                name="image"
                listType="picture-circle"
                className="avatar-uploader"
                showUploadList={false}
                onChange={handleChange}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="avatar"
                    style={{
                      width: "100%",
                    }}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Form.Item>
          </Col>
          <Col span={24} md={24}>
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
          </Col>
          <Col span={24} md={12}>
            <Form.Item
              name="full_name_ar"
              rules={[
                {
                  required: true,
                  message: "الحقل مطلوب",
                },
              ]}
            >
              <Input placeholder="الإسم باللغة العربية ( ثلاثي )" />
            </Form.Item>
          </Col>
          <Col span={24} md={12}>
            <Form.Item
              name="full_name"
              rules={[
                {
                  required: true,
                  message: "الحقل مطلوب",
                },
              ]}
            >
              <Input placeholder="الإسم باللغة الإنجليزية ( ثلاثي )" />
            </Form.Item>
          </Col>
          <Col span={24} md={12}>
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
          </Col>
          <Col span={24} md={12}>
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
          </Col>
          <Col span={24} md={12}>
            <Form.Item
              name="country"
              rules={[
                {
                  required: true,
                  message: "الحقل مطلوب",
                },
              ]}
            >
              <Select
                placeholder="الدولة"
                loading={loading}
                onChange={handlecounty}
              >
                {dataCountries?.data?.map((item, index) => (
                  <Option key={index} value={item.id}>
                    {item.name_ar}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24} md={12}>
            <Form.Item
              name="city"
              rules={[
                {
                  required: true,
                  message: "الحقل مطلوب",
                },
              ]}
            >
              <Select placeholder="المدينة" disabled={city.length === 0}>
                {city?.cities?.map((item, index) => (
                  <Option key={index} value={item.id}>
                    {item.name_ar}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24} md={12}>
            <Form.Item name="timezone">
              <Select placeholder="توقيتي حسب " disabled defaultValue={+3}>
                <Option value="+3">السعودية</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24} md={12}>
            <Form.Item
              name="gender"
              rules={[
                {
                  required: true,
                  message: "الحقل مطلوب",
                },
              ]}
            >
              <Select placeholder="الجنس">
                <Option value="MALE">MALE</Option>
                <Option value="FEMALE">FEMALE</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24} md={12}>
            <Form.Item
              name="dob"
              rules={[
                {
                  required: true,
                  message: "الحقل مطلوب",
                },
              ]}
            >
              <DatePicker
                placeholder="تاريخ الميلاد"
                style={{ width: "100%" }}
                onChange={onChange}
              />
            </Form.Item>
          </Col>
          <Col span={24} md={12}>
            <Form.Item
              name="identity"
              rules={[
                {
                  required: true,
                  message: "الحقل مطلوب",
                },
              ]}
            >
              <Input placeholder="رقم الهوية" />
            </Form.Item>
          </Col>
          <Col span={24} md={12}>
            <Form.Item
              name="qualification"
              rules={[
                {
                  required: true,
                  message: "الحقل مطلوب",
                },
              ]}
            >
              <Select placeholder="المؤهل العلمـــي">
                <Option value="phd">phd</Option>
                <Option value="master">master</Option>
                <Option value="deplom">deplom</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24} md={12}>
            <Form.Item
              name="failds"
              rules={[
                {
                  required: true,
                  message: "الحقل مطلوب",
                },
              ]}
            >
              <Select
                mode="multiple"
                loading={fieldsLoading}
                placeholder="مجالات العمل"
                options={dataFields?.data?.map((item) => {
                  const options = item?.subfields?.map((opt) => ({
                    label: opt.name,
                    value: opt.id,
                  }));

                  return {
                    label: item.name,
                    options,
                  };
                })}
              />
            </Form.Item>
          </Col>
          <Col span={24} md={12}>
            <Form.Item
              name="experience"
              rules={[
                {
                  required: true,
                  message: "الحقل مطلوب",
                },
              ]}
            >
              <Input placeholder="سنوات الخبرة" />
            </Form.Item>
          </Col>
          <Col span={24} md={12}>
            <Form.Item
              name="nos"
              rules={[
                {
                  required: true,
                  message: "الحقل مطلوب",
                },
              ]}
            >
              <Input placeholder="عدد الجلسات المتاحة أسبوعياً" />
            </Form.Item>
          </Col>
          <Col span={24} md={24}>
            <Form.Item
              name="about"
              rules={[
                {
                  required: true,
                  message: "الحقل مطلوب",
                },
              ]}
            >
              <Input placeholder="إنتاج فكري" />
            </Form.Item>
          </Col>
        </Row>
        <div className="text-center">
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loadingCreate || loadingUpdate}
            >
              إضافة مستشار
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Card>
  );
};

export default AdviserUsersEdit;
