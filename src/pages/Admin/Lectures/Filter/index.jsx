import React, { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import useAppParams from "../../../../hooks/useAppParams";
import { useSearchParams } from "react-router-dom";
import { getAdvisersList } from "../../../../store/Admin/actions/lectures";
const { Panel } = Collapse;
const { Option } = Select;

const LecturesFilter = (props) => {
  const [] = useSearchParams();

  const { handleSearch } = useAppParams();
  const dispatch = useDispatch();
  const { dataAdvisers, loading } = useSelector((state) => state.advisers);

  useEffect(() => {
    dispatch(getAdvisersList());
  }, [dispatch]);

  const onFinish = (values) => {
    handleSearch({
      fields: JSON.parse(JSON.stringify(values)),
      deletedFields: ["page"],
    });
  };

  const resetFilter = () => {
    handleSearch({
      deletedFields: [
        "description",
        "title",
        "adviser",
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
                    <Form.Item name="description">
                      <Input placeholder="الوصف" />
                    </Form.Item>
                  </Col>
                  <Col span={12} lg={6}>
                    <Form.Item name="title">
                      <Input placeholder="العنوان" />
                    </Form.Item>
                  </Col>
                  <Col span={12} lg={6}>
                    <Form.Item name="adviser">
                      <Select placeholder="المستشار" loading={loading}>
                        {dataAdvisers?.map((item, index) => (
                          <Option key={index} value={item.id}>
                            {item.full_name_ar}
                          </Option>
                        ))}
                      </Select>
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

export default LecturesFilter;
