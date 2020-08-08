import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import Router from "./router/Router";

const theme = createMuiTheme({
    typography: {
        fontFamily: "Montserrat, Arial"
    }
});

function App() {
    return (
        <MuiThemeProvider theme={theme}>
            <Provider store={store}>
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
