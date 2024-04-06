import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  let auth = JSON.parse(localStorage.getItem("user"));
  return (
    // auth?.api_token ? <Outlet/> : <Navigate to="/login"/>

    !auth  ? (
      <Navigate to="/admin/login" />
    ) : (
      <Outlet />
    )
  );
};

export default PrivateRoutes;
