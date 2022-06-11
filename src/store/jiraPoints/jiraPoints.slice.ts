import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/src/createAction";
import { BigNumber } from "bignumber.js";

import { LoggedTimeHelper, TimeHelper } from "./helpers";
import { LoggTimeTypeEnum } from "./LoggTimeType.enum";
import { JiraPoints, LoggedTime, Time } from "./models";

const defaultState: JiraPoints = {
    loggedTimes: [],
    bugsLoggedTimes: [],
    totalTimeSpent: {hours: 0, minutes: 0},
    totalBugsTimeSpent: {hours: 0, minutes: 0},
    totalPointsSpent: "0.0",
    totalBugsPointsSpent: "0.0"
};

export const jiraPointsSlice = createSlice({
    name: "jiraPoints",
    initialState: defaultState,
    reducers: {
        addTime(state: JiraPoints, {payload: {timeStr, type}}: PayloadAction<{timeStr: string, type: LoggTimeTypeEnum}>): void {
            let time: Time;
            let decimalTime: string;

            if (timeStr.includes(".") || !timeStr.includes(":")) {
                decimalTime = new BigNumber(timeStr).toFixed(2);
                time = TimeHelper.convertDecimalToTime(decimalTime);
            }
            else {
                const timeSplit = timeStr.split(":");
                time = {
                    hours: Number(timeSplit[0]),
                    minutes: Number(timeSplit[1].padEnd(2, "0"))
                };
                decimalTime = TimeHelper.convertTimeToDecimal(time);
            }

            const loggedTime: LoggedTime = {
                id: LoggedTimeHelper.generateIdSequence(),
                time: time,
                decimalTime: decimalTime,
                type: type
            };

            switch (loggedTime.type) {
                case LoggTimeTypeEnum.NORMAL:
                    state.loggedTimes = [...state.loggedTimes, loggedTime];
                    state.totalTimeSpent = TimeHelper.add(state.totalTimeSpent, loggedTime.time);
                    state.totalPointsSpent = new BigNumber(TimeHelper.convertTimeToDecimal(state.totalTimeSpent))
                        .dividedBy(4)
                        .decimalPlaces(1, BigNumber.ROUND_CEIL)
                        .toFixed(1);
                    break;
                case LoggTimeTypeEnum.BUG:
                    state.bugsLoggedTimes = [...state.bugsLoggedTimes, loggedTime];
                    state.totalBugsTimeSpent = TimeHelper.add(state.totalBugsTimeSpent, loggedTime.time);
                    state.totalBugsPointsSpent = new BigNumber(TimeHelper.convertTimeToDecimal(state.totalBugsTimeSpent))
                        .dividedBy(4)
                        .decimalPlaces(1, BigNumber.ROUND_CEIL)
                        .toFixed(1);
                    break;
                default:
                    throw new Error("Invalid LoggTimeType");
            }
        },
        removeTime(state: JiraPoints, {payload: {loggedTime}}: PayloadAction<{ loggedTime: LoggedTime }>): void {
            if (loggedTime.type === LoggTimeTypeEnum.NORMAL) {
                const index = state.loggedTimes.findIndex(lt => lt.id === loggedTime.id);
                if (index !== -1) {
                    const loggedTimeToRemove: LoggedTime = state.loggedTimes[index];
                    state.loggedTimes = [...state.loggedTimes.slice(0, index), ...state.loggedTimes.slice(index + 1)];
                    state.totalTimeSpent = TimeHelper.subtract(state.totalTimeSpent, loggedTimeToRemove.time);
                    state.totalPointsSpent = new BigNumber(TimeHelper.convertTimeToDecimal(state.totalTimeSpent))
                        .dividedBy(4)
                        .decimalPlaces(1, BigNumber.ROUND_CEIL)
                        .toFixed(1);
                }
            }
            else if (loggedTime.type === LoggTimeTypeEnum.BUG) {
                const index = state.bugsLoggedTimes.findIndex(lt => lt.id === loggedTime.id);
                if (index !== -1) {
                    const bugLoggedTimeToRemove: LoggedTime = state.bugsLoggedTimes[index];
                    state.bugsLoggedTimes = [...state.bugsLoggedTimes.slice(0, index), ...state.bugsLoggedTimes.slice(index + 1)];
                    state.totalBugsTimeSpent = TimeHelper.subtract(state.totalBugsTimeSpent, bugLoggedTimeToRemove.time);
                    state.totalBugsPointsSpent = new BigNumber(TimeHelper.convertTimeToDecimal(state.totalBugsTimeSpent))
                        .dividedBy(4)
                        .decimalPlaces(1, BigNumber.ROUND_CEIL)
                        .toFixed(1);
                }
            }
            else {
                throw new Error("Invalid LoggTimeType");
            }
        },
        reset(): JiraPoints {
            return defaultState;
        }
    }
});
