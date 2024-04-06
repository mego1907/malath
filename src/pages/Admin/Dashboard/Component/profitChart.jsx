import { Card, Select, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { getProfitChart } from "../../../../store/Admin/actions/dashboard";
import { useDispatch, useSelector } from "react-redux";
const Option = Select.Option;

const ProfitChart = () => {
  const dispatch = useDispatch();
  const [sesstionChart, setSesstionChart] = useState([]);
  const { dataProfitChart, loading: loadingSesstionChart } = useSelector(
    (state) => state.profitChart
  );
  const [setionValue, setSetionValue] = useState([]);
  useEffect(() => {
    dispatch(
      getProfitChart({
        params: {
          type: setionValue,
        },
      })
    );
  }, [dispatch, setionValue]);

  useEffect(() => {
    setSesstionChart(
      dataProfitChart?.data?.map((row) => ({
        date: row.date,
        count: row.count,
      }))
    );
  }, [dataProfitChart]);

  var series2 = [
    {
      name: "الربح",
      data: sesstionChart?.map((item) => {
        return item?.count;
      }),
    },
  ];
  var options2 = {
    chart: {
      height: 280,
      type: "bar",
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
        <h5>إحصائية الأرباح </h5>
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
          height="250"
          type="bar"
        />
      )}
    </Card>
  );
};

export default ProfitChart;
