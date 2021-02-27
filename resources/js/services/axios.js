import Axios from "axios";

const axios = Axios.create({
    baseURL: process.env.MIX_APP_URL
});

const csrfToken = document.head.querySelector('meta[name="csrf-token"]');
const bearerToken = localStorage.getItem("token");

axios.defaults.headers.common = {
    ...axios.defaults.headers.common,
    "X-CSRF-TOKEN": csrfToken.content || "",
    Authorization: `Bearer ${bearerToken}`
};

axios.interceptors.response.use(
    response => response,
    err => {
        if (err.response) {
            const status = err.response.status;
            switch (status) {
                case 401:
                    localStorage.removeItem("token");
                    window.location.replace("/admin/login");
                    break;
            }
        }

        return Promise.reject(err);
    }
);

export default axios;
