import {
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT_SUCCESS
} from "../../action-types/admin/authTypes";
import Axios from "axios";
import { VALIDATION_FAILED } from "../../action-types";

export const login = (email, password) => async dispatch => {
    try {
        const response = await Axios.post("/api/admin/login", {
            email,
            password
        });

        dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data.token
        });

        return true;
    } catch (err) {
        console.error(err.response);

        if (err.response !== undefined) {
            const res = err.response;

            if (err.response.status === 422) {
                const { errors } = res.data;

                dispatch({
                    type: VALIDATION_FAILED,
                    payload: {
                        email: errors.email || [],
                        password: errors.password || []
                    }
                });
            } else if (res.status == 401) {
                dispatch({
                    type: LOGIN_FAILED
                });
            }
        }

        return false;
    }
};

export const logout = () => async dispatch => {
    try {
        const response = await Axios.post("/api/admin/logout");

        dispatch({
            type: LOGOUT_SUCCESS
        });

        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};
