import React , { useState } from "react";
import { Layout } from 'antd';

import { FaTimes } from "react-icons/fa";

import logo from '../../../assets/images/logo.png';
import MenuApp from "../Menu/Menu";
import Routes from "../../../routes/Routers";
import HeaderPanel from "../HeaderPanel/HeaderPanel";
import { Helmet } from "react-helmet";
const LayoutAdmin = () => {
  
  const [collapsed, setCollapsed] = useState(false);
  const { Sider, Content } = Layout;

  const collaps = ()=> {
    setCollapsed(!collapsed)
  }

  return (
    <>
    <Helmet>
        <title> Malath </title>
    </Helmet>
    <div className="app-admin">
      <Layout hasSider>
        {collapsed ? <div onClick={() => setCollapsed(!collapsed)} className="overlay-page"></div>:null}
        <Sider width={250} trigger={null} collapsible collapsed={collapsed} style={{
            background: '#FFF',
            position: 'fixed',
            right: 0,
            top: 0,
            bottom: 0,
            }}>
          <div className="menu-bar mt-10 mr-10" onClick={() => setCollapsed(!collapsed)}><FaTimes /></div>
          <div className="logo text-center mt-20 mb-20" ><img src={logo} alt="logo" /></div>
          <MenuApp collapsed={collapsed} />
        </Sider>
        <Layout className="site-layout"  style={{backgroundColor:"#E3DEF3" }}>
          <HeaderPanel collaps={collaps} />
          <Content
            style={{
              padding: 24,
              minHeight: 280,
            }}
            >
            <Routes />
          </Content>
        </Layout>
      </Layout>
    </div>
    </>

  );
};

export default LayoutAdmin;
