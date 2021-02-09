import { TOGGLE_LOADER } from "../../action-types/admin/loaderTypes";

/**
 * @returns {void}
 */
export const toggleLoader = () => dispatch => {
    dispatch({ type: TOGGLE_LOADER });
};
