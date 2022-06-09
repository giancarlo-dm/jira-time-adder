import { BigNumber } from "bignumber.js";

import { LoggedTime } from "./LoggedTime.model.js";
import { Time } from "./Time.model.js";
import { LoggTimeTypeEnum } from "./LoggTimeType.enum.js";

export class JiraTimeAdderService {

    //#region Constants
    /**
     * Constant to be used as a denominator in points calculation.
     */
    readonly #pointsDenominator: number = 4;
    //#endregion

    //#region Private Attributes
    /**
     * List of {@link LoggTimeTypeEnum.NORMAL} logged times.
     */
    readonly #loggedTimes: Array<LoggedTime>;
    /**
     * List of {@link LoggTimeTypeEnum.BUG} logged times.
     */
    readonly #bugsLoggedTimes: Array<LoggedTime>;
    /**
     * Sum of {@link LoggTimeTypeEnum.NORMAL} times.
     */
    readonly #totalTimeSpent: Time;
    /**
     * Sum of {@link LoggTimeTypeEnum.BUG} times.
     */
    readonly #totalBugsTimeSpent: Time;
    /**
     * Total points of {@link LoggTimeTypeEnum.NORMAL}
     */
    #totalPointsSpent: BigNumber;
    /**
     * Total points of {@link LoggTimeTypeEnum.BUG}
     */
    #totalBugsPointsSpent: BigNumber;
    //#endregion

    //#region Constructor
    constructor() {
        this.#loggedTimes = [];
        this.#bugsLoggedTimes = [];
        this.#totalTimeSpent = new Time();
        this.#totalBugsTimeSpent = new Time();
        this.#totalPointsSpent = new BigNumber(0);
        this.#totalBugsPointsSpent = new BigNumber(0);
    }
    //#endregion
    
    //#region Getters
    /**
     * A shallow-copy of the {@link LoggTimeTypeEnum.NORMAL} logged times.
     */
    get loggedTimes() {
        return [...this.#loggedTimes];
    }
    /**
     * A shallow-copy of the {@link LoggTimeTypeEnum.BUG} logged times.
     */
    get bugsLoggedTimes() {
        return [...this.#bugsLoggedTimes];
    }
    /**
     * Sum of {@link LoggTimeTypeEnum.NORMAL} times.
     */
    get totalTimeSpent() {
        return new Time(this.#totalTimeSpent.hours, this.#totalTimeSpent.minutes);
    }
    /**
     * Sum of {@link LoggTimeTypeEnum.BUG} times.
     */
    get totalBugsTimeSpent() {
        return new Time(this.#totalBugsTimeSpent.hours, this.#totalBugsTimeSpent.minutes);
    }
    /**
     * Total points of {@link LoggTimeTypeEnum.NORMAL}
     */
    get totalPointsSpent() {
        return this.#totalPointsSpent.toString();     
    }
    /**
     * Total points of {@link LoggTimeTypeEnum.BUG}
     */
    get totalBugsPointsSpent() {
        return this.#totalBugsPointsSpent.toString();
    }
    //#endregion

    //#region Public Methods
    /**
     * Adds a time to the logged series.
     * @param timeStr The time string in time notation ("01:30") or decimal notation ("1.5").
     * @param type The type of the time to add.
     */
    addTime(timeStr: string, type: LoggTimeTypeEnum) {

        let time: Time;
        let decimalTime: BigNumber;

        if (timeStr.includes(".") || !timeStr.includes(":")) {
            decimalTime = new BigNumber(timeStr);
            time = this.#convertDecimalToTime(decimalTime);
        }
        else {
            const timeSplit = timeStr.split(":");
            time = new Time(Number(timeSplit[0]), Number(timeSplit[1].padEnd(2, "0")));
            decimalTime = this.#convertTimeToDecimal(time);
        }

        const loggedTime = new LoggedTime(time, decimalTime, type);
        switch (loggedTime.type) {
            case LoggTimeTypeEnum.NORMAL:
                this.#loggedTimes.push(loggedTime);
                this.#totalTimeSpent.add(loggedTime.time);
                this.#totalPointsSpent = this.#convertTimeToDecimal(this.#totalTimeSpent)
                    .dividedBy(this.#pointsDenominator)
                    .decimalPlaces(1, BigNumber.ROUND_CEIL);
                break;
            case LoggTimeTypeEnum.BUG:
                this.#bugsLoggedTimes.push(loggedTime);
                this.#totalBugsTimeSpent.add(loggedTime.time);
                this.#totalBugsPointsSpent = this.#convertTimeToDecimal(this.#totalBugsTimeSpent)
                    .dividedBy(this.#pointsDenominator)
                    .decimalPlaces(1, BigNumber.ROUND_CEIL);
                break;
        }
    }

    /**
     * Removes a logged time to the series. Will automatically detect the type and remove from the
     * correct series.
     * @param loggedTime The logged time to remove
     */
    removeLoggedTime(loggedTime: LoggedTime) {

        if (loggedTime.type === LoggTimeTypeEnum.NORMAL) {
            const index = this.#loggedTimes.findIndex(lt => lt.id === loggedTime.id);
            if (index !== -1) {
                const loggedTime = this.#loggedTimes[index];
                this.#loggedTimes.splice(index, 1);

                this.#totalTimeSpent.subtract(loggedTime.time);
                this.#totalPointsSpent = this.#convertTimeToDecimal(this.#totalTimeSpent)
                    .dividedBy(this.#pointsDenominator)
                    .decimalPlaces(1, BigNumber.ROUND_CEIL);
            }
        }
        else if (loggedTime.type === LoggTimeTypeEnum.BUG) {
            const index = this.#bugsLoggedTimes.findIndex(lt => lt.id === loggedTime.id);
            if (index !== -1) {
                const loggedTime = this.#bugsLoggedTimes[index];
                this.#bugsLoggedTimes.splice(index, 1);

                this.#totalBugsTimeSpent.subtract(loggedTime.time);
                this.#totalBugsPointsSpent = this.#convertTimeToDecimal(this.#totalBugsTimeSpent)
                    .dividedBy(this.#pointsDenominator)
                    .decimalPlaces(1, BigNumber.ROUND_CEIL);
            }
        }
    }
    //#endregion

    //#region Private Methods
    /**
     * @param timeDecimal
     */
    #convertDecimalToTime(timeDecimal: BigNumber): Time {
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
    #convertTimeToDecimal(time: Time): BigNumber {
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
}
