import { FC } from "react";
import { LoggedTime } from "../../../services";
import { SeriesItem } from "../SeriesItem/SeriesItem";

import classes from "./Series.module.scss";

type Props = {
    times: Array<LoggedTime>;
    onDeleteItem?(loggedTime: LoggedTime): void;
};

export const Series: FC<Props> = (props) => {

    return (
        <div className={classes.container}>
            {props.times.map(loggedTime => {
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
