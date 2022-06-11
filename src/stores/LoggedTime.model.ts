import { BigNumber } from "bignumber.js";

import { LoggTimeTypeEnum } from "./LoggTimeType.enum";

import { Time } from "./Time.model";

/**
 * A Logged Time reference with a given type and the time in both decimal ({@link BigNumber}) and
 * time ({@link Time}) notation.
 *
 * @since 0.1.0
 */
export class LoggedTime {

    //#region Static Private Attributes
    /**
     * Id sequence generator.
     */
    static #idSequence = 1;
    //#endregion

    //#region Private Attributes
    /**
     * LoggedTime identifier.
     */
    readonly #id: number;
    //#endregion

    //#region Public Attributes
    /**
     * The logged time in time notation.
     */
    time: Time;
    /**
     * The logged time in decimal notation.
     */
    decimalTime: BigNumber;
    /**
     * The type of this logged time.
     */
    type: LoggTimeTypeEnum;
    //#endregion

    //#region Constructor
    /**
     * @param time
     * @param decimalTime
     * @param type
     */
    constructor(time: Time, decimalTime: BigNumber, type: LoggTimeTypeEnum) {
        this.#id = LoggedTime.#idSequence++;
        this.time = time;
        this.decimalTime = decimalTime;
        this.type = type;
    }
    //#endregion

    //#region Getters
    /**
     * LoggedTime identifier.
     */
    get id() {
        return this.#id;
    }
    //#endregion
}
