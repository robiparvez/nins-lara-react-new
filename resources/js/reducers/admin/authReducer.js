import {
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT_SUCCESS
} from "../../action-types/admin/authTypes";
import { VALIDATION_FAILED } from "../../action-types";

const initialState = {
    user: {
        id: "",
        name: "",
        email: ""
    },
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
            window.axios.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${payload}`;

            return {
                ...state,
                token: payload
            };
        }
        case LOGIN_FAILED:
        case LOGOUT_SUCCESS: {
            localStorage.removeItem("token");
            delete window.axios.defaults.headers.common["Authorization"];

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
