window.axios = require("axios");

window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

if ((csrfToken = document.head.querySelector('meta[name="csrf-token"]'))) {
    window.axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken.content;
}

if ((authToken = localStorage.getItem("token"))) {
    window.axios.defaults.headers.common[
        "Authorization"
    ] = `Bearer ${authToken}`;
}
