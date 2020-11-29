import { combineReducers } from "redux";
import postsReducer from "../reducers/postsReducer";
import toastMessageReducer from "../reducers/toastMessageReducer";
import adminAuthReducer from "../reducers/admin/authReducer";
import AdminGroupsReducer from "../reducers/admin/groupReducer";
import AdminPermissionsReducer from "../reducers/admin/permissionReducer";

export default combineReducers({
    posts: postsReducer,
    toastMessage: toastMessageReducer,
    adminAuth: adminAuthReducer,
    adminGroups: AdminGroupsReducer,
    adminPermissions: AdminPermissionsReducer
});
