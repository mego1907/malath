import { Avatar, Card, Col, Progress, Row,  Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import {
  getAgeChart,
  getUserChart,
} from "../../../store/Admin/actions/dashboard";
import styles from "./style.module.scss";
import { FaUsers } from "react-icons/fa";
import userAvatar from "../../../assets/images/user.png";
import SessionChart from "./Component/sessionChart";
import ActivityChart from "./Component/activityChart";
import ProfitChart from "./Component/profitChart";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [userChart, userChartValue] = useState([]);
  
  const [user, setUser] = useState([]);
  

  const { dataUserChart, loading: loadingUserChart } = useSelector(
    (state) => state.userChart
  );
  const { dataAgeChart, loading: loadingAgeChart } = useSelector(
    (state) => state.ageChart
  );
 

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")).user);
  }, []);

  useEffect(() => {
    dispatch(getUserChart());
    dispatch(
      getAgeChart({
        params: {},
      })
    );
  }, [dispatch]);
  

  useEffect(() => {
    if (dataUserChart) {
      var jsonArray1 = JSON.parse(
        "[" + dataUserChart?.data?.advisers?.percentage + "]"
      );
      var jsonArray2 = JSON.parse(
        "[" + dataUserChart?.data?.beneficary?.percentage + "]"
      );
      userChartValue(jsonArray1?.concat(jsonArray2));
    }
  }, [dataUserChart]);



  var series = userChart;
  var options = {
    chart: {
      type: "donut",
      width: 100,
    },
    // label:["asd,sd"],
    colors: ["#43BCCD", "#F86624"],
    labels: ["المستشارين", "المستفيدين"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };
  


  return (
    <>
      <Row gutter={10}>
        <Col span={24} lg={8}>
          <Row gutter={10} className="mb-10">
            <Col span={12}>
              <Card>
                <Row gutter={5}>
                  <Col span={10}>
                    <div className={`${styles["icon-advisers"]}`}>
                      <FaUsers />
                    </div>
                  </Col>
                  <Col span={14}>
                    <h6>عدد المستشارين</h6>
                    <div className="d-flex align-items-center">
                      <h3 className="font-bold ml-5">
                        {loadingUserChart ? <Skeleton.Button size="small" /> : dataUserChart?.data?.advisers.count}
                      </h3>
                      <h6>مستشار</h6>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={12}>
              <Card>
                <Row gutter={5}>
                  <Col span={10}>
                    <div className={`${styles["icon-beneficary"]}`}>
                      <FaUsers />
                    </div>
                  </Col>
                  <Col span={14}>
                    <h6>عدد المستفيدين</h6>
                    <div className="d-flex align-items-center">
                      <h3 className="font-bold ml-5">
                        {loadingUserChart ? <Skeleton.Button size="small" /> : dataUserChart?.data?.beneficary.count}
                      </h3>
                      <h6>مستفيد</h6>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          <Row gutter={10} className="mb-10">
            <Col span={24}>
              <Card loading={loadingUserChart} className="mb-10">
                <ReactApexChart
                  options={options}
                  series={series}
                  height="150"
                  type="donut"
                />
              </Card>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={24}>
              <Card className="mb-10">
                <h4 className="font-bold">إحصائية الفئات العمرية</h4>
                {loadingAgeChart ? (
                  <Skeleton />
                ) : (
                  <>
                    {!!dataAgeChart &&
                      Object.keys(dataAgeChart?.data).map((item, i) => (
                        <div
                          className={`mb-15 d-flex align-items-center ${styles["progress"]}`}
                        >
                          <Progress
                            percent={dataAgeChart?.data[item].percentage}
                          />
                          <h6 className={`${styles["progress-title"]}`}>
                            {item}
                          </h6>
                        </div>
                      ))}
                  </>
                )}
              </Card>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={24}>
              <ProfitChart />
            </Col>
          </Row>
        </Col>
        <Col span={24} lg={10}>
          <ActivityChart />
          <SessionChart className="mb-20" />
        </Col>
        <Col span={24} lg={6}>
          <Card className="text-center">
            <h5 className="mb-10">الملف الشخصي</h5>
            <div className="mb-5">
              <Avatar
                preview={false}
                width={120}
                src={user?.avatar ? user.avatar : userAvatar}
              />
            </div>
            <h5 className="mb-5">{user?.full_name_ar}</h5>
            <h5 className="mb-5">{user?.email}</h5>
            <h5>{user?.role}</h5>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
