import { CLEAR_VALIDATION_ERRORS, VALIDATION_FAILED } from "../../action-types";
import {
    ADD_POST,
    GET_POST,
    GET_POSTS,
    UPDATE_POST
} from "../../action-types/admin/postTypes";

const initialState = {
    prevPageUrl: null,
    nextPageUrl: null,
    perPage: 10,
    total: 0,
    post: {
        id: "",
        title: "",
        content: "",
        image: "",
        image_url: "",
        meta_title: "",
        meta_description: "",
        author_id: "",
        author: "",
        categories: []
    },
    posts: [],
    errors: {
        title: [],
        content: [],
        image: [],
        meta_title: [],
        meta_description: [],
        categories: [],
        author: []
    }
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_POSTS: {
            return {
                ...state,
                prevPageUrl: payload.prevPageUrl,
                nextPageUrl: payload.nextPageUrl,
                total: payload.total,
                perPage: payload.perPage,
                posts: payload.posts
            };
        }
        case GET_POST: {
            return {
                ...state,
                post: payload
            };
        }
        case ADD_POST: {
            return {
                ...state,
                posts: [payload, ...state.posts]
            };
        }
        case UPDATE_POST: {
            return {
                ...state,
                posts: state.posts.map(post =>
                    post.id === payload.id ? payload : post
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
