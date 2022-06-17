import { FC, Fragment } from "react";

import { LoggedTime, LoggTimeTypeEnum } from "../../../store";
import { Series } from "../Series/Series";
import classes from "./TimeEntries.module.scss";

type Props = {
    onDeleteItem?(loggedTime: LoggedTime): void;
};

export const TimeEntries: FC<Props> = (props) => {



    return (
        <Fragment>
            <h4>Series</h4>
            <div className={classes.series}>
                <h5>Normal</h5>
                <Series type={LoggTimeTypeEnum.NORMAL}
                        onDeleteItem={props.onDeleteItem != null
                            ? props.onDeleteItem
                            : void (0)} />
            </div>
            <div className={classes.series}>
                <h5>Bugs</h5>
                <Series type={LoggTimeTypeEnum.BUG}
                        onDeleteItem={props.onDeleteItem != null
                            ? props.onDeleteItem
                            : void (0)}/>
            </div>
        </Fragment>
    );
};
