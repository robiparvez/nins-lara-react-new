import {
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS
} from "../../action-types/admin/authTypes";
import Axios from "../../services/axios";
import { VALIDATION_FAILED } from "../../action-types";
import { clearProfile } from "./profileActions";

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
        const response = err.response;

        if (response && response.status === 422) {
            const { errors } = response.data;

            dispatch({
                type: VALIDATION_FAILED,
                payload: {
                    email: errors.email || [],
                    password: errors.password || []
                }
            });
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

        return logoutAnyWay(dispatch);
    } catch (err) {
        const response = err.response;

        if (response && response.status == 401) {
            //token was expired so we still want to log the
            //user out by deleting the token.
            return logoutAnyWay(dispatch);
        }

        return false;
    }
};

/**
 * Dispatch logout and clearProfile actions.
 *
 * @param {import("redux").Dispatch} dispatch
 * @return {boolean|true}
 */
const logoutAnyWay = dispatch => {
    dispatch(clearProfile());
    dispatch({ type: LOGOUT_SUCCESS });

    return true;
};
