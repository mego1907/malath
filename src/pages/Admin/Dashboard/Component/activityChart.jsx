import { Card, Select, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { getActivityChart } from "../../../../store/Admin/actions/dashboard";
import { useDispatch, useSelector } from "react-redux";
const Option = Select.Option;

const ActivityChart = () => {
  const dispatch = useDispatch();
  const [sesstionChart, setSesstionChart] = useState([]);
  const { dataActivityChart, loading: loadingSesstionChart } = useSelector(
    (state) => state.activityChart
  );
  const [setionValue, setSetionValue] = useState([]);
  useEffect(() => {
    dispatch(
      getActivityChart({
        params: {
          type: setionValue,
        },
      })
    );
  }, [dispatch, setionValue]);

  useEffect(() => {
    setSesstionChart(
      dataActivityChart?.data?.map((row) => ({
        date: row.date,
        count: row.count,
      }))
    );
  }, [dataActivityChart]);

  var series2 = [
    {
      name: "النشاط",
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
    theme: {
      monochrome: {
        enabled: true,
        color: "#64549C",
        shadeTo: "light",
        shadeIntensity: 0.65,
      },
    },
    xaxis: {
      categories: sesstionChart?.map((item) => {
        return item?.date;
      }),
      labels: {
        offsetX: -15,
        offsetY: 50,
      },
    },
  };
  const handleChangeSession = (values) => {
    setSetionValue(values);
  };
  return (
    <Card className="mb-10">
      <div className="d-flex align-items-center justify-content-between mb-30">
        <h5>إحصائية النشاط على التطبيق </h5>
        <Select
          defaultValue="يومي"
          onChange={handleChangeSession}
          style={{ width: 120 }}
        >
          <Option value="0">يومي</Option>
          <Option value="1">اسبوعي</Option>
          <Option value="2">شهري</Option>
          <Option value="3">سنوي</Option>
        </Select>
      </div>
      {loadingSesstionChart ? (
        <Skeleton />
      ) : (
        <ReactApexChart
          options={options2}
          series={series2}
          height="400"
          type="area"
        />
      )}
    </Card>
  );
};

export default ActivityChart;
