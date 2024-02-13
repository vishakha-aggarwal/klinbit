import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    CLEAR_ERRORS,
} from "../constants/userConstants";
import axios from "axios";
const api = "https://klinbit.vercel.app";

// Login user
export const login = (email, password) => async (dispatch) => {
    try {

        dispatch({ type: LOGIN_REQUEST });
        const config = { method: "POST", headers: { "Content-Type": "application/json"}, withCredentials: 'true', credentials: 'include'};

        const { data } = await axios.post(
            api + "/api/v1/login",
            { email, password },
            config
        );
        dispatch({ 
            type: LOGIN_SUCCESS, 
            payload: data.user 
        });
    } catch (error) {
        dispatch({ 
            type: LOGIN_FAIL, 
            payload: error.response.data.message 
        });
    }
};

// Register user
export const register = (userData) => async (dispatch) => {
    
    console.log(userData.get("name"));
    try {
        dispatch({ type: REGISTER_USER_REQUEST });
        const config = { method: "POST", headers: { "Content-Type": "multipart/form-data"}, withCredentials: 'true', credentials: 'include'};
        const { data } = await axios.post(
            api + "/api/v1/register", 
            userData, 
            config
        );
        dispatch({ 
            type: REGISTER_USER_SUCCESS, 
            payload: data.user 
        });
    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Load the User
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });
        const config = { method: "GET", headers: { "Content-Type": "application/json"}, withCredentials: 'true', credentials: 'include'};
        const { data } = await axios.get(api + "/api/v1/me", config);
    
        dispatch({ 
            type: LOAD_USER_SUCCESS, 
            payload: data.user 
        });
    } catch (error) {
        dispatch({ 
            type: LOAD_USER_FAIL, 
            payload: error.response.data.message 
        });
    }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};

// Logout User
export const logout = () => async (dispatch) => {

    try {
        const config = { method: "GET", headers: { "Content-Type": "application/json" }, withCredentials: 'true', credentials: 'include' };
        await axios.get(api + "/api/v1/logout",config);
        dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
        dispatch({ 
            type: LOGOUT_FAIL, 
            payload: error.response.data.message 
        });
    }
};