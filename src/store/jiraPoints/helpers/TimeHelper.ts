import { BigNumber } from "bignumber.js";

import { Time } from "../models";

export class TimeHelper {

    /**
     * Creates a new Time object.
     * @param hours The hours
     * @param minutes The minutes
     */
    static create(hours: number, minutes: number): Time {
        return {
            hours: hours,
            minutes: minutes
        };
    }

    /**
     * Add two times, returning a new instance.
     * @param time1
     * @param time2
     */
    static add(time1: Time, time2: Time): Time {
        let hours = time1.hours + time2.hours;
        let minutes = time1.minutes + time2.minutes;

        const hoursToSum = (new BigNumber(minutes))
            .dividedBy(60)
            .decimalPlaces(0, BigNumber.ROUND_FLOOR)
            .toNumber();

        hours += hoursToSum;
        minutes -= hoursToSum * 60;

        return {
            hours: hours,
            minutes: minutes
        };
    }

    /**
     * Subtract two times, returning a new instance.
     * @param time1
     * @param time2
     */
    static subtract(time1: Time, time2: Time): Time {
        let currentTimeInMinutes = (time1.hours * 60) + time1.minutes;
        let timeInMinutes = (time2.hours * 60) + time2.minutes;

        currentTimeInMinutes -= timeInMinutes;

        const hours = (new BigNumber(currentTimeInMinutes))
            .dividedBy(60)
            .decimalPlaces(0, BigNumber.ROUND_FLOOR)
            .toNumber();
        const minutes = currentTimeInMinutes - (hours * 60);

        return {
            hours: hours,
            minutes: minutes
        };
    }

    /**
     * Formats time to a human-readable string with the format "00:00".
     */
    static format(time: Time): string {
        return `${time.hours.toString().padStart(2, "0")}:${time.minutes.toString().padStart(2, "0")}`;
    }

    /**
     * @param timeDecimal
     */
    static convertDecimalToTime(timeDecimal: string): Time {
        const decimalTimeStrSplit = timeDecimal.split(".");
        const hours = Number(decimalTimeStrSplit[0]);
        const minutes = decimalTimeStrSplit[1] != null
            ? (new BigNumber(decimalTimeStrSplit[1].padEnd(2, "0")))
                .multipliedBy(60)
                .dividedBy(100)
                .decimalPlaces(0, BigNumber.ROUND_CEIL)
                .toNumber()
            : 0;

        return {
            hours: hours,
            minutes: minutes
        };
    }

    /**
     * @param time
     */
    static convertTimeToDecimal(time: Time): string {
        const hoursStr = time.hours.toString();
        const minutesStr = (new BigNumber(time.minutes))
            .multipliedBy(100)
            .dividedBy(60)
            .decimalPlaces(0, BigNumber.ROUND_CEIL)
            .toString()
            .padStart(2, "0");

        return `${hoursStr}.${minutesStr}`;
    }
}
