import React from "react";
import ReactDOM, { Root } from "react-dom/client";
import App from "./App";

import { JiraPointsContextProvider } from "./stores";

import "./assets/fonts/roboto/font.css";
import "./assets/styles/main.scss";
import "./assets/styles/buttons.scss";
import "./assets/styles/inputs.scss";

const root: Root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <JiraPointsContextProvider>
            <App />
        </JiraPointsContextProvider>
    </React.StrictMode>
);

// TODO
// Components
// ---
//     Form - ok
// Report
// - SeriesList (all)
// - Series (one for normal and one for bug)
//     - SeriesItem
// - Total
//
// First make run without using a store, then use a store solution:
//   - First: ReactContext
//   - Second: Redux with Redux Toolkit

