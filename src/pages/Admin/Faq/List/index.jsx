import { Alert,  Button,  Col, Collapse, Modal, notification, Pagination, Row } from "antd";
import React, { useEffect, useState } from "react";
import { FaPlus, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EmptyData from "../../../../components/Admin/EmptyData";
import Loading from "../../../../components/Admin/Loading/Loading";
import useAppParams from "../../../../hooks/useAppParams";
import { deleteFaq, getFaq } from "../../../../store/Admin/actions/faq";
import styles from "../style.module.scss";
const { Panel } = Collapse;

const FaqList = () => {
  const dispatch = useDispatch();

  const { UrlParams , handleSearch } = useAppParams();

  const { dataFaq, loading, error } = useSelector((state) => state.faq);
  const { loading: loadingfaqDelete, error: errorfaqDelete } = useSelector(
    (state) => state.faqDelete
  );

  const [page, setPage] = useState(1);
  const [faqId, setFaqId] = useState();
  const [open, setOpen] = useState(false);
  const [loadingBlog, setLoadingBlog] = useState(false);

  useEffect(() => {
    handleSearch({
      fields: {
        page: page,
      },
      // deletedFields: ['id']
    });
    dispatch(
      getFaq({
        page: page,
        limit: 10,
      })
    );
  }, [dispatch, page, loadingBlog]);

  const ChangePagination = (number) => {
    setPage(number);
  };

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "تم حذف السؤال بنجاح",
      duration: 2,
    });
  };

  const showModal = async  (id) => {
    setFaqId(id)
    setOpen(true);
  };
  const handleOk = async  () => {
    dispatch(
      deleteFaq({
        faqId,
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

  const genExtra = (id) => (
    <div className={`${styles["tolbar"]}`}>
      <button onClick={(event)=>showModal(id)} className={`${styles["delete"]}`}><FaRegTrashAlt /></button>
      <Modal
        open={open}
        title="هل تريد حذف السؤال ؟"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            اغلاق 
          </Button>,
          <Button key="submit" type="primary" loading={loadingfaqDelete} onClick={()=>handleOk(faqId)}>
            حذف
          </Button>,
        ]}
      >
        {errorfaqDelete? <Alert message={errorfaqDelete} type="error" /> : null}
      </Modal>
      <Link to={`/admin/faq/edit/${id}`} className={`${styles["edit"]}`}><FaRegEdit /></Link>
    </div>
    
  );

  return (
    <>
      {error ? <Alert className="mb-4" message={error} type="error" /> : null}
      <div className="mb-15 group-btn">
        <Link className="btn btn-add" to="/admin/faq/create"> <span className="icon"><FaPlus/></span> اضافة</Link>
      </div>
      {loading ? (
        <Loading />
      ) : dataFaq?.data?.blogs.length === 0 ? (
        <EmptyData />
      ) : (
        <>
          <Row gutter={20}>
            <Col lg={24} xs={24}>
              {dataFaq?.data?.blogs?.map((item) => (
                <Collapse className={`${styles["collapse-faq"]}`}>
                  <Panel header={item.title_ar} key={item.id} extra={genExtra(item.id)}>
                    <p>{item.body_ar}</p>
                  </Panel>
                </Collapse>
              ))}
            </Col>
          </Row>
          <Row>
            <Col>
              <Pagination

// defaultCurrent: 1,
// current: Number(UrlParams?.page ? UrlParams?.page : 1),
// pageSize: 10,
// total: dataUsersActivity?.data?.total,

                onChange={(number) => ChangePagination(number)}
                defaultCurrent={1}
                current={Number(UrlParams?.page ? UrlParams?.page : 1)}
                pageSize={10}
                total={dataFaq?.data?.total}
              />
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default FaqList;
