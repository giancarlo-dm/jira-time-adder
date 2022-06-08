import React from "react";
import ReactDOM, { Root } from "react-dom/client";
import App from "./App";

import "./assets/fonts/roboto/font.css";
import "./assets/styles/main.scss";
import "./assets/styles/buttons.scss";
import "./assets/styles/inputs.scss";

const root: Root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

class MyClass {

    sayHello(): void {
        console.log("Hello World", MyClass);
    }
}

new MyClass().sayHello();
