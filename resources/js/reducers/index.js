import { combineReducers } from "redux";
import toastMessageReducer from "./toastMessageReducer";
import adminAuthReducer from "./admin/authReducer";
import adminGroupReducer from "./admin/groupReducer";
import adminPermissionReducer from "./admin/permissionReducer";
import adminCategoryReducer from "./admin/categoryReducer";

export default combineReducers({
    toastMessage: toastMessageReducer,
    adminAuth: adminAuthReducer,
    adminGroups: adminGroupReducer,
    adminPermissions: adminPermissionReducer,
    adminCategories: adminCategoryReducer
});
