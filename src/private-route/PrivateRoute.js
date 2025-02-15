import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { LineWave } from "react-loader-spinner";
import { verifyToken } from "../redux/slice/userSlice";

const PrivateRoute = () => {
  const user = useSelector((state) => state.userInfo.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(verifyToken(token));
    }
  }, []);
  setTimeout(() => {
    setLoading(false);
  }, 1000);
  if(loading){
    return <div style={{width:'100vw',height:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
      <LineWave  width={200} color="grey"/>
    <h4>Loading.....</h4>
    </div>
  }
  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;