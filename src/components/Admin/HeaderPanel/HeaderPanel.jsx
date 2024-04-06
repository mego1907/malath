import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./style.module.scss";
import { Badge, Dropdown , Image } from "antd";
import { FaBars, FaBell } from "react-icons/fa";
import user from '../../../assets/images/user.png'

const HeaderPanel = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const Logout = ()=>{
    localStorage.removeItem('user')
    navigate("/login");
    window.location.reload()
  }
  const items = [
    {
      label: <a onClick={()=>{Logout()}}>تسجيل الخروج</a>,
      key: '0',
    },
  ];

  const ss = ()=>{
    props.collaps(!props?.collapsed)
  }
  return (
    <div className={`${styles["header-panel"]}`}>
      <h3 className="font-bold">
        {location.pathname === "/admin/sessions"
          ? "الحجوزات"
          : location.pathname === "/admin/adviser/users"
          ? "المستشارين"
          : location.pathname === "/admin/beneficiary/users"
          ? "المستفيدين"
          : location.pathname === "/admin/sessions"
          ? "الحجوزات"
          : location.pathname === "/admin/wallet"
          ? "المحفظة"
          : location.pathname === "/admin/notifications"
          ? "الإشعارات"
          : location.pathname === "/admin/notifications/create"
          ? "الإشعارات"
          : location.pathname === "/admin/blogs"
          ? "المقالات"
          : location.pathname === "/admin/blogs/create"
          ? "المقالات"
          : location.pathname === "/admin/social-media"
          ? "معلومات التواصل"
          : location.pathname === "/admin/social-media/create"
          ? "معلومات التواصل"
          : location.pathname === "/admin/social-media/:id/edit"
          ? "معلومات التواصل"
          : location.pathname === "/admin/faq"
          ? "الأسئلة المقترحة"
          : location.pathname === "/admin/page/about"
          ? "الأسئلة المقترحة"
          : location.pathname === "/admin/page/about/create"
          ? "من نحن"
          : location.pathname === "/admin/page/policy"
          ? "سياسة الخصوصية"
          : location.pathname === "/admin/page/terms"
          ? "الشروط والاحكام"
          : location.pathname === "/admin/page/cancel-policy"
          ? "سياسة إلغاء الجلسة "
          : location.pathname === "/admin/user-activation"
          ? "طلبات التفعيل "
          : location.pathname === "/admin/messages"
          ? "الرسائل"
          : location.pathname === "/admin/assistant-counselor"
          ? "المستشار المساعد"
          : location.pathname === "/admin/fields"
          ? "مجالات العمل"
          : location.pathname === "/admin/comments"
          ? "التعليقات"
          : location.pathname === "/session-price"
          ? "سعر الجلسة"
          : location.pathname === "/admin/financial"
          ? "الحركات المالية "
          : location.pathname === "/admin/users-activity"
          ? "نشاط المستخدمين "
          : null}
      </h3>
      <div className={`${styles["header-tolpar"]}`}>
        <div onClick={()=>ss()} className="ml-10 menu-bar"><FaBars /></div>
        {/* <Badge className="ml-10" size="small"  count={5}> */}
        <Badge className="ml-10" size="small" >
          <Link to="admin/notifications"><FaBell /></Link>
        </Badge>
        <Dropdown
          menu={{
            items,
          }}
          trigger={['click']}
        >
          <div onClick={(e) => e.preventDefault()}>
             <Image preview={false} src={user} width={30} />
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default HeaderPanel;
