import { Fragment } from "react";

import { AddTimeForm, Report } from "./components";

function App() {

    //#region Render
    return (
        <Fragment>
            <AddTimeForm />
            <Report />
        </Fragment>
    );
    //#endregion
}

export default App;
