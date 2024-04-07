import { Col, Drawer, Dropdown, Row } from "antd";
import React, { useEffect, useState } from "react";
import MenuNav from "./MenuNav";
import logo from "../../../assets/images/logo.png";
import earth from "../../../assets/images/earth.png";
import styles from "./style.module.scss";
import i18next from "i18next";
import { getSections } from "../../../store/Website/actions/home";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import NavLogo from "../../../icons/NavLogo";
import LangIcon from "../../../icons/LangIcon";
import { MdArrowDropDown } from "react-icons/md";
import LanguageIcon from "../../../icons/LanguageIcon";
import { IoIosArrowDown } from "react-icons/io";


const Login = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [state, setState] = useState(false);
  const [openSidebarLinks, setOpenSidebarLinks] = useState(false);

  const { dataSections, loading } = useSelector(
    (state) => state.sections
  );



  const [currentLang, setCurrentLang] = useState();
  function handleClick(lang) {
    i18next.changeLanguage(lang);

    if (localStorage.getItem("i18nextLng") === "en") {
      document.documentElement.setAttribute("dir", "ltr");
      setCurrentLang("en");
    } else {
      document.documentElement.setAttribute("dir", "rtl");
      setCurrentLang("ar");
    }
  }

  useEffect(() => {
    if (i18next.language === 'ar') {
      document.documentElement.setAttribute("dir", "rtl");
      setCurrentLang("ar");
    } else {
      document.documentElement.setAttribute("dir", "ltr");
      i18next.changeLanguage("en");
      setCurrentLang("en");
    }
  }, []);



  useEffect(() => {
    dispatch(getSections({ params: { language: currentLang } }));
  }, [dispatch, currentLang])





  return (
    <div className="bg-white w-full fixed h-[111px] top-0 flex items-center left-0 z-50 ">
      <div className="home-container relative">

        <Dropdown
          className="md:translate-x-0 -translate-x-10 z-50"
          menu={{
            items: [
              {
                key: '1',
                label: (
                  <span onClick={() => handleClick("ar")}>
                    Arabic
                  </span>
                ),
              },
              {
                key: '2',
                label: (
                  <span onClick={() => handleClick("en")}>
                    English
                    </span>
                ),
              }
            ]
          }}
          arrow
        >
          <button type="button" className="absolute right-4 translate-y-1/2 flex items-center justify-center gap-2 border rounded-full p-2 border-dark-8">
            <LanguageIcon />
            <IoIosArrowDown />
          </button>
        </Dropdown>
        
        
        <div className="flex px-4 md:px-0 md:justify-center justify-between items-center md:gap-16 gap-4">
          <div className="md:flex hidden md:gap-16 gap-4">
            <a href="#our-consultants" className="lg:text-2xl text-xl font-bold">Our Consultants</a>
            <a href="#about-us" className="lg:text-2xl text-xl font-bold">About Us</a>
          </div>

          <div className="relative flex items-center justify-center z-50">
            <Link to="/">
              <img src={dataSections?.logo} alt="" className="w-[63px] " />
            </Link>
            {/* <NavLogo /> */}
          </div>

          <div className="md:flex hidden md:gap-16 gap-4">
            <a href="#join-us" className="lg:text-2xl text-xl font-bold">Join US</a>
            <Link to="/blog" className="lg:text-2xl text-xl font-bold">Blog</Link>
          </div>

          <button 
            type="button" 
            className="flex flex-col gap-2 absolute right-2 z-50 md:hidden" 
            onClick={() => setOpenSidebarLinks(!openSidebarLinks)}
          >
            <span className="w-8 h-0.5 bg-black"></span>
            <span className="w-8 h-0.5 bg-black"></span>
            <span className="w-8 h-0.5 bg-black"></span>
          </button>
        </div>

        {/* Mobile Links */}
        <div 
          className={`md:hidden flex fixed justify-center text-center gap-8 flex-col ${openSidebarLinks ? "left-0" : "-left-full"} top-0 bg-white w-full h-screen transition-all`}
        >
            <Link to={"/our-consultants"}>
              <span className="text-xl font-bold">Our Consultants</span>
            </Link>
            <Link to={"/about-us"}>
              <span className="text-xl font-bold">About Us</span>
            </Link>
            <Link to={"/about-us"}>
            <span className="text-xl font-bold">Join US</span>
            </Link>
            <Link to={"/about-us"}>
            <span className="text-xl font-bold">Blog</span>
            </Link>
          </div>

      </div>
    </div>
  );
};

export default Login;



// import { Col, Drawer, Row } from "antd";
// import React, { useEffect, useState } from "react";
// import MenuNav from "./MenuNav";
// import logo from "../../../assets/images/logo.png";
// import earth from "../../../assets/images/earth.png";
// import styles from "./style.module.scss";
// import i18next from "i18next";
// import { getSections } from "../../../store/Website/actions/home";
// import { useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import { useTranslation } from "react-i18next";

// const Login = () => {
//   const dispatch = useDispatch();
//   const { t } = useTranslation();
//   const [state, setState] = useState(false);
//   const showDrawer = () => {
//     setState(!state);
//   };
//   const onClose = () => {
//     setState(false);
//   };

//   const [currentLang, setCurrentLang] = useState();
//   function handleClick(lang) {
//     i18next.changeLanguage(lang);
    
//     if (localStorage.getItem("i18nextLng") === "en") {
//       document.documentElement.setAttribute("dir", "ltr");
//       setCurrentLang("en");
//     } else {
//       document.documentElement.setAttribute("dir", "rtl");
//       setCurrentLang("ar");
//     }
//   }

//   useEffect(() => {
//     if (i18next.language === 'ar') {
//       document.documentElement.setAttribute("dir", "rtl");
//       setCurrentLang("ar");
//     } else {
//       document.documentElement.setAttribute("dir", "ltr");
//       i18next.changeLanguage("en");
//       setCurrentLang("en");
//     }
//   }, []);
//   // useEffect(() => {
//   //   if (
//   //     localStorage.getItem("i18nextLng") === "en-US" ||
//   //     localStorage.getItem("i18nextLng") === "en"
//   //   ) {
//   //     i18next.changeLanguage("ar");
//   //     localStorage.setItem("i18nextLng", "ar");
//   //     document.documentElement.setAttribute("dir", "rtl");
//   //     setCurrentLang("ar");
//   //   } else {
//   //     document.documentElement.setAttribute("dir", "ltr");
//   //     i18next.changeLanguage("en");
//   //     setCurrentLang("en");
//   //   }
//   // }, []);

//   useEffect(() => {
//     if (currentLang) {
//       dispatch(
//         getSections({
//           params: {
//             language: currentLang,
//           },
//         })
//       );
//     }
//   }, [dispatch, currentLang]);

//   return (
//     <div className={`${styles["main-header"]}`}>
//       <div className="container">
//         <Row align="middle" justify="space-between">
//           <Col span={3}>
//             <Link to="/">
//               <img src={logo} alt="" className={`${styles["logo"]}`} />
//             </Link>
//           </Col>
//           <Col span={16} className={`${styles["menu"]}`}>
//             <MenuNav />
//           </Col>
//           <Col className={`${styles["flex-auto"]}`}>
//             <div className="d-flex align-items-center">
//               <a href="https://malathapp.com/blog" className="btn btn-primary">{t('blog')}</a>
//               {currentLang === "ar" ? (
//                 <button
//                   className={`${styles["btn-lang"]}`}
//                   onClick={() => handleClick("en")}
//                   value="en"
//                 >
//                   <img src={earth} className="ml-6" alt="" /> English
//                 </button>
//               ) : (
//                 <button
//                   className={`${styles["btn-lang"]}`}
//                   onClick={() => handleClick("ar")}
//                   value="ar"
//                 >
//                   <img src={earth} className="ml-6" alt="" /> العربية
//                 </button>
//               )}
//             </div>
//           </Col>
//           <Col span={3} className={`${styles["menu-mobile"]}`}>
//             <div className="menuCon">
//               <div className="barsMenu" onClick={showDrawer}>
//                 <span className={`${styles["barsBtn"]}`}></span>
//               </div>
//               <Drawer
//                 width={250}
//                 title={false}
//                 placement="right"
//                 closable={false}
//                 onClose={onClose}
//                 visible={state}
//               >
//                 <div
//                   onClick={showDrawer}
//                   className={`${styles["close"]}`}
//                 ></div>
//                 <div className="mt-30">
//                   <MenuNav />
//                 </div>
//               </Drawer>
//             </div>
//           </Col>
//         </Row>
//       </div>
//     </div>
//   );
// };

// export default Login;
