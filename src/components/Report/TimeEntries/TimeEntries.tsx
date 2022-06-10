import { FC, Fragment } from "react";

import { LoggedTime } from "../../../services";
import { Series } from "../Series/Series";
import classes from "./TimeEntries.module.scss";

type Props = {
    normalTimes: Array<LoggedTime>;
    bugTimes: Array<LoggedTime>;
    onDeleteItem?(loggedTime: LoggedTime): void;
};

export const TimeEntries: FC<Props> = (props) => {

    return (
        <Fragment>
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
        </Fragment>
    );
};
