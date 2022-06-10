import { FC } from "react";
import { LoggedTime, LoggTimeTypeEnum, Time } from "../../services";

import classes from "./Report.module.scss";
import { Series } from "./Series/Series";
import { Total } from "./Total/Total";

type Props = {
    normalTimes: Array<LoggedTime>;
    bugTimes: Array<LoggedTime>;
    points: string;
    bugPoints: string;
    totalTimeSpent: Time;
    totalBugsTimeSpent: Time;
    onReset?(): void;
    onDeleteItem?(loggedTime: LoggedTime): void;
}

export const Report: FC<Props> = (props) => {

    const clearHandler = () => {
        const confirmed = window.confirm("Are you sure you want to clear all entries?");
        if (confirmed && props.onReset != null) {
            props.onReset();
        }
    };

    return (
        <div className={classes.report}>
            <hr className={classes.ruler} />
            <div className={classes.content}>
                <div className={classes.container}>
                    <h4>Series</h4>
                    <div className={classes.series}>
                        <h5>Normal</h5>
                        <Series times={props.normalTimes}
                                onDeleteItem={props.onDeleteItem != null
                                    ? props.onDeleteItem
                                    : void (0)} />
                    </div>
                    <div className={classes.series}>
                        <h5>Bugs</h5>
                        <Series times={props.bugTimes}
                                onDeleteItem={props.onDeleteItem != null
                                    ? props.onDeleteItem
                                    : void (0)}/>
                    </div>
                </div>

                <div className={classes.container}>
                    <Total type={LoggTimeTypeEnum.NORMAL}
                           points={props.points}
                           time={props.totalTimeSpent}/>
                </div>

                <div className={classes.container}>
                    <Total type={LoggTimeTypeEnum.BUG}
                           points={props.bugPoints}
                           time={props.totalBugsTimeSpent}/>
                </div>

                <div className={classes.container}>
                    <button type="button" className="button"
                            onClick={clearHandler}>
                        Clear
                    </button>
                </div>
            </div>

        </div>
    );
};