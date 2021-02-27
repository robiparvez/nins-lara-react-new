import {
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT_SUCCESS
} from "../../action-types/admin/authTypes";
import { VALIDATION_FAILED } from "../../action-types";
import Axios from "../../services/axios";

const initialState = {
    token: localStorage.getItem("token"),
    errors: {
        email: [],
        password: []
    }
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case LOGIN_SUCCESS: {
            localStorage.setItem("token", payload);
            Axios.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${payload}`;

            return {
                ...state,
                token: payload
            };
        }
        case LOGOUT_SUCCESS: {
            localStorage.removeItem("token");
            delete Axios.defaults.headers.common["Authorization"];

            return {
                ...state,
                token: null
            };
        }
        case VALIDATION_FAILED: {
            return {
                ...state,
                errors: {
                    email: payload.email,
                    password: payload.password
                }
            };
        }
        default:
            return state;
    }
};
