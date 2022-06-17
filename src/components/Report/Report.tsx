import { FC } from "react";

import { jiraPointsActions, LoggedTime, LoggTimeTypeEnum, useAppDispatch } from "../../store";
import { TimeEntries } from "./TimeEntries/TimeEntries";
import { Total } from "./Total/Total";
import classes from "./Report.module.scss";

import isElectron from "is-electron";
import { MessageBoxOptions, MessageBoxReturnValue } from "electron";
const ipcRenderer = isElectron() ? window.require("electron").ipcRenderer : null;

type Props = {
    onReset?(): void;
    onDeleteItem?(loggedTime: LoggedTime): void;
}

export const Report: FC<Props> = (props) => {

    const dispatch = useAppDispatch();

    const clearHandler = () => {
        if (isElectron()) {
            ipcRenderer!
                .invoke("show-modal", {
                    type: "warning",
                    title: "Delete confirmation",
                    message: "Are you sure you want to clear all entries?",
                    buttons: ["Yes", "Cancel"],
                    cancelId: 1,
                    defaultId: 1
                } as MessageBoxOptions)
                .then((result: MessageBoxReturnValue) => {
                    if (result.response === 0) {
                        dispatch(jiraPointsActions.reset());
                        if (props.onReset != null) {
                            props.onReset();
                        }
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        }
        // Fallback for browser
        else {
            const confirmed = window.confirm("Are you sure you want to clear all entries?");
            if (confirmed) {
                dispatch(jiraPointsActions.reset());
                if (props.onReset != null) {
                    props.onReset();
                }
            }
        }
    };

    return (
        <div className={classes.report}>
            <hr className={classes.ruler} />
            <div className={classes.content}>
                <div className={classes.container}>
                   <TimeEntries onDeleteItem={props.onDeleteItem} />
                </div>

                <div className={classes.container}>
                    <Total type={LoggTimeTypeEnum.NORMAL} />
                </div>

                <div className={classes.container}>
                    <Total type={LoggTimeTypeEnum.BUG} />
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
