import { combineReducers } from "redux";
import postsReducer from "../reducers/postsReducer";
import adminAuthReducer from "../reducers/admin/authReducer";

export default combineReducers({
    posts: postsReducer,
    adminAuth: adminAuthReducer
});
