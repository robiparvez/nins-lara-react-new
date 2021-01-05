import { CLEAR_VALIDATION_ERRORS, VALIDATION_FAILED } from "../../action-types";
import {
    ADD_CATEGORY,
    GET_CATEGORIES,
    GET_CATEGORY,
    UPDATE_CATEGORY
} from "../../action-types/admin/categoryTypes";

const initialState = {
    prevPageUrl: null,
    nextPageUrl: null,
    perPage: 10,
    total: 0,
    category: {
        id: null,
        name: null,
        description: null
    },
    categories: [],
    errors: {
        name: [],
        description: []
    }
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_CATEGORIES: {
            return {
                ...state,
                prevPageUrl: payload.prevPageUrl,
                nextPageUrl: payload.nextPageUrl,
                total: payload.total,
                categories: payload.categories,
                perPage: payload.perPage
            };
        }
        case GET_CATEGORY: {
            return {
                ...state,
                category: payload
            };
        }
        case ADD_CATEGORY: {
            return {
                ...state,
                categories: [payload, ...state.categories]
            };
        }
        case UPDATE_CATEGORY: {
            return {
                ...state,
                categories: state.categories.map(category =>
                    category.id === payload.id ? payload : category
                )
            };
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
                errors: initialState.errors
            };
        }
        default: {
            return state;
        }
    }
};
