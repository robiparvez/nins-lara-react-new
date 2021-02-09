import { TOGGLE_LOADER } from "../../action-types/admin/loaderTypes";

const initialState = {
    show: false
};

export default (state = initialState, { type }) => {
    switch (type) {
        case TOGGLE_LOADER: {
            return {
                show: !state.show
            };
        }
        default: {
            return state;
        }
    }
};
