import {
    HIDE_TOAST_MESSAGE,
    SHOW_TOAST_MESSAGE
} from "../action-types/toastMessageTypes";

/**
 * @param {string} message
 * @param {string|"default"} type
 * @param {boolean|true} autoHide
 * @param {string|null} vertical
 * @param {string|null} horizontal
 * @returns {void}
 */
export const showToastMessage = (
    message,
    type = "default",
    autoHide = true,
    vertical = null,
    horizontal = null
) => dispatch => {
    dispatch({
        type: SHOW_TOAST_MESSAGE,
        payload: {
            message,
            type,
            autoHide,
            vertical,
            horizontal
        }
    });
};

/**
 * @returns {void}
 */
export const hideToastMessage = () => dispatch => {
    dispatch({
        type: HIDE_TOAST_MESSAGE
    });
};
