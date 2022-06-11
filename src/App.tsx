import { Fragment, useContext } from "react";

import { AddTimeForm, Report } from "./components";
import { JiraPointsContext, JiraPointsStore } from "./stores";

function App() {

    //#region Context
    const jiraPointsStore = useContext<JiraPointsStore>(JiraPointsContext);
    //#endregion

    //#region Render
    return (
        <Fragment>
            <AddTimeForm onAddTime={jiraPointsStore.addTime} />
            <Report normalTimes={jiraPointsStore.loggedTimes}
                    bugTimes={jiraPointsStore.bugsLoggedTimes}
                    points={jiraPointsStore.totalPointsSpent}
                    bugPoints={jiraPointsStore.totalBugsPointsSpent}
                    totalTimeSpent={jiraPointsStore.totalTimeSpent}
                    totalBugsTimeSpent={jiraPointsStore.totalBugsTimeSpent}
                    onDeleteItem={jiraPointsStore.removeTime}
                    onReset={jiraPointsStore.reset} />
        </Fragment>
    );
    //#endregion
}

export default App;
