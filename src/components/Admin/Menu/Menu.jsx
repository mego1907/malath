import { Menu } from 'antd'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import {
  FaAddressCard,
  FaBell,
  FaChartBar,
  FaCog,
  FaCommentDots,
  FaEnvelope,
  FaFileAlt,
  FaPercentage,
  FaQuestionCircle,
  FaShoppingBag,
  FaUserEdit,
  FaUsers,
  FaVideo,
  FaWallet,
} from "react-icons/fa";

const MenuApp = (props) => {
  
  return (
    <Menu  mode="inline">
      {/* <Menu.Item>
        <Link to="/">
          <span className="nav-text">لوحة التحكــم</span>
        </Link>
      </Menu.Item> */}
      <Menu.Item>
        <Link to="/admin/dashboard">
          <span className='nav-icon'><FaChartBar /></span> <span className="nav-text">لوحة التحكــم</span>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/admin/adviser/users">
          <span className='nav-icon'><FaUsers /></span> <span className="nav-text">المستشارين</span>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/admin/beneficiary/users">
          <span className='nav-icon'><FaUsers /></span> <span className="nav-text">المستفيدين</span>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/admin/users-activity">
          <span className='nav-icon'><FaUsers /></span> <span className="nav-text">نشاط المستخدمين</span>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/admin/session-price">
          <span className='nav-icon'><FaUsers /></span> <span className="nav-text">سعر الجلسة</span>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/admin/coupons">
          <span className='nav-icon'><FaPercentage /></span> <span className="nav-text">كوبونات الخصم</span>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/admin/assistant-counselor">
          <span className='nav-icon'><FaUsers /></span> <span className="nav-text">المستشار المساعد</span>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/admin/messages">
          <span className='nav-icon'><FaCommentDots /></span> <span className="nav-text">الرسائل</span>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/admin/sessions">
          <span className='nav-icon'><FaAddressCard /></span> <span className="nav-text">الحجوزات</span>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/admin/lectures">
          <span className='nav-icon'><FaVideo /></span> <span className="nav-text">المحاضرات المجانية</span>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/admin/wallet">
        <span className='nav-icon'><FaWallet /></span>  <span className="nav-text">المحفظة</span>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/admin/financial">
          <span className='nav-icon'><FaWallet /></span>  <span className="nav-text">الحركات المالية</span>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/admin/user-activation">
        <span className='nav-icon'><FaUserEdit /></span>  <span className="nav-text">طلبات التفعيل</span>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/admin/comments">
        <span className='nav-icon'><FaUserEdit /></span>  <span className="nav-text">التعليقات</span>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/admin/notifications">
          <span className='nav-icon'><FaBell /></span>  <span className="nav-text">الإشعارات</span>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/admin/fields">
          <span className='nav-icon'><FaShoppingBag /></span>  <span className="nav-text">مجالات العمل</span>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/admin/management/users">
          <span className='nav-icon'><FaCog /></span>  <span className="nav-text">الإدارة </span>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/admin/social-media">
          <span className='nav-icon'><FaEnvelope /></span>  <span className="nav-text">معلومات التواصل</span>
        </Link>
      </Menu.Item>
      {/* <Menu.Item>
        <NavLink to="/admin/blogs">
          <span className='nav-icon'><FaClone /></span> <span className="nav-text">المقالات</span>
        </NavLink>
      </Menu.Item> */}
      <Menu.Item>
        <NavLink to="/admin/faq">
          <span className='nav-icon'><FaQuestionCircle /></span> <span className="nav-text">الأسئلة المقترحة</span>
        </NavLink>
      </Menu.Item>
      <Menu.SubMenu icon={<FaFileAlt />} title="الصفحات التعريفية">
        {/* <Menu.Item>
          <NavLink to="/admin/page/about">
            <span className="nav-text">من نحن</span>
          </NavLink>
        </Menu.Item> */}
        <Menu.Item>
          <NavLink to="/admin/page/policy">
            <span className="nav-text">سياسة الخصوصية</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink to="/admin/page/terms">
            <span className="nav-text">الشروط والأحكام</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink to="/admin/page/cancel-policy">
            <span className="nav-text">سياسة إلغاء الجلسة</span>
          </NavLink>
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
    // <Menu
    // mode="inline"
    // defaultSelectedKeys={['1']}
    // items={[
    //     {
    //     key: '1',
    //     icon: <Fa500Px />,
    //     label: 'لوحة التحكــم',
    //     },
    //     {
    //     key: '2',
    //     icon: <Fa500Px />,
    //     label: 'المستشارين',
    //     },
    //     {
    //     key: '3',
    //     icon: <Fa500Px />,
    //     label: 'المستفيدين',
    //     },
    //     {
    //     key: '3',
    //     icon: <Fa500Px />,
    //     label: 'المستشار المساعد',
    //     },
    //     {
    //     key: '3',
    //     icon: <Fa500Px />,
    //     label: 'الحجوزات',
    //     },
    //     {
    //     key: '3',
    //     icon: <Fa500Px />,
    //     label: 'الحجوزات',
    //     },
    //     {
    //     key: '3',
    //     icon: <Fa500Px />,
    //     label: 'الحجوزات',
    //     },
    //     {
    //     key: '3',
    //     icon: <Fa500Px />,
    //     label: 'الحجوزات',
    //     },
    // ]}
    // />
  )
}

export default MenuApp