import Axios from "../../services/axios";
import { CLEAR_VALIDATION_ERRORS, VALIDATION_FAILED } from "../../action-types";
import {
    ADD_CATEGORY,
    GET_CATEGORIES,
    GET_CATEGORY,
    UPDATE_CATEGORY
} from "../../action-types/admin/categoryTypes";
import { showToastMessage } from "../toastMessageActions";

/**
 * @param {number|10} perPage
 * @param {string|"/api/admin/categories"} url
 * @returns {Promise<void>}
 */
export const getCategories = (
    perPage = 10,
    url = "/api/admin/categories"
) => async dispatch => {
    try {
        const response = await Axios.get(url, {
            params: {
                per_page: perPage
            }
        });

        const {
            prev_page_url,
            next_page_url,
            total,
            data
        } = response.data.categories;

        dispatch({
            type: GET_CATEGORIES,
            payload: {
                prevPageUrl: prev_page_url || null,
                nextPageUrl: next_page_url || null,
                total: total || 0,
                categories: data || [],
                perPage: perPage
            }
        });
    } catch (err) {
        console.log(err);
    }
};

/**
 * Get all categories without pagination.
 *
 * @returns {Promise<void>}
 */
export const getCategoriesWithoutPagination = () => async dispatch => {
    try {
        const response = await Axios.get("/api/admin/categories", {
            params: {
                all: true
            }
        });

        dispatch({
            type: GET_CATEGORIES,
            payload: {
                categories: response.data.categories || []
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
export const getCategory = id => async dispatch => {
    try {
        const response = await Axios.get(`/api/admin/categories/${id}`);

        const category = response.data.category;

        dispatch({
            type: GET_CATEGORY,
            payload: {
                id: category.id || null,
                name: category.name || null,
                description: category.description || null
            }
        });

        return true;
    } catch (err) {
        console.log(err);

        return false;
    }
};

/**
 * @param {string} name
 * @param {string} description
 * @returns {Promise<boolean>}
 */
export const addCategory = (name, description) => async dispatch => {
    try {
        const response = await Axios.post("/api/admin/categories", {
            name,
            description
        });

        dispatch({
            type: ADD_CATEGORY,
            payload: response.data.category || {}
        });

        dispatch(clearErrors());

        dispatch(showToastMessage(response.data.message));

        return true;
    } catch (err) {
        console.log(err);

        const response = err.response;

        if (response && response.status === 422) {
            dispatch({
                type: VALIDATION_FAILED,
                payload: {
                    name: response.data.errors.name || [],
                    description: response.data.errors.description || []
                }
            });
        }

        return false;
    }
};

/**
 * @param {number} id
 * @param {string} name
 * @param {string} description
 * @returns {Promise<boolean>}
 */
export const updateCategory = (id, name, description) => async dispatch => {
    try {
        const response = await Axios.put(`/api/admin/categories/${id}`, {
            name,
            description
        });

        dispatch({
            type: UPDATE_CATEGORY,
            payload: response.data.category || {}
        });

        dispatch(clearErrors());

        dispatch(showToastMessage(response.data.message));

        return true;
    } catch (err) {
        console.log(err);

        const response = err.response;

        if (response && response.status === 422) {
            dispatch({
                type: VALIDATION_FAILED,
                payload: {
                    name: response.data.errors.name || [],
                    description: response.data.errors.description || []
                }
            });
        }

        return false;
    }
};

/**
 * Clear validation errors.
 *
 * @returns {Promise<void>}
 */
export const clearErrors = () => dispatch => {
    dispatch({ type: CLEAR_VALIDATION_ERRORS });
};
