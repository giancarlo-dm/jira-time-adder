import { FC, KeyboardEvent, useRef } from "react";

import { LoggTimeTypeEnum } from "../../services";
import classes from "./AddTimeForm.module.scss";

type Props = {
    onAddTime?: (time: string, logTimeType: LoggTimeTypeEnum) => void;
}

/**
 * Stateful Component that represents a form to add the times.
 * @constructor
 *
 * @since 0.1.0
 */
export const AddTimeForm: FC<Props> = (props) => {

    const timeInputRef = useRef<HTMLInputElement>(null);

    const addTimeHandler = (logTimeType: LoggTimeTypeEnum) => {

        if (timeInputRef.current!.value.length === 0) {
            return;
        }

        if (props.onAddTime != null) {
            props.onAddTime(timeInputRef.current!.value, logTimeType);
        }

        timeInputRef.current!.value = "";
    };

    const timeInputKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Enter" || e.code === "NumpadEnter") {
            // Normal
            if (!e.ctrlKey) {
                addTimeHandler(LoggTimeTypeEnum.NORMAL);
            }
            // Bug
            else {
                addTimeHandler(LoggTimeTypeEnum.BUG);
            }
        }
    };

    return (
        <div className={classes.form}>
            <div className="control-group">
                <label htmlFor="timeInput">
                    Time (decimal or time notation)
                </label>
                <input id="timeInput" type="text" className="control"
                       placeholder="Ex.: 1.5 or 1:30"
                       name="time"
                       onKeyDown={timeInputKeyDownHandler}
                       ref={timeInputRef} />
            </div>

            <div className={`button-group ${classes.buttonGroup}`}>
                <button type="button" className="button primary"
                        onClick={addTimeHandler.bind(null, LoggTimeTypeEnum.NORMAL)}>
                    Add Time
                </button>
                <button type="button" className="button danger"
                        onClick={addTimeHandler.bind(null, LoggTimeTypeEnum.BUG)}>
                    Add Bug Time
                </button>
            </div>

            <ul className={classes.shortcuts}>
                <li>
                    <span className={classes.shortcut}>Enter:</span>
                    Insert a "Normal" time.
                </li>
                <li>
                    <span className={classes.shortcut}>CTRL+Enter:</span>
                    Insert a "Bug" time.
                </li>
            </ul>
        </div>
    );
};
