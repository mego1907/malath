import React from "react";
import {
  Button,
  Col,
  Collapse,
  Form,
  Input,
  Row,
} from "antd";
import { FaSearch } from "react-icons/fa";
import useAppParams from "../../../../hooks/useAppParams";
import { useSearchParams } from "react-router-dom";
const { Panel } = Collapse;
const WalletFilter = () => {
  const [] = useSearchParams();

  const { handleSearch } = useAppParams();

  const onFinish = (values) => {
    handleSearch({
      fields: JSON.parse(JSON.stringify(values)),
      deletedFields:["page"]
    });
  };

  const resetFilter = () => {
    handleSearch({
      deletedFields: ["key"],
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
          size="large"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          onFinish={onFinish}
        >
          <Row gutter={20}>
            <Col span={12} lg={8}>
              <Form.Item name="key">
                <Input placeholder="الاسم" />
              </Form.Item>
            </Col>
            <Col span={24} lg={4}>
              <Form.Item>
                <Button type="primary" block htmlType="submit">
                  بحث
                </Button>
              </Form.Item>
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
            </Col>
          </Row>
        </Form>
      </Panel>
    </Collapse>
  );
};

export default WalletFilter;
