import { Avatar, Card, Col, Progress, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import {
  getAgeChart,
  getUserChart,
  getSessionChart,
} from "../../../store/Admin/actions/dashboard";
import styles from "./style.module.scss";
import { FaUsers } from "react-icons/fa";
import userAvatar from '../../../assets/images/user.png'

const Dashboard = () => {
  const dispatch = useDispatch();
  const [userChart, userChartValue] = useState([]);
  const [sesstionChart, setSesstionChart] = useState([]);
  const [user, setUser] = useState([]);

  const { dataUserChart, loading: loadingUserChart } = useSelector(
    (state) => state.userChart
  );
  const { dataAgeChart, loading: loadingAgeChart } = useSelector(
    (state) => state.ageChart
  );
  const { dataSesstionChart, loading: loadingSesstionChart } = useSelector(
    (state) => state.sesstionChart
  );

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")).user);
  }, []);

  useEffect(() => {
    dispatch(getUserChart());
    dispatch(
      getAgeChart({
        params: {
          year: 2022,
        },
      })
    );
    dispatch(
      getSessionChart({
        params: {
          type: 0,
        },
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

    //   setState({
    //     advisers: dataUserChart?.data?.advisers, beneficary:dataUserChart?.data?.beneficary
    //   });

    //   console.log(state?.beneficary?.percentage)

    //   var jsonArray1 = JSON.parse("[" + state?.advisers?.percentage + "]");
    //   var jsonArray2 = JSON.parse("[" + state?.beneficary?.percentage + "]");
    // // jsonArray1 = jsonArray1?.concat(jsonArray2);
    // // console.log(jsonArray1?.concat(jsonArray2))
    // // setState(jsonArray1.concat(jsonArray2))
    // console.log(state)

    //   // setState({sds:{dataUserChart?.data?.advisers?.percentage}})
    //   // setState(dataUserChart?.data?.beneficary?.percentage)
    //   console.log(JSON.parse("[" + dataUserChart?.data?.advisers?.percentage , dataUserChart?.data?.beneficary?.percentage + "]"))
    // console.log(state?.first_name?.percentage+state?.last_name?.percentage)
    // console.log(JSON.parse("[" + state?.first_name?.percentage + "]") + JSON.parse("[" + state?.last_name?.percentage + "]"))
  }, [dataUserChart]);

  useEffect(() => {
    setSesstionChart(
      dataSesstionChart?.data?.map((row) => ({
        date: row.date,
        count: row.count,
      }))
    );
  }, [dataSesstionChart]);

  var series = userChart;
  var options = {
    chart: {
      type: "donut",
      width: 100,
    },
    // label:["asd,sd"],
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
  var series2 = [
    {
      name: "Series 1",
      data: sesstionChart?.map((item) => {
        return item?.count;
      }),
    },
  ];
  var options2 = {
    chart: {
      height: 280,
      type: "area",
    },
    xaxis: {
      categories: sesstionChart?.map((item) => {
        return item?.date;
      }),
    },
  };
  return (
    <>
      <Row gutter={10}>
        <Col lg={8}>
          <Row gutter={10} className="mb-10">
            <Col span={12}>
              <Card loading={loadingUserChart}>
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
                        {dataUserChart?.data?.advisers.count}
                      </h3>
                      <h6>مستشار</h6>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={12}>
              <Card loading={loadingUserChart}>
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
                        {dataUserChart?.data?.beneficary.count}
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
              <Card loading={loadingUserChart}>
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
              <Card loading={loadingAgeChart}>
                <h4 className="font-bold">إحصائية الفئات العمرية</h4>
                {!!dataAgeChart &&
                  Object.keys(dataAgeChart?.data).map((item, i) => (
                    <div
                      className={`mb-15 d-flex align-items-center ${styles["progress"]}`}
                    >
                      <Progress percent={dataAgeChart?.data[item].percentage} />
                      <h6 className={`${styles["progress-title"]}`}>{item}</h6>
                    </div>
                  ))}
              </Card>
            </Col>
          </Row>
        </Col>
        <Col span={10}>
          <Card loading={loadingUserChart}>
            <ReactApexChart
              options={options2}
              series={series2}
              height="350"
              type="area"
            />
          </Card>
        </Col>
        <Col lg={6}>
          <Card className="text-center">
            <h5 className="mb-10">الملف الشخصي</h5>
            <div className="mb-5">
              <Avatar preview={false} width={120} src={user?.avatar ? user.avatar :  userAvatar } />
            </div>
            <h5 className="mb-5">
              {user?.full_name_ar}
            </h5>
            <h5 className="mb-5">{user?.email}</h5>
            <h5>{user?.role}</h5>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;

//   const list = Object.keys(dataUserChart?.data).reduce((acc, key) => {
//     acc[key] = dataUserChart?.data[key].percentage
//     return acc
//  }, {})
//     setState(Object.values(list))

// const display = Object.keys(data).map((d, key) => {
//   return (
//     <div className="my-posts">
//       <li key={key}>
//         {data.current_route}
//       </li>
//     </div>
//     );
//   });
// }, [])

//   const res = Object.entries(dataUserChart?.data).reduce((acc, [key, obj]) => ({
//     ...acc,
//     [key]: dataUserChart?.percentage,
//   }), {});
//  console.log(res)

// const list = Object.keys(dataUserChart?.data).reduce((acc, key) => {
//   acc[key] = dataUserChart?.data[key].percentage
//   return acc
// }, {})
// setState(list)
