import { Alert, Button, Card, Col, Form, Input, notification, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../style.module.scss";
import image from "../../../../assets/images/image.svg";
import {
  editBlog,
  getBlogSingle,
} from "../../../../store/Admin/actions/blog";
import Loading from "../../../../components/Admin/Loading/Loading";

const BlogEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    dataBlogSingle,
    loading: loadingBlogSingle,
    error: errorBlogSingle,
  } = useSelector((state) => state.blogSingle);
  const { loading, error } = useSelector((state) => state.blogEdit);
  const [picture, setPicture] = useState(dataBlogSingle?.header);
  const [imgData, setImgData] = useState(null);
  const [errorPicture, setErrorPicture] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getBlogSingle(id));
  }, [dispatch]);

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "تم تعديل المدونة بنجاح",
      duration: 2,
    });
  };

  const onFinish = (values) => {
    if (picture === null) {
      setErrorPicture(true);
    } else {
      values = {
        ...values,
        header: picture,
        type: "ESSAY",
        id: id,
      };
      dispatch(
        editBlog({
          values,
          callback: () => {
            openNotificationWithIcon("success");
            form.resetFields();
            navigate("/admin/blogs");
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

  return (
    <Card>
      <h3 className="mb-20">تعديل المقال</h3>
      {error ? <Alert className="mb-10" message={error} type="error" /> : null}
      {errorBlogSingle ? <Alert className="mb-10" message={errorBlogSingle} type="error" /> : null}
      {loadingBlogSingle ? (
        <Loading />
      ) : (
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
              initialValues={dataBlogSingle}
            >
              <Row gutter={20} justify="center">
                <Col span={24} md={16}>
                  <Form.Item className="text-center">
                    <div className={`mb-25 ${styles["blog-single"]}`}>
                      <label htmlFor="profilePic">
                        <input
                          id="profilePic"
                          name="header"
                          accept="/image/*"
                          type="file"
                          onChange={(e) => {
                            onChangePicture(e);
                          }}
                        />
                        <span
                          className={`mb-25 ${styles["blog-single-image"]}`}
                        >
                          <img
                            src={imgData ? imgData : dataBlogSingle?.header}
                            alt="image"
                          />
                        </span>
                      </label>
                      {errorPicture ? (
                        <span className="ant-form-item-explain-error text-start">
                          الحقل مطلوب
                        </span>
                      ) : null}
                    </div>
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
                    <Input placeholder="عنوان المقال" />
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
                    <Input.TextArea rows={10} placeholder="نص المقال" />
                  </Form.Item>
                </Col>
              </Row>
              <div className="text-center">
                <Form.Item>
                  <Button loading={loading} type="primary" htmlType="submit">
                    حفظ التعديلات
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </Col>
        </Row>
      )}
    </Card>
  );
};

export default BlogEdit;
