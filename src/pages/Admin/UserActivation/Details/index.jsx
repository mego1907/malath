import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Loading from "../../../../components/Admin/Loading/Loading";

import { Card, Col, Form, Image, Input, Row } from "antd";
import { getOneActivation } from "../../../../store/Admin/actions/userActivation";

const ActivationDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { dataActivation, loading } = useSelector(
    (state) => state.getOneUserActivation
  );
  console.log(
    "🚀 ~ file: index.jsx:19 ~ AdviserUsersEdit ~ dataActivation:",
    dataActivation
  );

  useEffect(() => {
    if (id) {
      dispatch(getOneActivation(id));
    }
  }, [dispatch]);

  return (
    <Card className="users-details">
      {loading ? (
        <Loading />
      ) : (
        <Form
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
        >
          <Row gutter={20}>
            <Col span={24} md={24}>
              <Form.Item className="avatar-uploader text-center">
                <Image
                  preview={false}
                  src={dataActivation?.avatar}
                  width={100}
                  height={100}
                />
              </Form.Item>
            </Col>
            <Col span={24} md={12}>
              <Form.Item label="الإسم باللغة العربية">
                <Input value={dataActivation?.full_name_ar} disabled />
              </Form.Item>
            </Col>
            <Col span={24} md={12}>
              <Form.Item label="الإسم باللغة الإنجليزية">
                <Input value={dataActivation?.full_name} disabled />
              </Form.Item>
            </Col>
            <Col span={24} md={12}>
              <Form.Item label="البريد الإلكتروني">
                <Input value={dataActivation?.email} disabled />
              </Form.Item>
            </Col>
            <Col span={24} md={12}>
              <Form.Item label="رقم الهاتف">
                <Input value={dataActivation?.phone} disabled />
              </Form.Item>
            </Col>
            <Col span={24} md={12}>
              <Form.Item label="الدولة">
                <Input value={dataActivation?.country} disabled />
              </Form.Item>
            </Col>
            {/* <Col span={24} md={12}>
              <Form.Item label="المدينة">
                <Input value={dataActivation?.city} disabled />
              </Form.Item>
            </Col> */}
            <Col span={24} md={12}>
              <Form.Item label="الجنس">
                <Input value={dataActivation?.gender} disabled />
              </Form.Item>
            </Col>
            <Col span={24} md={12}>
              <Form.Item label="تاريخ الميلاد">
                <Input value={dataActivation?.dob} disabled />
              </Form.Item>
            </Col>
            <Col span={24} md={12}>
              <Form.Item label="رقم الهوية">
                <Input value={dataActivation?.identity} disabled />
              </Form.Item>
            </Col>

            {!!dataActivation?.qualification ? (
              <Col span={24} md={12}>
                <Form.Item label="المؤهل العلمـــي">
                  <Input value={dataActivation?.qualification} disabled />
                </Form.Item>
              </Col>
            ) : (
              ""
            )}

            {!!dataActivation?.fields ? (
              <Col span={24} md={24}>
                <div class="ant-form-item mb-20">
                  <div class="ant-row ant-row-rtl ant-form-item-row">
                    <div class="ant-col ant-col-24 ant-form-item-label ant-col-rtl css-dev-only-do-not-override-e3ycqg">
                      <label class="" title="المؤهل العلمـــي">
                        مجال العمل{" "}
                      </label>
                    </div>
                    <div class="ant-col ant-form-item-control ant-col-rtl">
                      <div class="ant-form-item-control-input">
                        <div class="ant-form-item-control-input-content">
                          <div className="ant-input ant-input-disabled ant-input-rtl css-dev-only-do-not-override-e3ycqg">
                            {dataActivation?.fields?.map((item) => (
                              <span>{item.name} ,</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            ) : (
              ""
            )}


            {!!dataActivation?.languages ? (
              <Col span={24} md={12}>
                <div class="ant-form-item mb-20">
                  <div class="ant-row ant-row-rtl ant-form-item-row">
                    <div class="ant-col ant-col-24 ant-form-item-label ant-col-rtl css-dev-only-do-not-override-e3ycqg" style={{marginBottom: "10px"}}>
                      <label class="" title="اللغات">
                        اللغات{" "}
                      </label>
                    </div>
                    <div class="ant-col ant-form-item-control ant-col-rtl">
                      <div class="ant-form-item-control-input">
                        <div class="ant-form-item-control-input-content">
                          <div className="ant-input ant-input-disabled ant-input-rtl css-dev-only-do-not-override-e3ycqg"  style={{minHeight: "38px"}}>
                            {dataActivation?.languages?.map((item) => (
                              <span>{item} ,</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            ) : null}

            {!!dataActivation?.nationality ? (
              <Col span={24} md={12}>
                <Form.Item label="الجنسية">
                  <Input value={dataActivation?.nationality} disabled />
                </Form.Item>
              </Col>
            ) : null}

            {!!dataActivation?.experience ? (
              <Col span={24} md={12}>
                <Form.Item label="سنوات الخبرة">
                  <Input value={dataActivation?.experience} disabled />
                </Form.Item>
              </Col>
            ) : (
              ""
            )}

            {!!dataActivation?.nos ? (
              <Col span={24} md={12}>
                <Form.Item label="عدد الجلسات المتاحة أسبوعياً">
                  <Input value={dataActivation?.nos} disabled />
                </Form.Item>
              </Col>
            ) : (
              ""
            )}
            {!!dataActivation?.completedSessionsCount ? (
              <Col span={24} md={12}>
                <Form.Item label="عدد الجلسات المكتملة">
                  <Input
                    value={dataActivation?.completedSessionsCount}
                    disabled
                  />
                </Form.Item>
              </Col>
            ) : (
              ""
            )}

            {!!dataActivation?.newSessionCount ? (
              <Col span={24} md={12}>
                <Form.Item label="عدد الجلسات الجديدة">
                  <Input value={dataActivation?.newSessionCount} disabled />
                </Form.Item>
              </Col>
            ) : (
              ""
            )}

            {!!dataActivation?.wallet ? (
              <Col span={24} md={12}>
                <Form.Item label="الرصيد الكلي">
                  <Input value={dataActivation?.wallet?.total} disabled />
                </Form.Item>
              </Col>
            ) : (
              ""
            )}

            {!!dataActivation?.wallet ? (
              <Col span={24} md={12}>
                <Form.Item label="الرصيد القابل للسحب">
                  <Input value={dataActivation?.wallet?.available} disabled />
                </Form.Item>
              </Col>
            ) : (
              ""
            )}
            
            {!!dataActivation?.wallet ? (
              <Col span={24} md={12}>
                <Form.Item label="الرصيد المعلق">
                  <Input value={dataActivation?.wallet?.onhold} disabled />
                </Form.Item>
              </Col>
            ) : (
              ""
            )}

            {!!dataActivation?.about_ar ? (
              <Col span={24} md={12}>
                <Form.Item label="نبذة عن المستشار باللغة العربية">
                  <Input.TextArea rows={4} value={dataActivation?.about} disabled />
                </Form.Item>
              </Col>
            ) : (
              ""
            )}
            {!!dataActivation?.about ? (
              <Col span={24} md={12}>
                <Form.Item label="نبذة عن المستشار باللغة الانجليزية">
                  <Input.TextArea rows={4} value={dataActivation?.about} disabled />
                </Form.Item>
              </Col>
            ) : (
              ""
            )}
          </Row>
        </Form>
      )}
    </Card>
  );
};

export default ActivationDetails;
