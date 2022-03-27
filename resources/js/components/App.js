import { createTheme, MuiThemeProvider } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../store";
import ToastMessage from "./includes/ToastMessage";
import Router from "./router/Router";

const theme = createTheme({
    typography: {
        fontFamily: "Montserrat, Arial"
    }
});

function App() {
    return (
        <MuiThemeProvider theme={theme}>
            <Provider store={store}>
                <ToastMessage />
                <BrowserRouter>
                    <Router />
                </BrowserRouter>
            </Provider>
        </MuiThemeProvider>
    );
}

export default App;

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
