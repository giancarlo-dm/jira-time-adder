import { FC, Fragment } from "react";

import { LoggTimeTypeEnum, TimeHelper, useJiraPointsSlice } from "../../../store";
import classes from "./Total.module.scss";

type Props = {
    type: LoggTimeTypeEnum;
}

export const Total: FC<Props> = (props) => {

    const jiraPointsSlice = useJiraPointsSlice();
    const totalTime = props.type === LoggTimeTypeEnum.NORMAL
        ? jiraPointsSlice.totalTimeSpent
        : jiraPointsSlice.totalBugsTimeSpent;
    const totalPoints = props.type === LoggTimeTypeEnum.NORMAL
        ? jiraPointsSlice.totalPointsSpent
        : jiraPointsSlice.totalBugsPointsSpent;


    return (
        <Fragment>
            {props.type === LoggTimeTypeEnum.NORMAL
                ? <h4>Total:</h4>
                : <h4>Total spent in bugs:</h4>}

            <div className={classes.total}>
                <div className="control-group horizontal">
                    <label htmlFor="totalPoints">Points</label>
                    <input id={`${props.type}_totalPoints`} type="text" className="control"
                           value={totalPoints}
                           disabled />
                </div>
                <div className="control-group horizontal">
                    <label htmlFor="totalBugsTime">Time</label>
                    <input id={`${props.type}_totalBugsTime`} type="text" className="control"
                           value={TimeHelper.format(totalTime)}
                           disabled />
                </div>
            </div>
        </Fragment>
    );
};
