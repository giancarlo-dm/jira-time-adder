import { FC } from "react";
import { TimeEntries } from "./TimeEntries/TimeEntries";

import classes from "./Report.module.scss";

export const Report: FC = () => {

    return (
        <div className={classes.report}>
            <hr className={classes.ruler} />

            <TimeEntries/>
        </div>
    );
};
