import { Fragment, useEffect, useState } from "react";

import { AddTimeForm, Report } from "./components";
import { JiraTimeAdderService, LoggedTime, LoggTimeTypeEnum } from "./services";

function App() {

    const [jiraTimeAdderService, setJiraTimeAdderService] = useState(new JiraTimeAdderService());
    const [loggedTimes, setLoggedTimes] = useState(jiraTimeAdderService.loggedTimes);
    const [bugsLoggedTimes, setBugsLoggedTimes] = useState(jiraTimeAdderService.bugsLoggedTimes);
    const [totalPointsSpent, seTotalPointsSpent] = useState(jiraTimeAdderService.totalPointsSpent);
    const [totalBugsPointsSpent, setTotalBugsPointsSpent] = useState(jiraTimeAdderService.totalBugsPointsSpent);
    const [totalTimeSpent, setTotalTimeSpent] = useState(jiraTimeAdderService.totalTimeSpent);
    const [totalBugsTimeSpent, setTotalBugsTimeSpent] = useState(jiraTimeAdderService.totalBugsTimeSpent);

    useEffect(
        () => {
            setLoggedTimes(jiraTimeAdderService.loggedTimes);
            seTotalPointsSpent(jiraTimeAdderService.totalPointsSpent);
            setTotalTimeSpent(jiraTimeAdderService.totalTimeSpent);
            setBugsLoggedTimes(jiraTimeAdderService.bugsLoggedTimes);
            setTotalBugsPointsSpent(jiraTimeAdderService.totalBugsPointsSpent);
            setTotalBugsTimeSpent(jiraTimeAdderService.totalBugsTimeSpent);
        },
        [jiraTimeAdderService]
    );

    const updateState = (loggedTimeType?: LoggTimeTypeEnum) => {
        switch (loggedTimeType) {
            case LoggTimeTypeEnum.NORMAL:
                setLoggedTimes(jiraTimeAdderService.loggedTimes);
                seTotalPointsSpent(jiraTimeAdderService.totalPointsSpent);
                setTotalTimeSpent(jiraTimeAdderService.totalTimeSpent);
                break;
            case LoggTimeTypeEnum.BUG:
                setBugsLoggedTimes(jiraTimeAdderService.bugsLoggedTimes);
                setTotalBugsPointsSpent(jiraTimeAdderService.totalBugsPointsSpent);
                setTotalBugsTimeSpent(jiraTimeAdderService.totalBugsTimeSpent);
                break;
        }
    };

    const addTimeHandler = (time: string, loggedTimeType: LoggTimeTypeEnum) => {
        jiraTimeAdderService.addTime(time, loggedTimeType);
        updateState(loggedTimeType);
    };

    const deleteItemHandler = (loggedTime: LoggedTime) => {
        jiraTimeAdderService.removeLoggedTime(loggedTime);
        updateState(loggedTime.type);
    };

    const resetHandler = () => {
        setJiraTimeAdderService(new JiraTimeAdderService());
    };

    return (
        <Fragment>
            <AddTimeForm onAddTime={addTimeHandler} />
            <Report normalTimes={loggedTimes}
                    bugTimes={bugsLoggedTimes}
                    points={totalPointsSpent}
                    bugPoints={totalBugsPointsSpent}
                    totalTimeSpent={totalTimeSpent}
                    totalBugsTimeSpent={totalBugsTimeSpent}
                    onDeleteItem={deleteItemHandler}
                    onReset={resetHandler} />
        </Fragment>
    );
}

export default App;
