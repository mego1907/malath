import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Upload,
} from "antd";

import { FaCloudUploadAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  createLecture,
  getOneLecture,
  updateLecture,
} from "../../../../store/Admin/actions/lectures";
import {
  getAdvisersList,
} from "../../../../store/Admin/actions/lectures";
import Loading from "../../../../components/Admin/Loading/Loading";

const { TextArea } = Input;

const { Option } = Select;

const LecturesCreate = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isUpdate, setIsUpdate] = useState(false);
  const { dataLecture, loading: loadingLecture } = useSelector((state) => state.lecture);
  const { loading: loadingUpdate } = useSelector((state) => state.lectureUpdate);
  const { loading: loadingCreate } = useSelector((state) => state.lectureCreate);
  const { dataAdvisers, loading } = useSelector((state) => state.advisers);

  useEffect(() => {
      dispatch(getAdvisersList());
      if (id) {
        setIsUpdate(true);
        dispatch(getOneLecture(id));
      }
  }, [dispatch]);

  const onFinish = (values) => {
    let video = values?.video?.file?.status ? undefined : values?.video?.file;

    values = { ...values, video };

    const formData = new FormData();
    Object.keys(values).forEach((element) =>
      formData.append(element, values[element])
    );
    if (id) {
      dispatch(
        updateLecture({
          id: id,
          values: formData,
          callback: () => {
            dispatch(getOneLecture(id));
            navigate(`/admin/lectures/${id}/edit`);
          },
        })
      );
    } else {
      dispatch(
        createLecture({
          values: formData,
          callback: () => {
            form.resetFields();
            navigate(`/admin/lectures`);
          },
        })
      );
    }
  };

  const handleChange = ({ file }) => {
    if (Array.isArray(file)) {

      if (file && file?.originFileObj) {
        // console.log(file.originFileObj)
        // let blobURL = URL.createObjectURL(file.originFileObj);
        form.setFieldsValue({
          video: file?.originFileObj,
        });
      }
    }
  };

  if(dataLecture?.video){
    var props = {
      defaultFileList: [
        {
          uid: dataLecture?.id,
          name: 'video.png',
          status: 'done',
          url: dataLecture?.video,
        },
      ],
    };
  }

  useEffect(() => {
    if (isUpdate) {
      const { adviser, video, ...otherData } = dataLecture;
      form.setFieldsValue({ video: [] });
      form.setFieldsValue({ ...otherData });

      const getAdviser = dataAdvisers?.data?.find(
        (item) => item?.id === dataLecture?.adviser_id
      ); 

      form.setFieldsValue({ ...otherData, adviser: getAdviser?.id });
    }
  }, [form, dataLecture]);

  return (
    <Card>
      {loadingLecture ? (
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
                name="adviser_id"
                rules={[
                  {
                    required: true,
                    message: "الحقل مطلوب",
                  },
                ]}
              >
                <Select showSearch filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
                  placeholder="المستشار"
                  loading={loading}
                >
                  {dataAdvisers?.map((item, index) => (
                    <Option key={index} value={item.id}>
                      {item.full_name_ar}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="title"
                rules={[
                  { required: false },
                ]}
              >
                <Input placeholder="العنوان" />
              </Form.Item>
              <Form.Item
                name="description"
                rules={[
                  { required: false },
                ]}
              >
                <TextArea rows={5} placeholder="الوصف" />
              </Form.Item>
              <Form.Item name="video" className="input-video">
                <Upload {...props}
                  maxCount={1}
                  accept="video/mp4,video/x-m4v,video/*"
                  name="video"
                  onChange={handleChange}
                  beforeUpload={() => false}
                >
                  <Button block icon={<FaCloudUploadAlt />}>
                     <span className="mr-5">ارفاق فيديو</span>
                  </Button>
                </Upload>
              </Form.Item>
              <Form.Item>
                <p className="text-center" style={{fontSize: "20px", fontWeight: "bolder"}}>أو</p>
              </Form.Item>
              <Form.Item
                name="video_link"
                rules={[
                  { required: false },
                ]}
              >
                <Input placeholder="ارفاق لينك فيديو خارجي (مثال: YouTube)" />
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

export default LecturesCreate;
