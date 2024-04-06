// import { Col, Row } from "antd";
// import React, { useEffect, useState } from "react";
// import { Helmet } from "react-helmet";
// import { useDispatch, useSelector } from "react-redux";
// import { getSections } from "../../../store/Wibsite/actions/home";
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Pagination , Navigation } from "swiper";
// import i18next from "i18next";
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import styles from "./style.module.scss";
// import Loading from "../../../components/Loading/Loading";
// const Home = () => {
//   const dispatch = useDispatch();

//   const [dataHeader , setDataHeader]  = useState();
//   const [dataOuradvisers , setDataOuradvisers]  = useState();
//   const [dataConventsions , setDataConventsions]  = useState();
//   const [dataStore , setDataStore]  = useState();
//   const [dataGoals , setDataGoals]  = useState();
//   const [dataValues , setDataValues]  = useState();

//   const { dataSections, loading } = useSelector(
//     (state) => state.sections
//   );



//   useEffect(() => {
//     dispatch(getSections());
//   }, [dispatch]);

//   useEffect(() => {
//   }, [i18next]);


//   useEffect(() => {
//     dataSections?.sections?.filter(function (item) {
//        if(item.name === 'header'){
//          setDataHeader(item);
//        }else if(item.name === 'ouradvisers'){
//         setDataOuradvisers(item)
//        }else if(item.name === 'conventsions'){
//         setDataConventsions(item)
//        }else if(item.name === 'store'){
//         setDataStore(item)
//        }else if(item.name === 'goals'){
//         setDataGoals(item)
//        }else if(item.name === 'values'){
//         setDataValues(item)
//        }
//     });
//   }, [dataSections]);

//   return (
//     <>
//       <Helmet>
//         <title> ملاذ | الرئيسية </title>
//       </Helmet>
//       {loading ? ( <Loading count="1" />) : (
//         <section className={`${styles["section"]} ${styles["section-home"]}`} style={{backgroundImage: 'url(' + dataHeader?.image + ')' , backgroundPosition: 'center' , backgroundRepeat: 'no-repeat' , backgroundSize: 'cover'}}>
//           <div className="container">
//             <Row>
//               <Col lg={12}>
//                   <>
//                     <h1 className={`font-bold text-white mb-15 ${styles["home-title"]}`}> {dataHeader?.title} </h1>
//                     <h5 className="text-white">
//                       {dataHeader?.subtitle}
//                     </h5>
//                   </>
//               </Col>
//             </Row>
//           </div>
//         </section>
//       )}
//        <Loading/>
//       <section className={`${styles["section"]}`} id="section-ouradvisers">
//         <div className="container">
//           <Row className="mb-50" justify='center'>
//             <Col span={20}>
//               <h2 className="text-center font-bold mb-10 text-primary">{dataOuradvisers?.title}</h2>
//               <h5 className="text-center mb-20">{dataOuradvisers?.subtitle}</h5>
//             </Col>
//           </Row>
//           <Row> 
//             <Col span={24}>
//               {loading ? (
//               <Loading count="3"  />
//               ) : (
//                 <>
//                  <Swiper dir={i18next.language === 'ar' ? 'rtl' : null}
//                   spaceBetween={50}
//                   slidesPerView={1}
//                   navigation={true}
//                   centeredSlides={true}
//                   modules={[Navigation , Pagination]}
//                   pagination={{
//                     clickable: true,
//                   }}
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
//                    >
//                   {dataOuradvisers?.items.map((item,index)=>(
//                     <SwiperSlide key={index}>
//                       <div className={`${styles["widget_item-ouradvisers"]}`}>
//                         <div className={`${styles["widget_item-image"]}`}>
//                           <img src={item.image} alt="" />
//                         </div>
//                         <div className={`${styles["widget_item-content"]}`}>
//                           <h4 className={`font-bold text-white mb-5`}>{item?.title}</h4>
//                           <h4 className={`text-white`}>{item?.subtitle}</h4>
//                         </div>
//                       </div>
//                     </SwiperSlide>
//                     ))}
//                   </Swiper>
//                   </>
//                 )}
//             </Col>
//           </Row>
//         </div>
//       </section>
//       <section className={`bg-white ${styles["section"]}`} id="section-about">
//         <div className="container">
//           <Row>
//             <Col lg={24}>
//               {loading ? ( <Loading count="1"/> ) : (
//                 <div className={`${styles["list-conventsions"]}`}>
//                   {dataConventsions?.items?.map((item , index)=>(
//                     <Row gutter={20} align="middle" className="mb-40" key={index}>
//                       <Col lg={13} className="mb-10">
//                         <h2 className={`font-bold mb-10 text-primary font-size-32 `}>{item?.title}</h2>
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
//           {loading ? ( <Loading count="2"/>) : (
//             <Row className="mb-40" justify='center'>
//               <Col lg={13}>
//                 <img src={dataStore?.image} alt={dataStore?.name} />
//               </Col>
//               <Col lg={11}>
//                 <h2 className="text-center font-bold mb-10 text-primary font-size-32">{dataStore?.title}</h2>
//                 <h5 className="text-center">{dataStore?.subtitle}</h5>
//                   {/* {dataStore?.items?.map((item , index)=>(
//                     <div className="d-flex align-items-center" key={index}>
//                       <a href="">
//                         <img src={item.image} alt="" />
//                       </a>
//                     </div>
//                   ))}  */}
//               </Col>
//             </Row>
//           )}
//         </div>
//       </section>
//       <section className={`bg-white ${styles["section"]}`}>
//         <div className="container">
//           {loading ? ( <Loading count="3"/>) : (
//             <div>
//               <Row className="mb-40">
//                 <Col>
//                   <h2 className="text-primary font-bold font-size-32">{dataGoals?.title}</h2>
//                 </Col>
//               </Row>
//               <Row gutter={30} justify="center">
//                 {dataGoals?.items?.map((item , index)=>(
//                   <Col lg={8} span={24} sm={12} key={index}>
//                     <div className={`text-center mb-30 ${styles["widget_item-goals"]}`}>
//                       <div className={`${styles["widget_item-icon"]}`}>
//                         <img src={item?.image} alt="" />
//                       </div>
//                       <h3 className={`${styles["widget_item-title"]}`}>{item?.title}</h3>
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
//           {loading ? ( <Loading count="4" />) : (
//             <div>
//               <Row className="mb-40">
//                 <Col>
//                   <h2 className="text-primary font-bold font-size-32">{dataValues?.title}</h2>
//                 </Col>
//               </Row>
//               <Row gutter={30} justify="center">
//                 {dataValues?.items?.map((item , index)=>(
//                   <Col lg={6} span={12} md={8} key={index}>
//                     <div className={`text-center mb-30 ${styles["widget_item-values"]}`}>
//                       <div className={`${styles["widget_item-icon"]}`}>
//                         <img src={item?.image} alt="" />
//                       </div>
//                       <h3 className={`font-bold ${styles["widget_item-title"]}`}>{item?.title}</h3>
//                     </div>
//                   </Col>
//                 ))} 
//               </Row>
//             </div>
//           )}
//         </div>
//       </section>
//     </>
//   );
// };

// export default Home;
