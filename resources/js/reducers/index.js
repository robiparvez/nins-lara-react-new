import { combineReducers } from "redux";
import toastMessageReducer from "./toastMessageReducer";
import adminAuthReducer from "./admin/authReducer";
import adminGroupReducer from "./admin/groupReducer";
import adminPermissionReducer from "./admin/permissionReducer";
import adminCategoryReducer from "./admin/categoryReducer";
import adminPostReducer from "./admin/postReducer";
import adminLoaderReducer from "./admin/loaderReducer";
import adminProfileReducer from "./admin/profileReducer";

export default combineReducers({
    toastMessage: toastMessageReducer,
    adminAuth: adminAuthReducer,
    adminGroups: adminGroupReducer,
    adminPermissions: adminPermissionReducer,
    adminCategories: adminCategoryReducer,
    adminPosts: adminPostReducer,
    adminLoader: adminLoaderReducer,
    adminProfile: adminProfileReducer
});
