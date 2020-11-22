import Axios from "axios";
import {
    GET_GROUP_PERMISSIONS,
    UPDATE_GROUP_PERMISSIONS
} from "../../action-types/admin/permissionTypes";

/**
 * @exports
 * @param {number} groupId
 * @returns {void}
 */
export const getGroupPermissions = groupId => async dispatch => {
    try {
        const response = await Axios.get(
            `/api/admin/groups/${groupId}/permissions`
        );

        dispatch({
            type: GET_GROUP_PERMISSIONS,
            payload: response.data.permissions || []
        });
    } catch (err) {
        console.log(err);
    }
};

/**
 * @exports
 * @param {number} groupId
 * @param {Array} permissions
 * @returns {boolean}
 */
export const updateGroupPermissions = (
    groupId,
    permissions
) => async dispatch => {
    try {
        const response = await Axios.put(
            `/api/admin/groups/${groupId}/permissions`,
            {
                permissions
            }
        );

        console.log(response.data);

        dispatch({
            type: UPDATE_GROUP_PERMISSIONS,
            payload: response.data.permissions || []
        });

        return true;
    } catch (err) {
        console.log(err);

        return false;
    }
};
