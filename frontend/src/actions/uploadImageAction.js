import {
    UPLOAD_IMAGE_REQUEST,
    UPLOAD_IMAGE_SUCCESS,
    UPLOAD_IMAGE_FAIL,
    LOAD_IMAGE_REQUEST,
    LOAD_IMAGE_SUCCESS,
    LOAD_IMAGE_FAIL,
    CLEAR_ERRORS,
} from "../constants/uploadImageConstants";
import axios from "axios";
const api = "http://localhost:5000";

// uploadImage
export const uploadImage = (inputData) => async (dispatch) => {
    
    console.log(inputData.get("username"));
    console.log(inputData.get("image"));
    try {
        dispatch({ type: UPLOAD_IMAGE_REQUEST });
        const config = { method: "POST", headers: { "Content-Type": "multipart/form-data"}, withCredentials: 'true', credentials: 'include'};
        const { data } = await axios.post(
            api + "/api/v1/uploadImage", 
            inputData, 
            config
        );
        dispatch({ 
            type: UPLOAD_IMAGE_SUCCESS, 
            payload: data.message 
        });
    } catch (error) {
        dispatch({
            type: UPLOAD_IMAGE_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};