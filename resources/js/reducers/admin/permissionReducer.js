import {
    GET_GROUP_PERMISSIONS,
    UPDATE_GROUP_PERMISSIONS
} from "../../action-types/admin/permissionTypes";

const initialState = {
    permissions: [],
    errors: {
        permissions: []
    }
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_GROUP_PERMISSIONS: {
            return {
                ...state,
                permissions: payload
            };
        }
        case UPDATE_GROUP_PERMISSIONS: {
            const permissions = state.permissions.map(permission => {
                const selectedPermission = payload.find(
                    selectedPermission => selectedPermission.id == permission.id
                );

                if (selectedPermission === undefined) {
                    permission.has_permission = false;
                }

                return permission;
            });

            return {
                ...state,
                permissions: permissions
            };
        }
        default:
            return state;
    }
};
