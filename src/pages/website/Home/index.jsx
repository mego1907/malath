import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import OurValues from './components/OurValues'
import OurConsultants from './components/OurConsultants'
import WhoWeAre from './components/WhoWeAre'
import MalathMission from './components/MalathMission'
import OurVision from './components/OurVision'
import JoinMalathApp from './components/JoinMalathApp'
import OurGoals from './components/OurGoals'
import FAQS from './components/FAQS'
import { useDispatch, useSelector } from 'react-redux'
import { getSections } from '../../../store/Website/actions/home'
import i18next from 'i18next'

const Home = () => {
  const dispatch = useDispatch();

  const [dataHeader , setDataHeader]  = useState();
  const [dataOuradvisers , setDataOuradvisers]  = useState();
  const [advisers, setAdvisers] = useState();
  const [dataConventsions , setDataConventsions]  = useState();
  const [dataStore , setDataStore]  = useState();
  const [dataGoals , setDataGoals]  = useState();
  const [dataValues , setDataValues]  = useState();
  const [dataSocials, setDataSocials] = useState();

    const { dataSections, loading } = useSelector(
      (state) => state.sections
    );



    useEffect(() => {
    }, [i18next]);

  console.log("dataGoals  :", dataGoals);
  // console.log(dataHeader)


    useEffect(() => {
      dataSections?.sections?.filter((item) => {
        if(item.name === 'header'){
          setDataHeader(item);
        }else if(item.name === 'ouradvisers'){
          setDataOuradvisers(item)
        }else if(item.name === 'conventsions'){
          setDataConventsions(item)
        }else if(item.name === 'store'){
          setDataStore(item)
        }else if(item.name === 'goals'){
          setDataGoals(item)
        }else if(item.name === 'values'){
          setDataValues(item)
        } else if (item.name === 'socials') {
          setDataSocials(item)
        } 
      });
    }, [dataSections]);

  return (
    <div>
      <Header 
        title={dataHeader?.title} 
        subtitle={dataHeader?.subtitle} 
        image={dataHeader?.image} 
        stores={dataStore?.items}
      />
      <OurValues 
        data={dataValues?.items} 
        title={dataValues?.title} 
        subtitle={dataValues?.subtitle} 
      />
      <OurConsultants 
        data={dataOuradvisers?.items} 
        title={dataOuradvisers?.title} 
        subtitle={dataOuradvisers?.subtitle} 
        advisers={dataSections?.advisers}
      />
      <WhoWeAre data={dataConventsions?.items.find(item => item.name === "adviser3")} />
      <MalathMission data={dataConventsions?.items.find(item => item.name === "ourmessage")} />
      <OurVision data={dataConventsions?.items.find(item => item.name === "vision")} /> 
      <JoinMalathApp 
        data={dataStore?.items} 
        title={dataStore?.title} 
        subtitle={dataStore?.subtitle} 
      />
      <OurGoals 
        data={dataGoals?.items} 
        title={dataGoals?.title} 
      />
      <FAQS 
        data={dataSections?.blogs}
      />  
    </div>
  )
}

export default Home








// import { Col, Row, Collapse } from "antd";
// import React, { useEffect, useState } from "react";
// import { Helmet } from "react-helmet";
// import { useDispatch, useSelector } from "react-redux";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Navigation } from "swiper";
// import i18next from "i18next";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import styles from "./style.module.scss";
// import Loading from "../../../components/Website/Loading/Loading";
// import { useTranslation } from "react-i18next";
// import { Link } from "react-scroll";
// import { getBlog } from "../../../store/Website/actions/home";

// const { Panel } = Collapse;

// const Home = () => {
//   const checkLang = i18next.language === "ar";

//   const { t } = useTranslation();
//   const dispatch = useDispatch();
//   const [dataHeader, setDataHeader] = useState();
//   const [dataOuradvisers, setDataOuradvisers] = useState();
//   const [dataConventsions, setDataConventsions] = useState();
//   const [dataStore, setDataStore] = useState();
//   const [dataGoals, setDataGoals] = useState();
//   const [dataValues, setDataValues] = useState();

//   const { dataSections, loading } = useSelector((state) => state.sections);


//   useEffect(() => {
//     dataSections?.sections?.filter(function (item) {
//       if (item.name === "header") {
//         setDataHeader(item);
//       } else if (item.name === "ouradvisers") {
//         setDataOuradvisers(item);
//       } else if (item.name === "conventsions") {
//         setDataConventsions(item);
//       } else if (item.name === "store") {
//         setDataStore(item);
//       } else if (item.name === "goals") {
//         setDataGoals(item);
//       } else if (item.name === "values") {
//         setDataValues(item);
//       }
//     });
//   }, [dataSections]);

//   useEffect(() => {
//     dispatch(
//       getBlog({
//         params: {
//           page: "1",
//           limit: "5",
//           type: "ESSAY",
//         },
//       })
//     );
//   }, [dispatch]);

  

//   return (
//     <>
//       <Helmet>
//         <title> {t("Malath App")} </title>
//       </Helmet>
//       {loading ? (
//         <Loading count="1" />
//       ) : (
//         <section
//           className={`${styles["section"]} ${styles["section-home"]}`}
//           style={{
//             backgroundImage: "url(" + dataHeader?.image + ")",
//             backgroundPosition: "center",
//             backgroundRepeat: "no-repeat",
//             backgroundSize: "cover",
//           }}
//         >
//           <div className="container">
//             <Row>
//               <Col lg={12}>
//                 <>
//                   <h1
//                     className={`font-bold text-white mb-15 ${styles["home-title"]}`}
//                   >
//                     {dataHeader?.title}
//                   </h1>
//                   <h5 className="text-white">{dataHeader?.subtitle}</h5>
//                   <Link
//                     className={`font-bold mt-25 ${styles["btn-download-app"]}`}
//                     smooth
//                     spy
//                     to="section-store"
//                     offset={-45}
//                   >
//                     {t("Download the app")}
//                   </Link>
//                 </>
//               </Col>
//             </Row>
//           </div>
//         </section>
//       )}
//       <Loading />
//       <section className={`${styles["section"]}`} id="section-ouradvisers">
//         <div className="container">
//           <Row className="mb-50" justify="center">
//             <Col span={20}>
//               <h2 className="text-center font-bold mb-10 text-primary mt-20">
//                 {dataOuradvisers?.title}
//               </h2>
//               <h5 className="text-center mb-20">{dataOuradvisers?.subtitle}</h5>
//             </Col>
//           </Row>
//           <Row>
//             <Col span={24}>
//               {loading ? (
//                 <Loading count="3" />
//               ) : (
//                 <>
//                   <Swiper
//                     dir={checkLang ? "rtl" : null}
//                     spaceBetween={50}
//                     slidesPerView={1}
//                     navigation={true}
//                     centeredSlides={true}
//                     modules={[Navigation, Pagination]}
//                     pagination={{
//                       clickable: true,
//                     }}
//                     breakpoints={{
//                       640: {
//                         slidesPerView: 1,
//                         spaceBetween: 20,
//                       },
//                       768: {
//                         slidesPerView: 2,
//                         spaceBetween: 40,
//                       },
//                       1024: {
//                         slidesPerView: 3,
//                         spaceBetween: 40,
//                       },
//                     }}
//                     loop={true}
//                   >
//                     {dataSections?.advisers?.map((item, index) => (
//                       <SwiperSlide key={index}>
//                         <div className={`${styles["widget_item-ouradvisers"]}`}>
//                           <div className={`${styles["widget_item-image"]}`}>
//                             <img src={item.avatar} alt="" />
//                           </div>
//                         </div>
//                         <div className={`${styles["widget_item-content"]}`}>
//                           <h4 className={`font-bold text-dark mb-5`}>
//                             {checkLang ? item?.full_name_ar : item?.full_name}
//                           </h4>
//                           <h4 className={`text-dark`}>{item?.email}</h4>
//                         </div>
//                       </SwiperSlide>
//                     ))}
//                   </Swiper>
//                 </>
//               )}
//             </Col>
//           </Row>
//         </div>
//       </section>
//       <section className={`bg-white ${styles["section"]}`} id="section-about">
//         <div className="container">
//           <Row>
//             <Col lg={24}>
//               {loading ? (
//                 <Loading count="1" />
//               ) : (
//                 <div className={`${styles["list-conventsions"]}`}>
//                   {dataConventsions?.items?.map((item, index) => (
//                     <Row
//                       gutter={20}
//                       align="middle"
//                       className="mb-40"
//                       key={index}
//                     >
//                       <Col lg={13} className="mb-10">
//                         <h2
//                           className={`font-bold mb-10 text-primary font-size-32 `}
//                         >
//                           {item?.title}
//                         </h2>
//                         <h3>{item?.subtitle}</h3>
//                       </Col>
//                       <Col lg={11} className="mb-10">
//                         <img src={item?.image} alt="" />
//                       </Col>
//                     </Row>
//                   ))}
//                 </div>
//               )}
//             </Col>
//           </Row>
//         </div>
//       </section>
//       <section className={`${styles["section"]}`} id="section-store">
//         <div className="container">
//           {loading ? (
//             <Loading count="2" />
//           ) : (
//             <Row className="mb-40" align="middle" justify="center">
//               <Col lg={13}>
//                 <img src={dataStore?.image} alt={dataStore?.name} />
//               </Col>
//               <Col lg={11}>
//                 <h2 className="text-center font-bold mb-10 text-primary font-size-32">
//                   {dataStore?.title}
//                 </h2>
//                 <h5 className="text-center">{dataStore?.subtitle}</h5>
//                 <div className="d-flex align-items-center justify-content-center mt-20">
//                   {dataStore?.items?.map((item, index) => (
//                     <a target="_blank" href={item?.subtitle} className="mr-10 ml-10" key={index} rel="noreferrer">
//                       <img src={item.image} alt="" />
//                     </a>
//                   ))}
//                 </div>
//               </Col>
//             </Row>
//           )}
//         </div>
//       </section>
//       <section className={`bg-white ${styles["section"]}`}>
//         <div className="container">
//           {loading ? (
//             <Loading count="3" />
//           ) : (
//             <div>
//               <Row className="mb-40">
//                 <Col>
//                   <h2 className="text-primary font-bold font-size-32">
//                     {dataGoals?.title}
//                   </h2>
//                 </Col>
//               </Row>
//               <Row gutter={30} justify="center">
//                 {dataGoals?.items?.map((item, index) => (
//                   <Col lg={8} span={24} sm={12} key={index} className="mb-30">
//                     <div
//                       className={`text-center ${styles["widget_item-goals"]}`}
//                     >
//                       <div className={`${styles["widget_item-icon"]}`}>
//                         <img src={item?.image} alt="" />
//                       </div>
//                       <h3 className={`${styles["widget_item-title"]}`}>
//                         {item?.title}
//                       </h3>
//                     </div>
//                   </Col>
//                 ))}
//               </Row>
//             </div>
//           )}
//         </div>
//       </section>
//       <section className={`${styles["section"]}`}>
//         <div className="container">
//           {loading ? (
//             <Loading count="4" />
//           ) : (
//             <div>
//               <Row className="mb-40">
//                 <Col>
//                   <h2 className="text-primary font-bold font-size-32">
//                     {dataValues?.title}
//                   </h2>
//                 </Col>
//               </Row>
//               <Row gutter={30} justify="center">
//                 {dataValues?.items?.map((item, index) => (
//                   <Col lg={6} span={12} md={8} key={index}>
//                     <div
//                       className={`text-center mb-30 ${styles["widget_item-values"]}`}
//                     >
//                       <div className={`${styles["widget_item-icon"]}`}>
//                         <img src={item?.image} alt="" />
//                       </div>
//                       <h3
//                         className={`font-bold ${styles["widget_item-title"]}`}
//                       >
//                         {item?.title}
//                       </h3>
//                     </div>
//                   </Col>
//                 ))}
//               </Row>
//             </div>
//           )}
//         </div>
//       </section>
//       <section className={`bg-white ${styles["section"]}`}>
//         <div className="container">
//           {loading ? (
//             <Loading count="4" />
//           ) : (
//             <div>
//               <Row className="mb-40">
//                 <Col xs={24}>
//                   <h2 className="text-primary font-bold font-size-32">
//                     {t("Common Questions")}
//                   </h2>
//                 </Col>
//               </Row>
//               <Row gutter={20}>
//                 <Col lg={24} xs={24}>
//                   {
//                     dataSections?.blogs?.slice(0, 4)?.map((item) => (
//                       <Collapse className={`${styles["collapse-faq"]}`}>
//                         <Panel header={item.title} key={item.id}>
//                           <p>{checkLang ? item.body_ar : item.body}</p>
//                         </Panel>
//                       </Collapse>
//                     ))
//                   }
//                 </Col>
//               </Row>
//             </div>
//           )}
//         </div>
//       </section>
//       {/* <section className={`bg-white ${styles["section"]}`}>
//         <div className="container">
//           {loading ? (
//             <Loading count="4" />
//           ) : (
//             <div>
//               <Row className="mb-40">
//                 <Col xs={24}>
//                   <h2 className="text-primary font-bold font-size-32">
//                     {t("blog")}
//                   </h2>
//                 </Col>
//               </Row>
//               <Row gutter={30} justify="center">
//                 {dataBlogs?.blogs?.slice(0, 4).map((item, index) => (
//                   <Col lg={6} span={24} md={8} key={index}>
//                     <LinkL
//                       to={`/blog/${item?.id}`}
//                       className={`mb-30 ${styles["widget_item-blog"]}`}
//                     >
//                       <div className={`${styles["widget_item-image"]}`}>
//                         <img src={item?.header} alt="" />
//                       </div>
//                       <div className={`${styles["widget_item-content"]}`}>
//                         <h4 className={`${styles["widget_item-title"]}`}>
//                           {item?.title}
//                         </h4>
//                       </div>
//                     </LinkL>
//                   </Col>
//                 ))}
//               </Row>
//             </div>
//           )}
//         </div>
//       </section> */}
//     </>
//   );
// };

// export default Home;
