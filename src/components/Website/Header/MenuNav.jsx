import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
// import { Link } from "react-scroll";
import styles from './style.module.scss';
import { Link, useLocation } from "react-router-dom";

const MenuNav = () => {
  const { t } = useTranslation();
  const [elemId, setElemId] = useState()
  let location = useLocation();
  useEffect(() => {
    if (location.hash) {
      let elem = document.getElementById(location.hash.slice(1));
      if (elem) {
        setElemId(elem.id)
        elem.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [location]);

  return (
    <ul className={`${styles["menu-nav"]}`}>
      <li>
        <Link className={elemId === "section-ouradvisers" ? 'active' : null} to="/#section-ouradvisers" >
          {t('ouradvisers')}
        </Link>
      </li>
      <li>
        <Link className={elemId === "section-about" ? 'active' : null} to="/#section-about">
          {t('about')}
        </Link>
      </li>
      <li>
        <Link className={elemId === "section-store" ? 'active' : null} to="/#section-store">
          {t('join')}
        </Link>
      </li>
    </ul>
  );
};

export default MenuNav;



// import React, { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// // import { Link } from "react-scroll";
// import styles from './style.module.scss';
// import { Link, useLocation } from "react-router-dom";

// const MenuNav = () => {
//   const { t } = useTranslation();
//   const [elemId , setElemId] = useState()
//   let location = useLocation();
//   useEffect(() => {
//     if (location.hash) {
//       let elem = document.getElementById(location.hash.slice(1));
//       if (elem) {
//         setElemId(elem.id)
//         elem.scrollIntoView({ behavior: "smooth" });
//       }
//     } else {
//       window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
//     }
//   }, [location]);

//   return (
//     <ul className={`${styles["menu-nav"]}`}>
//       <li>
//         <Link className={elemId === "section-ouradvisers" ? 'active' : null}  to="/#section-ouradvisers" >
//            {t('ouradvisers')}
//         </Link>
//       </li>
//       <li>
//         <Link className={elemId === "section-about" ? 'active' : null} to="/#section-about">
//          {t('about')}
//         </Link>
//       </li>
//       <li>
//         <Link className={elemId === "section-store" ? 'active' : null} to="/#section-store">
//         {t('join')}
//         </Link>
//       </li>
//     </ul>
//   );
// };

// export default MenuNav;
