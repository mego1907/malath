import { Alert, Button, Card, Col, Form, Input, notification, Row, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FaCloudUploadAlt, FaSpinner } from "react-icons/fa";
import user from "../../../../assets/images/user.png";
import {
  SocialMediaUpdate,
  getOneSocialMedia,
} from "../../../../store/Admin/actions/socialMedia";


const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const SocialMediaEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();


  
  const [imgData, setImgData] = useState(null);
  const [errorPicture, setErrorPicture] = useState(false);
  const { loading, error } = useSelector((state) => state.SocialMediaStore);
  const {dataSocialMediaSingle, loading: loadingSocialMedia, error: errorSocialMedia} = useSelector((state) => state.oneSocialMedia);
  
  const [imageUrl, setImageUrl] = useState(undefined);
  const [loadingImage, setLoadingImage] = useState(false);
  const [form] = Form.useForm();
  const [isUpdate, setIsUpdate] = useState(false);


  useEffect(() => {
    setIsUpdate(true);
    dispatch(getOneSocialMedia(id));
  }, [id , dispatch])
  
  


  const onFinish = (values) => {
    if (dataSocialMediaSingle?.data?.image === null) {
      setErrorPicture(true);
    } else {
     values = {
        ...values,
        id: id,
        image: imageUrl,
      };
      const formData = new FormData();
      Object.keys(values).forEach((element) =>
        formData.append(element, values[element])
      );
      dispatch(
        SocialMediaUpdate({
          values,
          callback: () => {
            form.resetFields();
            navigate("/admin/social-media");
          },
        })
      );
    }
  };

  const uploadButton = (
    <div>
      {loadingImage ? <FaSpinner /> : '<BsCardImage />'}
      <div
        style={{
          marginTop: 8,
        }}
      ></div>
    </div>
  );


  const handleChange = ({ file }) => {
    if (file && file?.originFileObj) {
      // form.resetFields();
      form.setFieldsValue({
        image: file.originFileObj,
      });
    }
    setLoadingImage(true);
    getBase64(file.originFileObj, (url) => {
      setImageUrl(url);
      setLoadingImage(false);
    });
  };
 


  useEffect(() => {
    if (isUpdate) {
      const {  image,  ...otherData } = dataSocialMediaSingle?.data
      form.setFieldsValue({
        ...otherData,
      });
      setImageUrl(image);
    }
  }, [form, dataSocialMediaSingle?.data]);

  return (
    <Row justify="center">
      <Col span={24} lg={10}>
        <Card loading={loadingSocialMedia}>
          {error ? (
            <Alert className="mb-10" message={error} type="error" />
          ) : null}
          <Row justify="center">
            <Col span={24} lg={20}>
              <Form 
                // initialValues={dataSocialMediaSingle?.data}
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
                scrollToFirstError={{
                  behavior: "smooth",
                  block: "center",
                }}
              >
                <Row gutter={20} justify="center">
                  <Col span={24} md={16}>
                  <Form.Item name="image" className="text-center">
                      <Upload
                      accept="image/png, image/gif, image/jpeg"
                      beforeUpload={false}
                        maxCount={1}
                        name="image"
                        listType="picture-card"
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
                      تعديل
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

export default SocialMediaEdit;
