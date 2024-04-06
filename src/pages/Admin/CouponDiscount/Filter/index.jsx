import React, { useEffect } from "react";
import {
  Button,
  Col,
  Collapse,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
} from "antd";
import { useDispatch } from "react-redux";
import { FaSearch } from "react-icons/fa";
import useAppParams from "../../../../hooks/useAppParams";
import { useSearchParams } from "react-router-dom";
const { Panel } = Collapse;

const CouponsFilter = (props) => {
  const [] = useSearchParams();

  const { handleSearch } = useAppParams();
  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch]);

  const onFinish = (values) => {
    handleSearch({
      fields: JSON.parse(JSON.stringify(values)),
      deletedFields: ["page"],
    });
  };

  const resetFilter = () => {
    handleSearch({
      deletedFields: [
        "title",
        "discount_percentage",
        "start_date",
        "end_date",
      ],
    });
  };

  return (
    <Collapse className="header-search">
      <Panel
        header={
          <div className="d-flex align-items-center">
            {" "}
            <FaSearch className="ml-5" /> إبحث هنــــا
          </div>
        }
        key="1"
      >
        <Form
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          onFinish={onFinish}
        >
          <Row gutter={20}>
            <Col span={24} lg={20}>
              <Row gutter={20}>
                <>
                  <Col span={12} lg={6}>
                    <Form.Item name="start_date">
                      <DatePicker
                        placeholder="تاريخ بداية الصلاحية"
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12} lg={6}>
                    <Form.Item name="end_date">
                      <DatePicker
                        placeholder="تاريخ نهاية الصلاحية"
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12} lg={6}>
                    <Form.Item name="title">
                      <Input placeholder="العنوان" />
                    </Form.Item>
                  </Col>
                  <Col span={12} lg={6}>
                    <Form.Item name="discount_percentage">
                      <InputNumber placeholder="نسبة الخصم" style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>
                </>
              </Row>
            </Col>
            <Col span={24} lg={4}>
              <Form.Item>
                <Button
                  type="primary"
                  block
                  danger
                  htmlType="reset"
                  onClick={() => resetFilter()}
                >
                  تفريغ
                </Button>
              </Form.Item>
              <Form.Item>
                <Button type="primary" block htmlType="submit">
                  بحث
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Panel>
    </Collapse>
  );
};

export default CouponsFilter;
