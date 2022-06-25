import React from "react";
import ReactDOM, { Root } from "react-dom/client";
import { Provider } from "react-redux";

import { store } from "./store";
import App from "./App";

import "./assets/styles/main.scss";
import "./assets/styles/buttons.scss";
import "./assets/styles/inputs.scss";

const root: Root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store} >
            <App />
        </Provider>
    </React.StrictMode>
);
