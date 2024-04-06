import React, {  useState } from "react";
import {
  Button,
  Col,
  Collapse,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
} from "antd";
import { FaSearch } from "react-icons/fa";
import useAppParams from "../../../../hooks/useAppParams";
import { useSearchParams } from "react-router-dom";
const { Panel } = Collapse;
const { Option } = Select;
const { RangePicker } = DatePicker;
const SessionsFilter = () => {
  const [] = useSearchParams();

  const { handleSearch } = useAppParams();

  const [state , setState] = useState([])

  const onChange = (date, dateString) => {
    setState([dateString[0] , dateString[1]])
  };
  const onFinish = (values) => {
    values = {
      ...values,
      from: state[0],
      to: state[1],
      date:null
    }
    handleSearch({
      fields: JSON.parse(JSON.stringify(values)),
      deletedFields:["page"]
    });
  };

  const resetFilter = () => {
    handleSearch({
      deletedFields: ["key", "type" , "date" , "from" , "to" , "page"],
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
            <Col span={12} lg={8}>
              <Form.Item name="type">
                <Select placeholder="حالة الحجز">
                  <Option value="0"> حجز قادم</Option>
                  <Option value="1">حجز سابق</Option>
                  <Option value="2">حجز ملغي</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12} lg={8}>
              <Form.Item name="date">
                <RangePicker onChange={onChange} placeholder={["من تاريخ", "الى تاريخ"]}  />
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

export default SessionsFilter;
