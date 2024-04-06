import React from 'react'
import { Alert, Button, Col, Form, Image, Input, notification, Row } from 'antd'
import imageLogin from '../../../assets/images/image-login.png'
import { FaAt } from "react-icons/fa";
import { MdLock  } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { login } from '../../../store/Admin/actions/login';
const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.logedIn);

  const openNotificationWithIcon = type => {
    notification[type]({
      message: 'تم تسجيل دخولك بنجاح',
      duration: 2
    })
  }

  const onFinish = (values) => {
    dispatch(
      login({
        values,
        callback: () => {
          // window.location.reload()
          // navigate('/admin/blog')
          openNotificationWithIcon('success')
        },
      })
    );
  };

  
  if (JSON.parse(localStorage.getItem("user"))) {
    return <Navigate to="/admin/dashboard" />;
  }

  return (
    <div className='pt-60 mt-60 pb-50'>
      <div className='container pt-lg-60 mt-lg-60 pb-50'>
        <Row gutter={20} align="middle">
          <Col span={24} lg={12}>
            {error ? <Alert message={error} className="mb-15" type="error" /> : null}
            <Form size='large'
              labelCol={{
                span: 24,
              }}
              wrapperCol={{
                span: 24,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              autoComplete="off"
            >
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
                ]}
              >
                <Input prefix={<FaAt />} placeholder='البريد الإلكتروني' />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'الحقل مطلوب',
                  },
                ]}
              >
                <Input.Password prefix={<MdLock />} placeholder='كلمة المرور' />
              </Form.Item>

              {/* <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item> */}

              <Form.Item>
                <Button loading={loading} block type="primary" htmlType="submit">
                تسجيل الدخول
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col span={24} lg={12}>
            <Image src={imageLogin} preview={false} />
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Login