import { FC } from "react";
import { LoggedTime, LoggTimeTypeEnum } from "../../../services";

import classes from "./SeriesItem.module.scss";

type Props = {
    loggedTime: LoggedTime;
    onDelete?(): void;
}

export const SeriesItem: FC<Props> = (props) => {

    const classType = props.loggedTime.type === LoggTimeTypeEnum.NORMAL
        ? classes.normal
        : props.loggedTime.type === LoggTimeTypeEnum.BUG
            ? classes.bug
            : "";

    const deleteItemHandler = () => {
        const confirmed = window.confirm(`Are you sure you want to delete this entry?\n\nEntry: ${props.loggedTime.time.toString()} (${props.loggedTime.decimalTime.toFixed(2)})`);
        if (confirmed && props.onDelete != null) {
            props.onDelete();
        }
    };

    return (
        <div className={`${classes.item} ${classType}`}>
            <span>{props.loggedTime.time.toString()} ({props.loggedTime.decimalTime.toFixed(2)})</span>
            <button className={classes.deleteButton}
                    onClick={deleteItemHandler} />
        </div>
    );
};
