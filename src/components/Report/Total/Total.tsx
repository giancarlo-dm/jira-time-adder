import { FC, Fragment } from "react";
import { LoggTimeTypeEnum, Time } from "../../../services";

import classes from "./Total.module.scss";

type Props = {
    type: LoggTimeTypeEnum;
    points: string;
    time: Time;
}

export const Total: FC<Props> = (props) => {

    return (
        <Fragment>
            {props.type === LoggTimeTypeEnum.NORMAL
                ? <h4>Total:</h4>
                : <h4>Total spent in bugs:</h4>}

            <div className={classes.total}>
                <div className={`control-group horizontal ${classes.controlGroup}`}>
                    <label htmlFor="totalBugsPoints">Points</label>
                    <input id="totalBugsPoints" type="text" className={`control ${classes.control}`}
                           value={props.points}
                           disabled />
                </div>
                <div className={`control-group horizontal ${classes.controlGroup}`}>
                    <label htmlFor="totalBugsTime">Time</label>
                    <input id="totalBugsTime" type="text" className={`control ${classes.control}`}
                           value={props.time.toString()}
                           disabled />
                </div>
            </div>
        </Fragment>
    );
};
