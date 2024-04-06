import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getBlogSingle } from "../../../store/Website/actions/home";
import { useParams } from "react-router-dom";
import { Spin ,Typography} from "antd";
const { Title, Text } = Typography;
const HomeBlogSingle = () => {

  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {id} = useParams();

  const { dataBlogsSingle, loading } = useSelector(
    (state) => state.blogsHomeSingle
    );
    


  useEffect(() => {
    dispatch(getBlogSingle(id))
  }, [dispatch  , id])
  
  

  return (
    <>
      <Helmet>
        <title> {t('Malath App')} </title>
      </Helmet>
      <section className="pt-50 pb-50">
        <div className="container">
          {loading ? <Spin /> : <>
            <Title level={2}>{dataBlogsSingle?.data?.title}</Title>
            <div className="mb-20">
              <img className="w-100" src={dataBlogsSingle?.data?.header} alt="" />
            </div>
            <Text className="fs-16 line-height-2">{dataBlogsSingle?.data?.body}</Text>
          </>}
        </div>
      </section>
    </>
  );
};

export default HomeBlogSingle;
