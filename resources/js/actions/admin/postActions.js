import Axios from "../../services/axios";
import {
    ADD_POST,
    GET_POST,
    GET_POSTS,
    UPDATE_POST
} from "../../action-types/admin/postTypes";
import { CLEAR_VALIDATION_ERRORS, VALIDATION_FAILED } from "../../action-types";
import { showToastMessage } from "../toastMessageActions";

/**
 * @param {number|10} perPage
 * @param {string|"admin/posts"} url
 * @returns {Promise<void>}
 */
export const getPosts = (
    perPage = 10,
    url = "admin/posts"
) => async dispatch => {
    try {
        const response = await Axios.get(url, {
            per_page: perPage
        });

        const {
            prev_page_url,
            next_page_url,
            total,
            data
        } = response.data.posts;

        dispatch({
            type: GET_POSTS,
            payload: {
                prevPageUrl: prev_page_url || null,
                nextPageUrl: next_page_url || null,
                total: total || 0,
                posts: data || [],
                perPage: perPage
            }
        });
    } catch (err) {
        console.log(err);
    }
};

/**
 * @param {number} id
 * @returns {Promise<void>}
 */
export const getPost = id => async dispatch => {
    try {
        const response = await Axios.get(`admin/posts/${id}`);

        dispatch({
            type: GET_POST,
            payload: {
                ...response.data.post
            }
        });
    } catch (err) {
        console.log(err);

        return false;
    }
};

/**
 * @param {FormData} formData
 * @returns {Promise<boolean>}
 */
export const addPost = formData => async dispatch => {
    try {
        const response = await Axios.post("admin/posts", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        const { post, message } = response.data;

        dispatch({
            type: ADD_POST,
            payload: post
        });

        dispatch(clearErrors());

        dispatch(showToastMessage(message));

        return true;
    } catch (err) {
        console.log(err);

        const response = err.response;

        if (response && response.status === 422) {
            const { errors } = response.data;

            dispatch({
                type: VALIDATION_FAILED,
                payload: {
                    title: errors.title || [],
                    content: errors.content || [],
                    image: errors.image || [],
                    meta_title: errors.meta_title || [],
                    meta_description: errors.meta_description || [],
                    author: errors.author || [],
                    categories: errors.categories || []
                }
            });
        }

        return false;
    }
};

/**
 * @param {number} id
 * @param {FormData} formData
 * @returns {Promise<boolean>}
 */
export const updatePost = (id, formData) => async dispatch => {
    try {
        const response = await Axios.post(`admin/posts/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        const { post, message } = response.data;

        dispatch({
            type: UPDATE_POST,
            payload: post
        });

        dispatch(clearErrors());

        dispatch(showToastMessage(message));

        return true;
    } catch (err) {
        console.log(err);
        const response = err.response;

        if (response && response.status === 422) {
            const { errors } = response.data;

            dispatch({
                type: VALIDATION_FAILED,
                payload: {
                    title: errors.title || [],
                    content: errors.content || [],
                    image: errors.image || [],
                    meta_title: errors.meta_title || [],
                    meta_description: errors.meta_description || [],
                    author: errors.author || [],
                    categories: errors.categories || []
                }
            });
        }

        return false;
    }
};

/**
 * @returns {void}
 */
export const clearErrors = () => dispatch => {
    dispatch({ type: CLEAR_VALIDATION_ERRORS });
};
