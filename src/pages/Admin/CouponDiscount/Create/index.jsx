import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  DatePicker,
} from "antd";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  createCoupon,
  discountCoupon,
  updateCoupon,
} from "../../../../store/Admin/actions/discountCoupon";
import Loading from "../../../../components/Admin/Loading/Loading";
import dayjs from "dayjs";

const DiscountCouponCreate = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isUpdate, setIsUpdate] = useState(false);
  const { dataCoupon, loading: loadingCoupon } = useSelector((state) => state.coupon);
  const { loading: loadingUpdate } = useSelector((state) => state.couponUpdate);
  const { loading: loadingCreate } = useSelector((state) => state.couponCreate);

  useEffect(() => {
      if (id) {
        setIsUpdate(true);
        dispatch(discountCoupon(id));
      }
  }, [dispatch]);

  const onFinish = (values) => {
    if (id) {
      dispatch(
        updateCoupon({
          id: id,
          values,
          callback: () => {
            dispatch(discountCoupon(id));
            navigate(`/admin/coupons/${id}/edit`);
          },
        })
      );
    } else {
      dispatch(
        createCoupon({
          ...values,
          callback: () => {
            form.resetFields();
            navigate(`/admin/coupons`);
          },
        })
      );
    }
  };
  
  useEffect(() => {
    if (isUpdate) {
      dataCoupon.start_date = dayjs(new Date(dataCoupon.start_date));
      dataCoupon.end_date = dayjs(new Date(dataCoupon.end_date));
      form.setFieldsValue(dataCoupon);
    }
  }, [form, dataCoupon]);

  return (
    <Card>
      {loadingCoupon ? (
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
          // scrollToFirstError={{
          //   behavior: "smooth",
          //   block: "center",
          // }}
        >
          <Row gutter={20} justify="center">
            <Col span={24} md={10}>
              <Form.Item
                name="title"
                rules={[
                  { required: false },
                ]}
              >
                <Input placeholder="العنوان" />
              </Form.Item>
              <Form.Item
                name="discount_code"
                rules={[
                  { required: true },
                ]}
              >
                <Input placeholder="كود الخصم" />
              </Form.Item>
              <Form.Item
                name="discount_percentage"
                rules={[
                  { required: true },
                ]}
              >
                <InputNumber placeholder="نسبة الخصم" style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item
                name="start_date"
              >
                <DatePicker
                  placeholder="تاريخ بداية الصلاحية"
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item
                name="end_date"
              >
                <DatePicker
                  placeholder="تاريخ نهاية الصلاحية"
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item className="text-center">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loadingCreate || loadingUpdate}
                >
                   {id ? 'حفظ التعديلات' : 'إضافة '}
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
    </Card>
  );
};

export default DiscountCouponCreate;
