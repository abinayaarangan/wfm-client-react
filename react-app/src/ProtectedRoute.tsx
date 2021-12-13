import React from "react";
import { Route, Redirect } from "react-router-dom";
// import MangerHOC from "./Redux/HOC/MangerHOC";
import ManagerHOC from "./Redux/HOC/ManagerHOC";
import WFM_ManagerHOC from "./Redux/HOC/WFM_ManagerHOC";
// import WFMHome from "./WFM/Home";



const ProtectedRoute = ({ children, ...rest }:any) => {
  const token= localStorage.getItem("token");
const usertype =  localStorage.getItem("usertype")
  return (
    <Route
      {...rest}
      render={({ location }) =>
        token? usertype==="manager"?(
          <ManagerHOC/>
        ):(<WFM_ManagerHOC/>) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};
export default ProtectedRoute;
