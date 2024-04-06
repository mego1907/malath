import React, { useEffect, useState } from 'react'
import { Button, Card, Col, DatePicker, Form, Input, notification, Row, Select } from 'antd';
import { FaCloudUploadAlt } from 'react-icons/fa';
import user from '../../../../../assets/images/user.png'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createUser , getOneUser, updateUser } from '../../../../../store/Admin/actions/users';
import { getCountries, getFields } from '../../../../../store/Admin/actions/constants';
const { Option } = Select;

const BeneficiaryUsersCreate = () => {
  const {id} = useParams()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {type} = useParams()
  const {dataCountries, loading} = useSelector((state) => state.countries);
  const {dataFields, loading:fieldsLoading} = useSelector((state) => state.fields);
  const { dataUser, loading:loadingUser, error:errorUser } = useSelector((state) => state.user);
  const { loading:loadingUpdate, error:errorUpdate } = useSelector((state) => state.userUpdate);

  const[countryid, setCountryid]=useState('');
  const[city, setCity]=useState([]);

  const [picture, setPicture] = useState();
  const [imgData, setImgData] = useState(null);
  const [form] = Form.useForm();

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const openNotificationWithIcon = type => {
    notification[type]({
      message: 'تم اضافة مستخدم بنجاح',
      duration: 2
    })
  }

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getFields());
  }, [dispatch])

  useEffect(() => {
  }, [city , countryid , dataFields])
  
  
  const onFinish = (values) => {
    if(id){
      values = {
        ...values,
        avatar : picture,
        timezone:"+3",
        dob: new Date(values.dob.$d).toISOString().slice(0, 10),
      }
      console.log('Success:sss', values);
      dispatch(
        updateUser
        ({
          values, 
          callback: () => {
            openNotificationWithIcon("success");
            form.resetFields();
            navigate(`/admin/${type}/users`);
          },
        })
      );
    }else{
      values = {
        ...values,
        avatar : picture,
        timezone:"+3",
        dob: new Date(values.dob.$d).toISOString().slice(0, 10),
      }
      console.log('Success:', values);
      dispatch(
        createUser
        ({
          values, 
          callback: () => {
            openNotificationWithIcon("success");
            form.resetFields();
            navigate(`/admin/${type}/users`);
          },
        })
      );
    }
  };

  const onChangePicture = e => {
    if (e.target.files[0]) {
      setPicture(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  
  const handlecounty = (value) => {
    const getcountryId= value;
    const getStatedata= dataCountries?.data?.find(item=>item.id===getcountryId);      
    setCity(getStatedata);
    setCountryid(getcountryId);
  };

 
  useEffect(() => {
    if(id){
      dispatch(getOneUser(id))
    }
    }, [dispatch])
    
    


  return (
    <Card>
      <Form size='large'
        labelCol={{
          span:24,
        }}
        wrapperCol={{
          span: 24,
        }}
        onFinish={onFinish}
        fields={[
          {
            name: ["role"],
            value: dataUser?.role,
          },
          {
            name: ["full_name_ar"],
            value: dataUser?.full_name_ar,
          },
          {
            name: ["full_name_ar"],
            value: dataUser?.full_name_ar,
          },
          {
            name: ["full_name"],
            value: dataUser?.full_name_ar,
          },
          {
            name: ["email"],
            value: dataUser?.email,
          },
          {
            name: ["phone"],
            value: dataUser?.phone,
          },
          {
            name: ["country"],
            value: dataUser?.country,
          },
          {
            name: ["phone"],
            value: dataUser?.phone,
          },
        ]}
      >

        <Row gutter={20}>
          <Col span={24} md={24}>
            <Form.Item className='text-center'>
              <div className='form-image'>

              <label htmlFor="profilePic" className="uploadImage">
                <input id="profilePic" name="license_file" accept="/image/*" type="file" onChange={(e) => {
                  onChangePicture(e);
                }} />
                <span className="form-label"><FaCloudUploadAlt/> </span>
              </label>
              <div className="py-2">
                <img className="imgData" src={imgData ? imgData : user} alt="avatar" />
              </div>
                </div>
            </Form.Item>
          </Col>
          <Col span={24} md={24}>
            <Form.Item
              name="role"
              rules={[
                {
                  required: true,
                  message: 'الحقل مطلوب',
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
                  message: 'الحقل مطلوب',
                },
              ]}
            >
              <Input placeholder='الإسم باللغة العربية ( ثلاثي )' />
            </Form.Item>
          </Col>
          <Col span={24} md={12}>
            <Form.Item
              name="full_name"
              rules={[
                {
                  required: true,
                  message: 'الحقل مطلوب',
                },
              ]}>
              <Input placeholder='الإسم باللغة الإنجليزية ( ثلاثي )' />
            </Form.Item>
          </Col>
          <Col span={24} md={12}>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: 'الحقل مطلوب',
                },
                {
                  type: 'email',
                  message: 'ادخل بريد الكتروني صحيح',
                },
              ]}>
              <Input placeholder='البريد الإلكتروني' />
            </Form.Item>
          </Col>
          <Col span={24} md={12}>
            <Form.Item
              name="phone"
              rules={[
                {
                  required: true,
                  message: 'الحقل مطلوب',
                },
              ]}>
              <Input placeholder='رقم الهاتف' />
            </Form.Item>
          </Col>
          <Col span={24} md={12}>
            <Form.Item
              name="country"
              rules={[
                {
                  required: true,
                  message: 'الحقل مطلوب',
                },
              ]}>
                <Select placeholder="الدولة" loading={loading} onChange={handlecounty}>
                {dataCountries?.data?.map((item, index) => (
                  <Option key={index} value={item.id}>{item.name_ar}</Option>
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
                  message: 'الحقل مطلوب',
                },
              ]}>
              <Select placeholder="المدينة" disabled={city.length === 0}>
                {city?.cities?.map((item, index) => (
                  <Option key={index} value={item.id}>{item.name_ar}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24} md={12}>
            <Form.Item
              name="timezone">
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
                  message: 'الحقل مطلوب',
                },
              ]}>
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
                  message: 'الحقل مطلوب',
                },
              ]}>
              <DatePicker placeholder='تاريخ الميلاد' style={{width:"100%"}} onChange={onChange} />
            </Form.Item>
          </Col>
          <Col span={24} md={12}>
            <Form.Item
              name="identity"
              rules={[
                {
                  required: true,
                  message: 'الحقل مطلوب',
                },
              ]}>
              <Input placeholder='رقم الهوية' />
            </Form.Item>
          </Col>
          <Col span={24} md={12}>
            <Form.Item
              name="qualification"
              rules={[
                {
                  required: true,
                  message: 'الحقل مطلوب',
                },
              ]}>
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
                  message: 'الحقل مطلوب',
                },
              ]}>
              <Select mode="multiple"
                loading={fieldsLoading}  placeholder="مجالات العمل"
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
                  message: 'الحقل مطلوب',
                },
              ]}>
              <Input placeholder='سنوات الخبرة' />
            </Form.Item>
          </Col>
          <Col span={24} md={12}>
            <Form.Item
              name="nos"
              rules={[
                {
                  required: true,
                  message: 'الحقل مطلوب',
                },
              ]}>
              <Input placeholder='عدد الجلسات المتاحة أسبوعياً' />
            </Form.Item>
          </Col>
          <Col span={24} md={24}>
            <Form.Item
              name="about"
              rules={[
                {
                  required: true,
                  message: 'الحقل مطلوب',
                },
              ]}>
              <Input placeholder='إنتاج فكري' />
            </Form.Item>
          </Col>
        </Row>
        <div className="text-center">
          <Form.Item>
            <Button type="primary" htmlType="submit">
            إضافة مستشار
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Card>
  )
}

export default BeneficiaryUsersCreate