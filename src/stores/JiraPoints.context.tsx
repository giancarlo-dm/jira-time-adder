import { BigNumber } from "bignumber.js";
import { createContext, FC, PropsWithChildren, useReducer } from "react";

import { LoggedTime } from "./LoggedTime.model";
import { LoggTimeTypeEnum } from "./LoggTimeType.enum";
import { Time } from "./Time.model";

//#region Store
const defaultJiraPoints: JiraPoints = {
    loggedTimes: [],
    bugsLoggedTimes: [],
    totalTimeSpent: new Time(0, 0),
    totalBugsTimeSpent: new Time(0, 0),
    totalPointsSpent: "0.0",
    totalBugsPointsSpent: "0.0"
};

const defaultStoreValue: JiraPointsStore = {
    ...defaultJiraPoints,
    addTime() {},
    removeTime() {},
    reset() {}
};

export const JiraPointsContextProvider: FC<PropsWithChildren> = (props) => {

    //#region Reducers
    const [state, dispatcher] = useReducer(
        (state: JiraPoints, action: JiraPointsActions) => {
            switch (action.type) {
                case "ADD_TIME":
                    return addTime(state, action.payload.timeStr, action.payload.type);
                case "REMOVE_TIME":
                    return removeTime(state, action.payload.loggedTime);
                case "RESET":
                    return reset();
                default:
                    return state;
            }
        },
        defaultJiraPoints
    );
    //#endregion

    //#region Render
    const contextValue: JiraPointsStore = {
        ...state,
        addTime(timeStr: string, type: LoggTimeTypeEnum): void {
            dispatcher({type: "ADD_TIME", payload: {timeStr: timeStr, type: type}});
        },
        removeTime(loggedTime: LoggedTime): void {
            dispatcher({type: "REMOVE_TIME", payload: {loggedTime: loggedTime}});
        },
        reset(): void {
            dispatcher({type: "RESET"});
        }
    };

    return (
        <JiraPointsContext.Provider value={contextValue}>
            {props.children}
        </JiraPointsContext.Provider>
    );
    //#endregion
};

export const JiraPointsContext = createContext<JiraPointsStore>(defaultStoreValue);

export type JiraPointsStore = JiraPoints & {
    /**
     * Adds a time to the logged series.
     * @param timeStr The time string in time notation ("01:30") or decimal notation ("1.5").
     * @param type The type of the time to add.
     * @return {void}
     */
    addTime(timeStr: string, type: LoggTimeTypeEnum): void;
    /**
     * Removes a logged time to the series. Will automatically detect the type and remove from the
     * correct series.
     * @param loggedTime The logged time to remove
     * @return {void}
     */
    removeTime(loggedTime: LoggedTime): void;
    /**
     * Resets the Store to its default value, resetting all time entries and totals.
     */
    reset(): void
}

/**
 * Actions available to the store
 */
export type JiraPointsActions =
    { type: "ADD_TIME", payload: { timeStr: string, type: LoggTimeTypeEnum } }
    | { type: "REMOVE_TIME", payload: { loggedTime: LoggedTime } }
    | { type: "RESET" };
//#endregion

//#region Reducer
/**
 * {@link JiraPointsStore.addTime}
 */
function addTime(state: JiraPoints, timeStr: string, type: LoggTimeTypeEnum): JiraPoints {
    let time: Time;
    let decimalTime: BigNumber;

    if (timeStr.includes(".") || !timeStr.includes(":")) {
        decimalTime = new BigNumber(timeStr);
        time = convertDecimalToTime(decimalTime);
    }
    else {
        const timeSplit = timeStr.split(":");
        time = new Time(Number(timeSplit[0]), Number(timeSplit[1].padEnd(2, "0")));
        decimalTime = convertTimeToDecimal(time);
    }

    const loggedTime = new LoggedTime(time, decimalTime, type);
    const newState = {...state};
    switch (loggedTime.type) {
        case LoggTimeTypeEnum.NORMAL:
            newState.loggedTimes = [...newState.loggedTimes, loggedTime];
            newState.totalTimeSpent = newState.totalTimeSpent.add(loggedTime.time);
            newState.totalPointsSpent = convertTimeToDecimal(newState.totalTimeSpent)
                .dividedBy(4)
                .decimalPlaces(1, BigNumber.ROUND_CEIL)
                .toFixed(1);
            return newState;
        case LoggTimeTypeEnum.BUG:
            newState.bugsLoggedTimes = [...newState.bugsLoggedTimes, loggedTime];
            newState.totalBugsTimeSpent = newState.totalBugsTimeSpent.add(loggedTime.time);
            newState.totalBugsPointsSpent = convertTimeToDecimal(newState.totalBugsTimeSpent)
                .dividedBy(4)
                .decimalPlaces(1, BigNumber.ROUND_CEIL)
                .toFixed(1);
            return newState;
        default:
            throw new Error("Invalid LoggTimeType");
    }
}

/**
 * {@link JiraPointsStore.removeTime}
 */
function removeTime(state: JiraPoints, loggedTime: LoggedTime): JiraPoints {
    if (loggedTime.type === LoggTimeTypeEnum.NORMAL) {
        const index = state.loggedTimes.findIndex(lt => lt.id === loggedTime.id);
        if (index !== -1) {
            const loggedTimeToRemove: LoggedTime = state.loggedTimes[index];
            const newState: JiraPoints = {...state};
            newState.loggedTimes = [...newState.loggedTimes.slice(0, index), ...newState.loggedTimes.slice(index + 1)];
            newState.totalTimeSpent = newState.totalTimeSpent.subtract(loggedTimeToRemove.time);
            newState.totalPointsSpent = convertTimeToDecimal(newState.totalTimeSpent)
                .dividedBy(4)
                .decimalPlaces(1, BigNumber.ROUND_CEIL)
                .toFixed(1);

            return newState;
        }
    }
    else if (loggedTime.type === LoggTimeTypeEnum.BUG) {
        const index = state.bugsLoggedTimes.findIndex(lt => lt.id === loggedTime.id);
        if (index !== -1) {
            const bugLoggedTimeToRemove: LoggedTime = state.bugsLoggedTimes[index];
            const newState = {...state};
            newState.bugsLoggedTimes = [...newState.bugsLoggedTimes.slice(0, index), ...newState.bugsLoggedTimes.slice(index + 1)];
            newState.totalBugsTimeSpent = newState.totalBugsTimeSpent.subtract(bugLoggedTimeToRemove.time);
            newState.totalBugsPointsSpent = convertTimeToDecimal(newState.totalBugsTimeSpent)
                .dividedBy(4)
                .decimalPlaces(1, BigNumber.ROUND_CEIL)
                .toFixed(1);

            return newState;
        }
    }
    else {
        throw new Error("Invalid LoggTimeType");
    }

    return state;
}

/**
 * {@link JiraPointsStore.reset}
 */
function reset(): JiraPoints {
    return defaultJiraPoints;
}

type JiraPoints = {
    loggedTimes: Array<LoggedTime>;
    bugsLoggedTimes: Array<LoggedTime>;
    totalTimeSpent: Time;
    totalBugsTimeSpent: Time;
    totalPointsSpent: string;
    totalBugsPointsSpent: string;
}
//#endregion

//#region Helper Methods
/**
 * @param timeDecimal
 */
function convertDecimalToTime(timeDecimal: BigNumber): Time {
    const decimalTimeStrSplit = timeDecimal.toString().split(".");
    const hours = Number(decimalTimeStrSplit[0]);
    const minutes = decimalTimeStrSplit[1] != null
        ? (new BigNumber(decimalTimeStrSplit[1].padEnd(2, "0")))
            .multipliedBy(60)
            .dividedBy(100)
            .decimalPlaces(0, BigNumber.ROUND_CEIL)
            .toNumber()
        : 0;

    return new Time(hours, minutes);
}

/**
 * @param time
 */
function convertTimeToDecimal(time: Time): BigNumber {
    const hoursStr = time.hours.toString();
    const minutesStr = (new BigNumber(time.minutes))
        .multipliedBy(100)
        .dividedBy(60)
        .decimalPlaces(0, BigNumber.ROUND_CEIL)
        .toString()
        .padStart(2, "0");

    return new BigNumber(`${hoursStr}.${minutesStr}`);
}

//#endregion
