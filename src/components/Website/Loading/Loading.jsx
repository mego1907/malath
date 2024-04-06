import { Col, Row } from "antd";
import React from "react";
const Loading = ({count}) => {
  
  return (
    <Row gutter={20}>
       {Array.apply(null, { length: count }).map((e, i) => (
         <Col className="col">
          <div className="skeleton__block"></div>
        </Col>
      ))}
    </Row>
  );
};

export default Loading;
