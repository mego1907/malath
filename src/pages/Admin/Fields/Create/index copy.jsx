import { Button, Form, Input, Modal, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { FaImage, FaPlus, FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  createFields,
  updateFields,
  getFields,
  getSubFields,
} from "../../../../store/Admin/actions/constants";
import { useParams } from "react-router-dom";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const FieldsCreate = (value) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { loading } = useSelector((state) => state.createFields);
  const { dataSubFields, loading: loadingSubFields } = useSelector(
    (state) => state.subFields
  );

  const [imageUrl, setImageUrl] = useState(undefined);
  const [loadingImage, setLoadingImage] = useState(false);

  const showModal = () => {
    
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    if (id) {
      dispatch(getSubFields(id));
    }
  }, [dispatch, id]);

  const onFinish = (values) => {
    const formData = new FormData();
    Object.keys(values).forEach((element) => {
      if (values[element] === undefined || values[element] === null) {
        delete values[element];
      } else {
        formData.append(element, values[element]);
      }
    });
    if (id) {
      values = {
        ...values,
        id: value?.value?.id,
        basicfieldid: id,
      };
      if (value.subFields === "subFieldsEdit") {
        dispatch(
          updateFields({
            values,
            callback: () => {
              dispatch(getSubFields(value.parentId));
              setIsModalOpen(false);
              form.resetFields();
            },
          })
        );
      } else if (value.subFields === "subFieldsCreate") {
        dispatch(
          createFields({
            values,
            callback: () => {
              dispatch(getSubFields(value.parentId));
              setIsModalOpen(false);
              form.resetFields();
            },
          })
        );
      }
    } else {
      if (value.value) {
        values = {
          ...values,
          id: value.value.id,
        };
        dispatch(
          updateFields({
            values: formData,
            callback: () => {
              dispatch(getFields());
              setIsModalOpen(false);
              form.resetFields();
              setImageUrl();
            },
          })
        );
      } else {
        dispatch(
          createFields({
            values:formData,
            callback: () => {
              dispatch(getFields());
              setIsModalOpen(false);
              form.resetFields();
              setImageUrl();
            },
          })
        );
      }
    }
  };

  useEffect(() => {
    form.setFieldsValue(value.value);
    setImageUrl(value.value?.image);
    form.setFieldsValue({ image: [] });
  }, [value.value]);

  const uploadButton = (
    <div>
      {loadingImage ? <FaSpinner /> : <FaImage />}
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

  return (
    <>
      {value.value ? (
        <button className="btn btn-outline-info" onClick={showModal}>
          تعديل
        </button>
      ) : (
        <button className="btn btn-add" onClick={showModal}>
          <span className="icon">
            <FaPlus />
          </span>{" "}
          اضافة
        </button>
      )}

      <Modal
        title={value.value ? "تعديل المجال" : "أضف مجال جديد"}
        footer={false}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          size="large"
          onFinish={onFinish}
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          // initialValues={value?.value}
        >
          {/* <Form.Item
            label="الاسم باللغة العربية"
            name="name_ar"
            rules={[
              {
                required: true,
                message: "الحقل مطلوب!",
              },
            ]}
          >
            <Input />
          </Form.Item> */}
          <Form.Item name="image" className="product-image" label="الصورة">
            <Upload
              accept="image/png, image/gif, image/jpeg"
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
          <Form.Item
            label="العنوان باللغة العربية"
            name="name_ar"
            rules={[
              {
                required: true,
                message: "الحقل مطلوب!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="العنوان باللغة الانجليزية"
            name="name"
            rules={[
              {
                required: true,
                message: "الحقل مطلوب!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button loading={loading} block type="primary" htmlType="submit">
              حفظ
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default FieldsCreate;
