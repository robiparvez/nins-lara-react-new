import { combineReducers } from "redux";
import postsReducer from "../reducers/postsReducer";
import adminAuthReducer from "../reducers/admin/authReducer";
import AdminGroupsReducer from "../reducers/admin/groupReducer";
import AdminPermissionsReducer from "../reducers/admin/permissionReducer";

export default combineReducers({
    posts: postsReducer,
    adminAuth: adminAuthReducer,
    adminGroups: AdminGroupsReducer,
    adminPermissions: AdminPermissionsReducer
});
