import { render } from "@testing-library/react";
import { Provider } from "react-redux";

import App from "./App";
import { store } from "./store";

describe("App component",  () => {

    test("Renders with store", () => {

        render(<Provider store={store}><App /></Provider>);
    });
});
