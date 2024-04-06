import { Button, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  createFields,
  getFields,
} from "../../../../store/Admin/actions/constants";

const FieldsCreate = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { loading } = useSelector(
    (state) => state.createFields
    );
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = (values) => {
    dispatch(
      createFields({
        values,
        callback: () => {
          dispatch(getFields());
          setIsModalOpen(false);
          form.resetFields();
        },
      })
    );
  };
  return (
    <>
      <button className="btn btn-add" onClick={showModal}>
        <span className="icon">
          <FaPlus />
        </span>{" "}
        اضافة
      </button>
      <Modal
        title="أضف مجال جديد"
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
        >
          <Form.Item
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
          </Form.Item>
          <Form.Item
            label="الاسم باللغة الانجليزية"
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
