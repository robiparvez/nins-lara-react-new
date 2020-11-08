import { VALIDATION_FAILED } from "../../action-types";
import { ADD_GROUP, GET_GROUP, GET_GROUPS, UPDATE_GROUP } from "../../action-types/admin/groupTypes";

const initialState = {
    prevPageUrl: null,
    nextPageUrl: null,
    perPage: 10,
    total: 0,
    group: {
        id: null,
        name: null,
        description: null
    },
    groups: [],
    errors: {
        name: [],
        description: []
    }
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_GROUPS: {
            return {
                ...state,
                prevPageUrl: payload.prev_page_url,
                nextPageUrl: payload.next_page_url,
                total: payload.total,
                groups: payload.groups
            };
        }
        case GET_GROUP: {
            return {
                ...state,
                group: payload
            }
        }
        case ADD_GROUP: {
            return {
                ...state,
                groups: [payload, ...state.groups]
            }
        }
        case UPDATE_GROUP: {
            return {
                ...state,
                groups: state.groups.map(group => group.id == payload.id ? payload : group)
            }
        }
        case VALIDATION_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    name: payload.name,
                    description: payload.description
                }
            };
        }
        default: {
            return state;
        }
    }
};
