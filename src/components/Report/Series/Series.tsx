import { FC } from "react";

import { LoggedTime, LoggTimeTypeEnum, useJiraPointsSlice } from "../../../store";
import { SeriesItem } from "../SeriesItem/SeriesItem";
import classes from "./Series.module.scss";

type Props = {
    type: LoggTimeTypeEnum;
    onDeleteItem?(loggedTime: LoggedTime): void;
};

export const Series: FC<Props> = (props) => {

    const jiraPointsSlice = useJiraPointsSlice();
    const times = props.type === LoggTimeTypeEnum.NORMAL
        ? jiraPointsSlice.loggedTimes
        : jiraPointsSlice.bugsLoggedTimes;

    return (
        <div className={classes.container}>
            {times.map(loggedTime => {
                return (
                    <SeriesItem key={loggedTime.id} loggedTime={loggedTime}
                                onDelete={props.onDeleteItem != null
                                    ? props.onDeleteItem.bind(null, loggedTime)
                                    : void (0)} />
                );
            })}
        </div>
    );
};
