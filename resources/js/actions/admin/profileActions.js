import Axios from "../../services/axios";
import {
    GET_PROFILE,
    UPDATE_PROFILE,
    CLEAR_PROFILE
} from "../../action-types/admin/profileTypes";
import { CLEAR_VALIDATION_ERRORS, VALIDATION_FAILED } from "../../action-types";
import { showToastMessage } from "../toastMessageActions";

/**
 * @returns {Promise<void>}
 */
export const getProfile = () => async dispatch => {
    try {
        const response = await Axios.get("/api/admin/profile");

        const { user } = response.data;

        dispatch({
            type: GET_PROFILE,
            payload: {
                first_name: user.first_name || "",
                last_name: user.last_name || "",
                email: user.email || "",
                group_id: user.group_id || ""
            }
        });
    } catch (err) {
        console.log(err);
    }
};

/**
 * @param {Object} userProfile
 * @returns {Promise<boolean>}
 */
export const updateProfile = userProfile => async dispatch => {
    try {
        const response = await Axios.put("/api/admin/profile", userProfile);

        const { user, message } = response.data;

        dispatch({
            type: UPDATE_PROFILE,
            payload: user
        });

        dispatch(clearErrors());

        dispatch(showToastMessage(message));
    } catch (err) {
        console.log(err);

        const response = err.response;

        if (response && response.status === 422) {
            const { errors } = response.data;

            dispatch({
                type: VALIDATION_FAILED,
                payload: {
                    first_name: errors.first_name || [],
                    last_name: errors.last_name || [],
                    email: errors.email || [],
                    current_password: errors.current_password || [],
                    new_password: errors.new_password || []
                }
            });
        }
    }
};

/**
 * @returns {void}
 */
export const clearProfile = () => dispatch => {
    dispatch({ type: CLEAR_PROFILE });
};

/**
 * @returns {void}
 */
export const clearErrors = () => dispatch => {
    dispatch({ type: CLEAR_VALIDATION_ERRORS });
};
