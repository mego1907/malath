import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { FaPhoneAlt, FaRegEnvelope } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import styles from './style.module.scss';
import { YoutubeIcon, FacebookIcon, TwitterIcon, LinkedInIcon, InstagramIcon } from "./../../../icons/social"
import MessageIcon from "../../../icons/MessageIcon";
import CallingIcon from "../../../icons/CallingIcon";
import { getSections } from "../../../store/Website/actions/home";
import i18next from "i18next";

const Footer = () => {
  const dispatch = useDispatch();

  const [dataFooter, setDataFooter] = useState();
  const [dataSocials, setDataSocials] = useState();

  const { dataSections } = useSelector((state) => state.sections);


  useEffect(() => {
    dataSections?.sections?.filter((item) => {
      if (item.name === "footer") {
        setDataFooter(item);
      } 
    });
  }, [dataSections]);

  const socialMedia = [
    {
      name: "Youtube",
      icon: <YoutubeIcon />,
      link: "",
    },
    {
      name: "Facebook",
      icon: <FacebookIcon />,
      link: "",
    },
    {
      name: "Twitter",
      icon: <TwitterIcon />,
      link: "",
    },
    {
      name: "LinkedIn",
      icon: <LinkedInIcon />,
      link: "",
    },
    {
      name: "Intagram",
      icon: <InstagramIcon />,
      link: "",
    },
  ]



  return (
    <div className="bg-primary-500">
      <div className="home-container">
        <div className="flex md:flex-row flex-col justify-between items-center py-12">
          {/* Logo */}
          <div>
            <img src={dataFooter?.image} alt="" className="md:w-auto w-36 md:mb-0 mb-8" />
          </div>

          {/* Contact */}
          <div className="flex flex-col md:mb-0 mb-8">
            <h3 className="text-white font-bold text-xl mb-5">{dataFooter?.subtitle}</h3>

            <div className="flex flex-col gap-4 text-white">
              {
                dataFooter?.items?.slice(0, 2).map((item) => (
                  <a href="#" className="flex items-center gap-2 hover:text-white ">
                    <span>
                      {item.name === "email" ? <MessageIcon /> : <CallingIcon />}
                    </span>
                    <span className="underline">{item.title}</span>
                  </a>
                ))
              }
              {/* <a href="#" className="flex items-center gap-2">
                <span>
                  <MessageIcon />
                </span>
                <span className="underline">info@malathapp.com</span>
              </a>
              <a href="#" className="flex items-center gap-2">
                <span>
                  <CallingIcon />
                </span>
                <span className="underline">+96176784240</span>
              </a> */}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-5">Follow Us</h3>

            <div className="flex gap-4 items-center">
              {
                dataSections?.socials.map(({ name, image, url }) => (
                  // <a href={link} key={name}>{icon}</a>
                  <a href={url} key={name} target="_blank" rel="noreferrer">
                    <img src={image} alt={name} className="w-8" />
                  </a>
                ))
              }
            </div>
          </div>
        </div>

        <div className="text-center border-t-2 border-white">
          <p className="text-white p-5">All rights reserved to Malath APP 2024</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;



// import { Col, Row } from "antd";
// import React, { useEffect, useState } from "react";
// import { FaPhoneAlt, FaRegEnvelope } from "react-icons/fa";
// import { useSelector } from "react-redux";
// import styles from './style.module.scss';

// const Footer = () => {

//   const [dataFooter, setDataFooter] = useState();

//   const {dataSections } = useSelector((state) => state.sections);


//   useEffect(() => {
//     dataSections?.sections?.filter(function (item) {
//       if (item.name === "footer") {
//         setDataFooter(item);
//       }
//     });

//   }, [dataSections]);
//   return (
//     <div className={`${styles["main-footer"]}`}>
//       <div className="home-container">
//         <Row justify="space-between" align="middle">
//           <Col lg={6}>
//             <h5 className="text-white mb-20">{dataFooter?.subtitle}</h5>
//             <ul className={`d-flex align-items-center ${styles["social-media"]}`}>
//               {dataSections?.socials.map((item,index)=>(
//                 <li key={index}>
//                   <a href={item.url} target="_blank"><img src={item.image} alt={item.name} /></a>
//                 </li>
//               ))}
//             </ul>
//           </Col>
//           <Col lg={6}>
//             <ul>
//               {dataFooter?.items?.map((item,index)=>(
//                 <li key={index}>
//                   {item.name ==='phone' ? <a className={`text-white ${styles["footer-link"]}`} href={`tel:${item.title}`}><FaPhoneAlt  />{item.title}</a> : null}
//                   {item.name ==='email' ? <a className={`text-white ${styles["footer-link"]}`} href={`mailto:${item.title}`}><FaRegEnvelope  />{item.title}</a> : null}
//                 </li>
//               ))}
//             </ul>
//           </Col>
//           <Col span={8} lg={4} className={`${styles["logo"]}`}>
//             <div className="text-center">
//               <img src={dataFooter?.image} alt="" />
//             </div>
//           </Col>
//         </Row>
//       </div>
//     </div>
//   );
// };

// export default Footer;
