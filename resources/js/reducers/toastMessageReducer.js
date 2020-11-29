import {
    HIDE_TOAST_MESSAGE,
    SHOW_TOAST_MESSAGE
} from "../action-types/toastMessageTypes";

const initialState = {
    message: "",
    type: "default",
    visible: false,
    vertical: "top",
    horizontal: "right",
    autoHide: true
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case SHOW_TOAST_MESSAGE: {
            return {
                message: payload.message,
                type: payload.type ? payload.type : state.type,
                visible: true,
                vertical: payload.vertical ? payload.vertical : state.vertical,
                horizontal: payload.horizontal
                    ? payload.horizontal
                    : state.horizontal,
                autoHide: payload.autoHide ? payload.autoHide : payload.autoHide
            };
        }
        case HIDE_TOAST_MESSAGE: {
            return {
                ...state,
                visible: false
            };
        }
        default:
            return state;
    }
};
