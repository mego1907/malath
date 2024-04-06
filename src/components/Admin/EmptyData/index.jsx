import React from "react";
import { Empty } from 'antd';

const EmptyData = () => {
  return (
    <Empty description={
      <span>
        لا توجد بيانات
      </span>
    } image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg" />
  );
};

export default EmptyData;
