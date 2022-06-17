import { FC } from "react";

import {
    jiraPointsActions, LoggedTime, LoggTimeTypeEnum, TimeHelper, useAppDispatch
} from "../../../store";
import classes from "./SeriesItem.module.scss";

import isElectron from "is-electron";
import { MessageBoxOptions, MessageBoxReturnValue } from "electron";
const ipcRenderer = isElectron() ? window.require("electron").ipcRenderer : null;

type Props = {
    loggedTime: LoggedTime;
    onDelete?(): void;
}

/**
 * Component that represents an item of the {@link Series}, showing the logged time entry with
 * applied styles depending on the {@link LoggedTime.type}.
 *
 * ## User actions
 * - Delete: Deletes the current item from the time series. Modify the {@link JiraPoints}
 * store slice.
 *
 * ## Events:
 * - {@link Props.onDelete} when an item is deleted.
 *
 * @param props
 *
 * @since 0.1.0
 */
export const SeriesItem: FC<Props> = (props) => {

    const dispatch = useAppDispatch();

    const classType = props.loggedTime.type === LoggTimeTypeEnum.NORMAL
        ? classes.normal
        : props.loggedTime.type === LoggTimeTypeEnum.BUG
            ? classes.bug
            : "";

    const deleteItemHandler = () => {
        if (isElectron()) {
            ipcRenderer!
                .invoke("show-modal", {
                    type: "warning",
                    title: "Delete confirmation",
                    message: "Are you sure you want to delete this entry?",
                    detail: `Entry: ${TimeHelper.format(props.loggedTime.time)} (${props.loggedTime.decimalTime})`,
                    buttons: ["Yes", "Cancel"],
                    cancelId: 1,
                    defaultId: 1
                } as MessageBoxOptions)
                .then((result: MessageBoxReturnValue) => {
                    if (result.response === 0) {
                        dispatch(jiraPointsActions.removeTime({loggedTime: props.loggedTime}));
                        if (props.onDelete != null) {
                            props.onDelete();
                        }
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        }
        // Fallback for browser
        else {
            const confirmed = window.confirm(`Are you sure you want to delete this entry?\n\nEntry: ${TimeHelper.format(props.loggedTime.time)} (${props.loggedTime.decimalTime})`);
            if (confirmed) {
                dispatch(jiraPointsActions.removeTime({loggedTime: props.loggedTime}));
                if (props.onDelete != null) {
                    props.onDelete();
                }
            }
        }
    };

    return (
        <div className={`${classes.item} ${classType}`} data-testid="SeriesItem_container">
            <span data-testid="SeriesItem_text">
                {TimeHelper.format(props.loggedTime.time)} ({props.loggedTime.decimalTime})
            </span>
            <button className={classes.deleteButton} data-testid="SeriesItem_deleteButton"
                    onClick={deleteItemHandler} />
        </div>
    );
};
