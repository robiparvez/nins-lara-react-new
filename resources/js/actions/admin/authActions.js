import {
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT_SUCCESS
} from "../../action-types/admin/authTypes";
import Axios from "axios";
import { VALIDATION_FAILED } from "../../action-types";

/**
 * @param {string} email
 * @param {string} password
 * @returns {Promise<boolean>}
 */
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

/**
 * @returns {Promise<boolean>}
 */
export const logout = () => async dispatch => {
    try {
        await Axios.post("/api/admin/logout");

        dispatch({
            type: LOGOUT_SUCCESS
        });

        return true;
    } catch (err) {
        //token was expired so we still want to log the
        //user out.
        if (err.response && err.response.status == 401) {
            dispatch({
                type: LOGOUT_SUCCESS
            });
            return true;
        }

        return false;
    }
};
