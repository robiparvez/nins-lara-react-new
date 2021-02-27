import {
    GET_PROFILE,
    UPDATE_PROFILE,
    CLEAR_PROFILE
} from "../../action-types/admin/profileTypes";
import { CLEAR_VALIDATION_ERRORS, VALIDATION_FAILED } from "../../action-types";

const initialState = {
    user: {
        id: "",
        first_name: "",
        last_name: "",
        email: "",
        group_id: ""
    },
    errors: {
        first_name: [],
        last_name: [],
        email: [],
        password: [],
        current_password: [],
        new_password: []
    }
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_PROFILE: {
            return {
                ...state,
                user: {
                    ...state.user,
                    ...payload
                }
            };
        }
        case UPDATE_PROFILE: {
            return {
                ...state,
                user: payload
            };
        }
        case CLEAR_PROFILE: {
            return initialState;
        }
        case VALIDATION_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    ...payload
                }
            };
        }
        case CLEAR_VALIDATION_ERRORS: {
            return {
                ...state,
                errors: {
                    ...state.errors
                }
            };
        }
        default:
            return state;
    }
};
