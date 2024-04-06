import { Alert, Card, Col, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../../../../components/Admin/Loading/Loading";
import { getBlogSingle } from "../../../../store/Admin/actions/blog";
import styles from "../style.module.scss";
const BlogSingle = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { dataBlogSingle, loading, error } = useSelector(
    (state) => state.blogSingle
  );

  useEffect(() => {
    dispatch(getBlogSingle(id));
  }, [dispatch]);

  return (
    <Card>
      <Row justify="center">
        <Col lg={20}>
          {error ? <Alert message={error} type="error" /> : null}
          {loading ? (
            <Loading />
          ) : (
            <div>
              <div className={`mb-40 ${styles["card-blog-single-image"]}`}>
                <img src={dataBlogSingle?.header} alt="" />
              </div>
              <h3 className="font-bold mb-20">{dataBlogSingle?.title}</h3>
              <div className="mb-20">{dataBlogSingle?.body}</div>
            </div>
          )}
        </Col>
      </Row>
    </Card>
  );
};

export default BlogSingle;
