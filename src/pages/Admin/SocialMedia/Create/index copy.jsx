import { Alert, Button, Card, Col, Form, Input, notification, Row } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";
import user from "../../../../assets/images/user.png";
import { SocialMediaPost } from "../../../../store/Admin/actions/socialMedia";

const SocialMediaCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [imgData, setImgData] = useState(null);
  const [errorPicture, setErrorPicture] = useState(false);

  const { loading, error } = useSelector((state) => state.SocialMediaStore);

  const [picture, setPicture] = useState();

  const [form] = Form.useForm();

  const onFinish = (values) => {
    // console.log(id);
    if (picture === null) {
      setErrorPicture(true);
    } else {
      values = {
        ...values,
        image: picture,
      };
      dispatch(
        SocialMediaPost({
          values,
          callback: () => {
            form.resetFields();
            navigate("/admin/social-media");
          },
        })
      );
    }
  };

  const onChangePicture = (e) => {
    if (e.target.files[0]) {
      setPicture(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  // useEffect(() => form.resetFields(), [dataSocialMedia]);

  return (
    <Row justify="center">
      <Col span={24} lg={10}>
        <Card>
          {error ? (
            <Alert className="mb-10" message={error} type="error" />
          ) : null}
          <Row justify="center">
            <Col span={24} lg={20}>
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
              >
                <Row gutter={20} justify="center">
                  <Col span={24} md={16}>
                    <Form.Item className="text-center">
                      <div className="form-image">
                        <label htmlFor="profilePic" className="uploadImage">
                          <input
                            id="profilePic"
                            name="license_file"
                            accept="/image/*"
                            type="file"
                            onChange={(e) => {
                              onChangePicture(e);
                            }}
                          />
                          <span className="form-label">
                            <FaCloudUploadAlt />{" "}
                          </span>
                        </label>
                        <div className="py-2">
                          <img
                            className="imgData"
                            src={imgData ? imgData : user}
                            alt="avatar"
                          />
                        </div>
                      </div>
                      {errorPicture ? (
                        <div className="text-danger">الحقل مطلوب</div>
                      ) : null}
                    </Form.Item>
                  </Col>
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
                      <Input placeholder="المسمى " />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      name="url"
                      rules={[
                        {
                          required: true,
                          message: "الحقل مطلوب",
                        },
                      ]}
                    >
                      <Input placeholder="الرابط" />
                    </Form.Item>
                  </Col>
                </Row>
                <div className="text-center">
                  <Form.Item>
                    <Button loading={loading} type="primary" htmlType="submit">
                      إضافة
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default SocialMediaCreate;
