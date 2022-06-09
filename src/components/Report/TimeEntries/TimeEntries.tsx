import { FC, Fragment } from "react";
import { Series } from "../Series/Series";

import classes from "./TimeEntries.module.scss";

export const TimeEntries: FC = () => {

    return (
        <Fragment>
            <h4>Series</h4>
            <div className={classes.series}>
                <h5>Normal</h5>
                <Series />
            </div>
            <div className="report__series">
                <h5>Bugs</h5>
                <div id="bugsSeriesContainer" className="report__series-container" />
            </div>
        </Fragment>
    );
};
