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
import { requestMessageList } from "../../../../socketConnection";
const { Panel } = Collapse;

const MessageFilter = (props) => {



  const onFinish = (values) => {
    if(props?.typeMessage === "assistant-counselor"){
      requestMessageList({
        key: values.key,
        type : 2
      })
    }else if(props?.typeMessage === "messages"){

      requestMessageList({
        key: values.key,
        type : 1
      })
    }
  };

  const resetFilter = () => {
    if(props?.typeMessage === "assistant-counselor"){
      requestMessageList({
        key: '',
        type : 2
      })
    }else if(props?.typeMessage === "messages"){

      requestMessageList({
        key: '',
        type : 1
      })
    }
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

export default MessageFilter;
