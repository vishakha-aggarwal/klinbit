import React, { Fragment, useRef, useState, useEffect } from "react";
import "./LoginSignup.css";
import Loader from "../layout/Loader/Loader";
import { Link, useLocation } from "react-router-dom";
import {AiOutlineMail, AiFillUnlock} from 'react-icons/ai';
import {CgProfile} from 'react-icons/cg'
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Image from "../../Images/image1.jpg"

const LoginSignup = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const toastOptions = {
        position: "bottom-center",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };    

    const dispatch = useDispatch();
    const { error, loading, isAuthenticated } = useSelector((state) => state.user);

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const { name, email, password } = user;

    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword));
    };

    const registerSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.append("name", name);
        myForm.append("email", email);
        myForm.append("password", password);
        console.log(myForm.get("name"));
        console.log(myForm.keys());
        dispatch(register(myForm));
    };

    const registerDataChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const redirect = location.search ? location.search.split("=")[1] : "/uploadImage";
    
    useEffect(() => {

        if(error) {
            toast.error(error, toastOptions);
            <ToastContainer />
            return;
        }

        if (isAuthenticated) 
            navigate(redirect);
        
    }, [dispatch, error, isAuthenticated, navigate]);

    const switchTabs = (e, tab) => {

        if (tab === "login") {

            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if (tab === "register") {

            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    };

    return (
        <Fragment>
        {loading ? <Loader />: (
        <Fragment>
            <div style={{display: "flex"}}>
                <div className="uploadImage" style={{width: "40%"}}>
                    <img src={Image} alt="Image" style={{height: "100%", width: "auto"}}/>
                </div>
                <div className="LoginSignUpContainer">
                    <div className="LoginSignUpBox">
                        <div>
                            <div className="login_signUp_toggle">
                                <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                                <p onClick={(e) => switchTabs(e, "register")}>SIGN UP</p>
                            </div>
                            <button ref={switcherTab}></button>
                        </div>
                        <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                            <div className="loginEmail">
                                <AiOutlineMail />
                                <input type="email" placeholder="Email" required value={loginEmail}  onChange={(e) => setLoginEmail(e.target.value)} />
                            </div>
                            <div className="loginPassword">
                                <AiFillUnlock />
                                <input type="password" placeholder="Password" required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                            </div>
                            <input type="submit" value="Login" className="loginBtn" />
                        </form>
                        <form
                            className="signUpForm" ref={registerTab} onSubmit={registerSubmit} >
                            <div className="signUpName">
                                <CgProfile />
                                <input type="text" placeholder="Name" required name="name" value={name} onChange={registerDataChange} />
                            </div>
                            <div className="signUpEmail">
                                <AiOutlineMail />
                                <input type="email" placeholder="Email" required name="email"  value={email} onChange={registerDataChange} />
                            </div>
                            <div className="signUpPassword">
                                <AiFillUnlock />
                                <input type="password" placeholder="Password" required name="password" value={password} onChange={registerDataChange} />
                            </div>
                            <input type="submit" value="Register" className="signUpBtn" />
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </Fragment>
        )}
    </Fragment>
    );
};

export default LoginSignup;