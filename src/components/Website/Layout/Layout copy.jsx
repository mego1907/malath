import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import Routes from "../../../routes/Routers";
import { useLocation } from "react-router-dom";
const Layout = () => {
  const location = useLocation()
  return (
    <div className="app">
      {location.pathname != '/admin/login' ? <Header /> : null }
      <Routes />
      {location.pathname != '/Footer' ? <Header /> : null }
    </div>
  );
};

export default Layout;
