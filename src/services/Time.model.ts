import { BigNumber } from "bignumber.js";

/**
 * Represents a time (hours and minutes) and allows math operations like add and subtract.
 * @since 0.1.0
 */
export class Time {

    //#region Public Attributes
    /**
     * Holds the "Hours" part.
     */
    hours: number;
    /**
     * Holds the "Minutes" part.
     */
    minutes;
    //#endregion

    //#region Constructor
    /**
     * @param hours The "Hours" part.
     * @param minutes The "Minutes" part.
     */
    constructor(hours: number = 0, minutes: number = 0) {
        this.hours = hours;
        this.minutes = minutes;
    }
    //#endregion

    //#region Public Methods
    /**
     * Add a given time to the current time, modifying the current time.
     * @param time Time to add.
     */
    add(time: Time): void {
        let hours = this.hours + time.hours;
        let minutes = this.minutes + time.minutes;

        const hoursToSum = (new BigNumber(minutes))
            .dividedBy(60)
            .decimalPlaces(0, BigNumber.ROUND_FLOOR)
            .toNumber();

        hours += hoursToSum;
        minutes -= hoursToSum * 60;

        this.hours = hours;
        this.minutes = minutes;
    }

    /**
     * Subtract a given time to the current time, modifying the current time.
     * @param time Time to Subtract.
     */
    subtract(time: Time): void {
        let currentTimeInMinutes = (this.hours * 60) + this.minutes;
        let timeInMinutes = (time.hours * 60) + time.minutes;

        currentTimeInMinutes -= timeInMinutes;

        const hours = (new BigNumber(currentTimeInMinutes))
        .dividedBy(60)
        .decimalPlaces(0, BigNumber.ROUND_FLOOR)
        .toNumber();
        const minutes = currentTimeInMinutes - (hours * 60);

        this.hours = hours;
        this.minutes = minutes;
    }

    /**
     * Converts the current time to a human-readable string with the format "00:00".
     */
    toString(): string {
        return `${this.hours.toString().padStart(2, "0")}:${this.minutes.toString().padStart(2, "0")}`;
    }
    //#endregion
}
