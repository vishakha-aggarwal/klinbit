import "./App.css"
import Header from "./component/layout/Header/Header"
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
import React, { useEffect } from 'react'
import webFont from "webfontloader"
import Footer from "./component/layout/Footer/Footer"
import LoginSignup from './component/User/LoginSignup'
import UploadImage from "./component/UploadImage/UploadImage.js"
import store from './store.js'
import { loadUser } from "./actions/userAction"
import { useSelector } from "react-redux"
import { useState } from "react"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  const toastOptions = {
    position: "bottom-center",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  }; 

  useEffect(() =>{
    webFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      }
    })
    store.dispatch(loadUser());
  }, [])

  function RequireAuth({children, redirectTo }) {
    const { loading, isAuthenticated, user } = useSelector((state) => state.user);
    if(loading === false)
    {
      if(isAuthenticated===false)
        return <Navigate to={redirectTo} />
      return children;
    }
  }

  return <Router>
    <Header />
    <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/login" element={<LoginSignup />} /> 
        <Route path="/uploadImage" element={<RequireAuth redirectTo = "/" children={<UploadImage />} ></RequireAuth > } />
    </Routes>
    <ToastContainer />
    <Footer />
  </Router>
}

export default App