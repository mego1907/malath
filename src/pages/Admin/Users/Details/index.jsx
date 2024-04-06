import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Loading from "../../../../components/Admin/Loading/Loading";
import { getOneUser } from "../../../../store/Admin/actions/users";
import { Card, Col, Form, Image, Input, Row } from "antd";

const UsersDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { dataUser, loading: loadingUser } = useSelector((state) => state.user);
 

  useEffect(() => {
    if (id) {
      dispatch(getOneUser(id));
    }
    
  }, [dispatch]);

  return (
    <Card className="users-details">
      {loadingUser ? (
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
                  src={dataUser?.avatar}
                  width={100}
                  height={100}
                />
              </Form.Item>
            </Col>
            <Col span={24} md={12}>
              <Form.Item label="الإسم باللغة العربية ">
                <Input value={dataUser?.full_name_ar} disabled />
              </Form.Item>
            </Col>
            <Col span={24} md={12}>
              <Form.Item label="الإسم باللغة الإنجليزية ">
                <Input value={dataUser?.full_name} disabled />
              </Form.Item>
            </Col>
            <Col span={24} md={12}>
              <Form.Item label="البريد الإلكتروني">
                <Input value={dataUser?.email} disabled />
              </Form.Item>
            </Col>
            <Col span={24} md={12}>
              <Form.Item label="رقم الهاتف">
                <Input value={dataUser?.phone} disabled />
              </Form.Item>
            </Col>
            <Col span={24} md={12}>
              <Form.Item label="الدولة">
                <Input value={dataUser?.country?.name} disabled />
              </Form.Item>
            </Col>
            {/* <Col span={24} md={12}>
              <Form.Item label="المدينة">
                <Input value={dataUser?.city} disabled />
              </Form.Item>
            </Col> */}
            <Col span={24} md={12}>
              <Form.Item label="الجنس">
                <Input value={dataUser?.gender} disabled />
              </Form.Item>
            </Col>
            <Col span={24} md={12}>
              <Form.Item label="تاريخ الميلاد">
                <Input value={dataUser?.dob} disabled />
              </Form.Item>
            </Col>
            <Col span={24} md={12}>
              <Form.Item label="رقم الهوية">
                <Input value={dataUser?.identity} disabled />
              </Form.Item>
            </Col>

           

            {!!dataUser?.fields ? (
              <Col span={24} md={24}>
                <div class="ant-form-item mb-20 custom-input">
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
                            {dataUser?.fields?.map((item) => (
                              <span>{item.name} ,</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            ) : null}
            {!!dataUser?.languages ? (
              <Col span={24} md={12}>
                <div class="ant-form-item mb-20 custom-input">
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
                            {dataUser?.languages?.map((item) => (
                              <span>{item?.name} ,</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            ) : null}

            {!!dataUser?.qualification ? (
              <Col span={24} md={12}>
                <Form.Item label="المؤهل العلمـــي">
                  <Input value={dataUser?.qualification} disabled />
                </Form.Item>
              </Col>
            ) : null}

            {!!dataUser?.nationality ? (
              <Col span={24} md={12}>
                <Form.Item label="الجنسية">
                  <Input value={dataUser?.nationality?.name} disabled />
                </Form.Item>
              </Col>
            ) : null}
            {!!dataUser?.experience ? (
              <Col span={24} md={12}>
                <Form.Item label="سنوات الخبرة">
                  <Input value={dataUser?.experience} disabled />
                </Form.Item>
              </Col>
            ) : null}

            {!!dataUser?.nos ? (
              <Col span={24} md={12}>
                <Form.Item label="عدد الجلسات المتاحة أسبوعياً">
                  <Input value={dataUser?.nos} disabled />
                </Form.Item>
              </Col>
            ) : null}

            {!!dataUser?.wallet ? (
              <Col span={24} md={12}>
                <Form.Item label="الرصيد الكلي">
                  <Input value={dataUser?.wallet?.total} disabled />
                </Form.Item>
              </Col>
            ) : (
              ""
            )}

            {!!dataUser?.wallet ? (
              <Col span={24} md={12}>
                <Form.Item label="الرصيد القابل للسحب">
                  <Input value={dataUser?.wallet?.available} disabled />
                </Form.Item>
              </Col>
            ) : (
              ""
            )}

            {!!dataUser?.wallet ? (
              <Col span={24} md={12}>
                <Form.Item label="الرصيد المعلق">
                  <Input value={dataUser?.wallet?.onhold} disabled />
                </Form.Item>
              </Col>
            ) : (
              ""
            )}

          </Row>
            {!!dataUser?.about ? (
              <Row gutter={20}>
              <Col span={24} md={12}>
                <Form.Item label="نبذة عن المستشار باللغة العربية">
                  <Input.TextArea rows={4} value={dataUser?.about_ar} disabled />
                </Form.Item>
              </Col>
              <Col span={24} md={12}>
                <Form.Item label="نبذة عن المستشار باللغة الانجليزية">
                  <Input.TextArea rows={4} value={dataUser?.about} disabled />
                </Form.Item>
              </Col>
              </Row>
            ) : null}
            {dataUser?.role === "ADVISER" ? <>
            {!!dataUser?.video ? (
              <Col span={24} md={12}>
                <Form.Item label="الفيديو">
                
                </Form.Item>
                <div className="video">
                  <video width="100%" controls>
                    <source src={dataUser?.video} type="video/mp4" />
                  </video> 
                </div>
              </Col>
            ) : null}</> : null}
            

        </Form>
      )}
    </Card>
  );
};

export default UsersDetails;
