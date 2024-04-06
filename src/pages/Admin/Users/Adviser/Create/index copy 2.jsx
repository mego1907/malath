import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
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
import Loading from "../../../../../components/Admin/Loading/Loading";

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
  const [form] = Form.useForm();

  const { dataCountries, loading } = useSelector((state) => state.countries);
  const { dataFields, loading: fieldsLoading } = useSelector(
    (state) => state.fields
  );
  const [isUpdate, setIsUpdate] = useState(false);
  const [idsMap, setIdsMap] = useState(new Map());

  const { dataUser, loading: loadingUser } = useSelector((state) => state.user);
  const { loading: loadingUpdate } = useSelector((state) => state.userUpdate);
  const { loading: loadingCreate } = useSelector((state) => state.userCreate);

  const [cityies, setCity] = useState();
  const [subFields, setSubFields] = useState([]);
  const [imageUrl, setImageUrl] = useState(undefined);
  const [loadingImage, setLoadingImage] = useState(false);
  const [stateValue, setStateValue] = useState();
  const [sss, setSss] = useState([]);

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getFields());
    if (id) {
      setIsUpdate(true);
      dispatch(getOneUser(id));
    }
  }, [dispatch]);

  useEffect(() => {
    if (dataFields) {
      let idMap = new Map();
      dataFields?.data?.map((item) =>
        item?.subfields?.forEach((opt) => {
          idMap.set(opt.id, item.id);
        })
      );
      setIdsMap(idMap);
    }
  }, [dataFields]);

  const onFinish = (values) => {
    let reqObj = {};
    values.fields.forEach((value) => {
      const valueParent = idsMap.get(value);
      if (!reqObj[valueParent]) {
        reqObj[valueParent] = [value];
      } else {
        reqObj[valueParent].push(value);
      }
    });
    values = {
      ...values,
      timezone: "+3",
      id: id,
      // city: CityId,
      role: "ADVISER",
      fields: JSON.stringify(reqObj),
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
              navigate(`/admin/adviser/users`);
            },
          })
        );
      } else {
        dispatch(
          createUser({
            values: formData,
            callback: () => {
              form.resetFields();
              navigate(`/admin/adviser/users`);
            },
          })
        );
      }
    }
  };

  const handlecounty = (value) => {
    const getcountryId = value;
    const getStatedata = dataCountries?.data?.find(
      (item) => item.id === getcountryId
    );
    setCity(getStatedata);
  };

  // const handleField = (value) => {
  //   console.log(dataFields?.data)
  //   const getfieldsId = value.toString();
  //   console.log("🚀 ~ file: index.jsx:151 ~ handleField ~ getfieldsId:", getfieldsId)
  //   const getfieldsdata = dataFields?.data?.find(
  //     (item) => item.id === Number(getfieldsId)
  //   );
  //   console.log(getfieldsdata)
  //   setFields(getfieldsdata);
  // };

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
    setLoadingImage(true);
    if (file && file?.originFileObj) {
      form.setFieldsValue({
        avatar: file.originFileObj,
      });
    }
    getBase64(file.originFileObj, (url) => {
      setLoadingImage(false);
      setImageUrl(url);
    });
  };

  useEffect(() => {
    if (isUpdate) {
      const subfieldIds = [];
      dataUser?.fields?.forEach((obj) => {
        obj.subfields.forEach((subfield) => {
          subfieldIds.push(subfield.id);
        });
      });
      form.setFieldsValue({ avatar: [] });

      const { fields, country, avatar, ...otherData } = dataUser;
      const getCountry = dataCountries?.data?.find(
        (item) => item.id === Number(dataUser?.country)
      );
      const getCities = getCountry?.cities?.find(
        (item) => item.id === Number(dataUser?.city)
      );
      setCity(getCountry);
      form.setFieldsValue({
        ...otherData,
        dob: dayjs(new Date(dataUser?.dob)),
        country: Number(dataUser?.country),
        city: Number(getCities?.id),
        fields: subfieldIds,
      });
      setImageUrl(avatar);
    }
  }, [form, dataUser]);

  const select = (values) => {
    setStateValue(values);
    const getfieldsId = values.slice(-1).toString();
    const getfieldsdata = dataFields?.data?.find(
      (item) => item.id === Number(getfieldsId)
    );
    setSubFields((prevState) => [...prevState, getfieldsdata]);
  };

  useEffect(() => {
    if (subFields.some((element) => element === undefined)) {
      setSubFields([]);
    } else if (subFields?.find((item) => item?.id != Number(stateValue))) {
      const index = subFields.findIndex(
        (obj) => obj?.id === Number(stateValue)
      );
      if (index !== -1) {
        setSubFields(subFields.splice(index, 1));
      }
    }
  }, [subFields]);


  const selectSub = (values, option) => {
    setSss((prevState) => [...prevState, values]);
    let reqObj = {};
    sss.forEach((value) => {
      const valueParent = idsMap.get(value);
      if (!reqObj[valueParent]) {
        reqObj[valueParent] = [value];
      } else {
        // reqObj((prevState) => [...prevState, value]);
        reqObj[valueParent].push(value);
      }
    });
  };

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
          scrollToFirstError={{
            behavior: "smooth",
            block: "center",
          }}
        >
          <Row gutter={20}>
            <Col span={24} md={24}>
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
                <Input placeholder="الإسم باللغة العربية" />
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
                <Input placeholder="الإسم باللغة الإنجليزية" />
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
                  showSearch
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  placeholder="الدولة"
                  loading={loading}
                  onChange={handlecounty}
                >
                  {dataCountries?.data?.map((item, index) => (
                    <Option value={item.id}>{item.name_ar}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={24} md={12}>
              <Form.Item name="timezone">
                <Select
                  placeholder="توقيتي حسب"
                  disabled
                  defaultValue="السعودية"
                >
                  <Option value="السعودية">السعودية</Option>
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
                name="fields"
                rules={[
                  {
                    required: true,
                    message: "الحقل مطلوب",
                  },
                ]}
              >
                <Select
                  onChange={select}
                  mode="multiple"
                  loading={fieldsLoading}
                  placeholder="مجالات العمل"
                >
                  {dataFields?.data?.map((item) => (
                    <Option value={item?.id}>{item?.name_ar}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            {subFields?.map((item) => (
              <Col span={24} md={12}>
                <Form.Item
                  // name="fields"
                  rules={[
                    {
                      required: true,
                      message: "الحقل مطلوب",
                    },
                  ]}
                >
                  <Select
                    onChange={selectSub}
                    mode="multiple" allowClear
                    placeholder={item?.name_ar}
                  >
                    {item?.subfields?.map((item) => (
                      <Option value={item?.id}>{item?.name_ar}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            ))}

            <Col span={24} md={12}>
              <Form.Item
                name="city"
                // rules={[
                //   {
                //     required: true,
                //     message: "الحقل مطلوب",
                //   },
                // ]}
              >
                <Select placeholder="المدينة" disabled={cityies?.length === 0}>
                  {subFields?.subfields?.map((item, index) => (
                    <Option key={index} value={item.id}>
                      {item.name_ar}
                    </Option>
                  ))}
                </Select>
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
            <Col span={24} md={12}>
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
                {id ? "حفظ التعديلات" : "إضافة مستشار"}
              </Button>
            </Form.Item>
          </div>
        </Form>
      )}
    </Card>
  );
};

export default AdviserUsersEdit;
