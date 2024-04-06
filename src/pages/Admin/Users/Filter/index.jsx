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
import {
  getCountries,
  getFields,
} from "../../../../store/Admin/actions/constants";
import { FaSearch } from "react-icons/fa";
import useAppParams from "../../../../hooks/useAppParams";
import { useLocation, useSearchParams } from "react-router-dom";
const { Panel } = Collapse;
const { Option } = Select;

const UsersFilter = (props) => {
  const [] = useSearchParams();

  const location = useLocation();

  const { handleSearch } = useAppParams();
  const dispatch = useDispatch();
  const { dataCountries, loading } = useSelector((state) => state.countries);
  const { dataFields, loading: fieldsLoading } = useSelector(
    (state) => state.fields
  );

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getFields());
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
        "role",
        "key",
        "gender",
        "phone",
        "email",
        "blocked",
        "dob",
        "identity",
        "country",
        "basicfieldid",
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
                <Col span={12} lg={6}>
                  <Form.Item name="key">
                    <Input placeholder="الاسم" />
                  </Form.Item>
                </Col>

                <Col span={12} lg={6}>
                  <Form.Item name="gender">
                    <Select placeholder="الجنس">
                      <Option value="MALE">MALE</Option>
                      <Option value="FEMALE">FEMALE</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={12} lg={6}>
                  <Form.Item name="phone">
                    <Input placeholder="رقم الهاتف" />
                  </Form.Item>
                </Col>
                <Col span={12} lg={6}>
                  <Form.Item name="email">
                    <Input placeholder="البريد الإلكتروني" />
                  </Form.Item>
                </Col>
                <Col span={12} lg={6}>
                  <Form.Item name="blocked">
                    <Select placeholder="الحالة">
                      <Option value="false">فعال</Option>
                      <Option value="true">غير فعال</Option>
                    </Select>
                  </Form.Item>
                </Col>

                {location?.pathname === "/admin/adviser/users" ? (
                  <Col span={12} lg={6}>
                    <Form.Item name="basicfieldid">
                      <Select
                        loading={fieldsLoading}
                        placeholder="مجالات العمل"
                      >
                        {dataFields?.data?.map((item, index) => (
                          <Option key={index} value={item.id}>
                            {item.name_ar}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                ) : null}

                <>
                  <Col span={12} lg={6}>
                    <Form.Item name="dop">
                      <DatePicker
                        placeholder="تاريخ الميلاد"
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12} lg={6}>
                    <Form.Item name="identity">
                      <Input placeholder="رقم الهوية" />
                    </Form.Item>
                  </Col>
                  <Col span={12} lg={6}>
                    <Form.Item name="country">
                      <Select placeholder="الدولة" loading={loading}>
                        {dataCountries?.data?.map((item, index) => (
                          <Option key={index} value={item.id}>
                            {item.name_ar}
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

export default UsersFilter;
