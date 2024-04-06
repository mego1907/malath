import { Avatar, Button, Col, Modal, Row, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import EmptyData from "../../../../components/Admin/EmptyData";
import user from "../../../../assets/images/user.png";
import useAppParams from "../../../../hooks/useAppParams";
import {
  getUsersActivity,
  getUserActivity,
} from "../../../../store/Admin/actions/UsersActivity";
import Loading from "../../../../components/Admin/Loading/Loading";

const { Option } = Select;

const UsersActivity = () => {
  const dispatch = useDispatch();

  const { UrlParams, handleSearch } = useAppParams({});
  const [data, setData] = useState([]);
  const [state, setState] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { dataUsersActivity, loading } = useSelector(
    (state) => state.usersActivity
  );
  const { dataUserActivity, loading: loadingUserActivity } = useSelector(
    (state) => state.userActivity
  );

  // useEffect(() => {
  //   handleSearch({
  //     fields: {
  //       page: 1,
  //     },
  //   });
  // }, []);

  useEffect(() => {
    if (UrlParams) {
      dispatch(
        getUsersActivity({
          params: { ...UrlParams },
        })
      );
    }
  }, [dispatch, UrlParams]);

  useEffect(() => {
    setData(
      dataUsersActivity?.data?.users?.map((row) => ({
        key: row.id,
        id: row.id,
        name: row?.full_name_ar,
        avatar: row?.avatar,
        phone: row?.phone,
        email: row?.email,
      }))
    );
  }, [dataUsersActivity]);

  const ChangePagination = (number) => {
    handleSearch({
      fields: {
        page: number,
      },
    });
  };

  const columns = [
    {
      title: "الاسم",
      dataIndex: ["name", "avatar"],
      render: (index, row) => (
        <div key={index}>
          <Avatar size={40} src={row?.avatar ? row?.avatar : user} />{" "}
          {row?.name}
        </div>
      ),
    },

    {
      title: "الهاتف ",
      dataIndex: "phone",
    },
    {
      title: "البريد الالكتروني",
      dataIndex: "email",
    },
    {
      title: "الاجراءات",
      key: "action",
      render: (row) => (
        // console.log(row)
        <Button onClick={() => showModal(row)}>تفاصيل</Button>
      ),
    },
  ];
  let locale = {
    emptyText: <EmptyData />,
  };

  const showModal = (row) => {
    setState(row)
    // dispatch(getUserActivity({ row?.id ,  params: { ...UrlParams }}))
    dispatch(
      getUserActivity({
        id: row?.id,
        params: { ...UrlParams },
      })
    );
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (value) => {
    handleSearch({
      fields: {
        type: value,
      },
    });
  };

  return (
    <>
      <Row className="mb-15" justify="end">
        <Col lg={4}>
          <Select  onChange={handleChange} size="large" style={{width:"100%"}}  defaultValue="0">
            <Option value="0">يومي</Option>
            <Option value="1">اسبوعي</Option>
            <Option value="2">شهري</Option>
            <Option value="3">سنوي</Option>
          </Select>
        </Col>
      </Row>
      <Table
        locale={locale}
        size="small"
        columns={columns}
        loading={loading}
        dataSource={data}
        pagination={{
          defaultCurrent: 1,
          current: Number(UrlParams?.page ? UrlParams?.page : 1),
          pageSize: 10,
          total: dataUsersActivity?.data?.total,
          onChange: (page) => {
            ChangePagination(page);
          },
        }}
      />
      <Modal
        className="users-activity"
        // title={value.value ? "تعديل المجال" : "أضف مجال جديد"}
        footer={false}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
      >
        <div className="d-flex mb-20">
          <Avatar size={40} src={state?.avatar} />
          <h4 className="mr-10">{state?.name}</h4>
        </div>
        {loadingUserActivity ? (
          <Loading />
        ) : (
          <div className="text-center">
            {dataUserActivity?.data?.length > 0 ? (
              <div>
                <Row>
                  <Col span={6}>التاريخ</Col>
                  <Col span={6}>توقيت الدخول</Col>
                  <Col span={6}>توقيت الخروج</Col>
                  <Col span={6}>مدة الاستخدام</Col>
                </Row>
                {dataUserActivity?.data?.map((item) => (
                  <Row gutter={15}>
                    {item?.interval.map((ite) => (
                      <>
                        <Col className="pt-5 pb-5" span={6}>{item?.date}</Col>
                        <Col className="pt-5 pb-5" span={6}>{ite?.start_time}</Col>
                        <Col className="pt-5 pb-5" span={6}>{ite?.end_time}</Col>
                        <Col className="pt-5 pb-5" span={6}>{ite?.duration?.seconds} ثانية</Col>
                      </>
                    ))}
                  </Row>
                ))}
              </div>
            ) : (
              <h2 className="text-center pt-30 pb-30">لا توجد نتائج</h2>
            )}
          </div>
        )}
      </Modal>
    </>
  );
};

export default UsersActivity;
