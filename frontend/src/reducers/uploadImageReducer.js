import {
    UPLOAD_IMAGE_REQUEST,
    UPLOAD_IMAGE_SUCCESS,
    UPLOAD_IMAGE_FAIL,
    CLEAR_ERRORS,
} from "../constants/uploadImageConstants";

export const imageReducer = (state = { image: {} }, action) => {
    switch (action.type) {
        case UPLOAD_IMAGE_REQUEST:
            return {
                loading: true
            };
        case UPLOAD_IMAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload,
            };

        case UPLOAD_IMAGE_FAIL:
            return {
                ...state,
                loading: false,
                message: null,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};