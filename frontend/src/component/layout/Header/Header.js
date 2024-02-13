import React, { useState } from "react";
import Logo from "../../../Images/logo.png";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GrLogout } from "react-icons/gr";
import {logout} from '../../../actions/userAction'
import { ToastContainer, toast } from "react-toastify";

const Header = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-center",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
}; 
  function logoutUser() {
    dispatch(logout());
    toast.success("Logout Successfully", toastOptions);
    <ToastContainer />
    navigate("/");
  }

  return (
    <div className="headerCont">
      <img src={Logo} alt="logo" className="logoImg" />
      {isAuthenticated && <div className="navBar">
        <Link to="/uploadImage">
          <div className="options">Upload Image</div>
        </Link>
        <Link to="/">
          <GrLogout onClick={logoutUser}/>
        </Link>
        </div>
      }
    </div>
  );
};

export default Header;
