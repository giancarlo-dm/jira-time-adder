import { FC } from "react";

import classes from "./AddTimeForm.module.scss";

/**
 * Stateful Component that represents a form to add the times.
 * @constructor
 *
 * @since 0.1.0
 */
export const AddTimeForm: FC = () => {

    return (
        <div className={classes.form}>
            <div className="control-group">
                <label htmlFor="timeInput">
                    Time (decimal or time notation)
                </label>
                <input id="timeInput" type="text" className="control"
                       placeholder="Ex.: 1.5 or 1:30"
                       name="time" />
            </div>

            <div className={`button-group ${classes.buttonGroup}`}>
                <button type="button" className="button primary">
                    Add Time
                </button>
                <button type="button" className="button danger">
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
