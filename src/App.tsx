import { Fragment } from "react";

import { AddTimeForm, Report } from "./components";
import {
    jiraPointsActions, LoggedTime, LoggTimeTypeEnum, useAppDispatch, useJiraPointsSlice
} from "./store";

function App() {

    //#region Store Slices
    const jiraPointsSlice = useJiraPointsSlice();
    const dispatch = useAppDispatch();
    //#endregion

    //#region Event Handlers
    const addTimeHandler = (time: string, loggTimeType: LoggTimeTypeEnum) => {
        dispatch(jiraPointsActions.addTime({timeStr: time, type: loggTimeType}));
    };

    const deleteItemHandler = (loggedTime: LoggedTime) => {
        dispatch(jiraPointsActions.removeTime({loggedTime: loggedTime}));
    };

    const resetHandler = () => {
        dispatch(jiraPointsActions.reset());
    };
    //#endregion

    //#region Render
    return (
        <Fragment>
            <AddTimeForm onAddTime={addTimeHandler} />
            <Report normalTimes={jiraPointsSlice.loggedTimes}
                    bugTimes={jiraPointsSlice.bugsLoggedTimes}
                    points={jiraPointsSlice.totalPointsSpent}
                    bugPoints={jiraPointsSlice.totalBugsPointsSpent}
                    totalTimeSpent={jiraPointsSlice.totalTimeSpent}
                    totalBugsTimeSpent={jiraPointsSlice.totalBugsTimeSpent}
                    onDeleteItem={deleteItemHandler}
                    onReset={resetHandler} />
        </Fragment>
    );
    //#endregion
}

export default App;
