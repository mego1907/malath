import { Alert, Button, Card, Col, Modal, notification, Pagination, Row } from "antd";
import React, { useEffect, useState } from "react";
import { FaExclamationCircle, FaPlus, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EmptyData from "../../../../components/Admin/EmptyData";
import Loading from "../../../../components/Admin/Loading/Loading";
import useAppParams from "../../../../hooks/useAppParams";
import { deleteBlogs, getBlogs } from "../../../../store/Admin/actions/blog";
import styles from "../style.module.scss";
const { Meta } = Card;
const { confirm } = Modal;

const BlogList = () => {
  const dispatch = useDispatch();

  const { handleSearch } = useAppParams();

  const { dataBlogs, loading, error } = useSelector((state) => state.blogs);
  const { loading:loadingblogDelete, error:errorblogDelete } = useSelector((state) => state.blogDelete);

  const [page, setPage] = useState(1);
  const [blogId, setBlogId] = useState();
  const [open, setOpen] = useState(false);
  const [loadingBlog, setLoadingBlog] = useState(false);

  useEffect(() => {
    // handleSearch({
    //   fields: {
    //     page: page,
    //   },
    //   // deletedFields: ['id']
    // });
    dispatch(
      getBlogs({
        page: page,
        limit: 6,
      })
    );
  }, [dispatch, page , loadingBlog]);

  const ChangePagination = (number) => {
    setPage(number);
  };


  const openNotificationWithIcon = type => {
    notification[type]({
      message: 'تم حذف المدونة بنجاح',
      duration: 2
    })
  }


  const showModal = async  (id) => {
    setBlogId(id)
    setOpen(true);
  };
  const handleOk = async  () => {
    dispatch(
      deleteBlogs({
      blogId,
      callback: () => {
        openNotificationWithIcon('success')
        setLoadingBlog(!loadingBlog)
        setOpen(false);
      },
    })
    );
  };
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      {error ? <Alert className="mb-4" message={error} type="error" /> : null}
      <div className="mb-15 group-btn">
        <Link className="btn btn-add" to="/admin/blog/create"> <span className="icon"><FaPlus/></span> اضافة</Link>
      </div>
      {loading  ? (
        <Loading />
      ) : dataBlogs?.data?.blogs.length === 0 ? <EmptyData /> : (
        <>
          <Row gutter={20}>
            {dataBlogs?.data?.blogs?.map((item) => (
              <Col lg={8} xs={24}>
                <Card
                  loading={loading}
                  className={`mb-15 ${styles["card-blog"]}`}
                  cover={<Link to={`/admin/blog/view/${item.id}`}><img alt="example" src={item.header} /></Link> }
                >
                  <div className={`${styles["card-blog-tolbar"]}`}>
                    <button onClick={()=>showModal(item.id)} className={`${styles["delete"]}`}><FaRegTrashAlt /></button>
                    <Link to={`/admin/blog/edit/${item.id}`} className={`${styles["edit"]}`}><FaRegEdit /></Link>
                  </div>
                  <Link to={`/admin/blog/view/${item.id}`}>
                    <Meta title={item.title} description={item.body} />
                  </Link>
                </Card>
              </Col>
            ))}
          </Row>
          <Row>
            <Col>
              <Pagination
                onChange={(number) => ChangePagination(number)}
                pageSize={6}
                total={dataBlogs?.data?.total }
              />
            </Col>
          </Row>
          <Modal
          open={open}
          title="هل تريد حذف المدونة ؟"
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              اغلاق 
            </Button>,
            <Button key="submit" type="primary" loading={loadingblogDelete} onClick={()=>handleOk(blogId)}>
              حذف
            </Button>,
          ]}
        >
          {errorblogDelete? <Alert message={errorblogDelete} type="error" /> : null}
        </Modal>
        </>
      )}
    </>
  );
};

export default BlogList;
