import "antd/dist/reset.css";
import Layout from "./components/Website/Layout/Layout";
import LayoutAdmin from "./components/Admin/Layout/Layout";
import "./assets/styles/main.scss";
import { ConfigProvider } from "antd";
import { useEffect } from "react";
import { socketConnection } from "./socketConnection";
import "./index.css"

function App() {
  useEffect(() => {
    if(localStorage.getItem("user")){
      socketConnection();
    }
  }, []);

  return (
    <ConfigProvider
      direction="rtl"
      theme={{
        token: {
          colorPrimary: "#523F94",
          fontFamily: "Tajawal",
        },
      }}
    >
      {window.location.toString().includes("admin") &&
      localStorage.getItem("user") ? (
        <LayoutAdmin />
      ) : (
        <Layout />
      )}
      {/* {HomeRoute.includes(pathname) &&  <Layout />}
        {!HomeRoute.includes(pathname) &&  <LayoutAdmin />} */}
    </ConfigProvider>
  );
}

export default App;
