import { Button, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import { FaEye, FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { createFieldsSub, getFields } from "../../../../store/Admin/actions/constants";

const FieldsSub = (id) => {

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);
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
    values = {
      ...values,
      basicfieldid:Object.values(id).toString()
    }
    dispatch(
      createFieldsSub({
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
    <div className="group-btn">

      <button className="btn btn-add" onClick={showModal}>
        <span className="icon">
          <FaPlus />
        </span>{" "}
        أضف مجال فرعي
      </button>
    </div>
      <Modal
        title="أضف مجال فرعي"
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
            <Button block type="primary" htmlType="submit">
              حفظ
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default FieldsSub;
