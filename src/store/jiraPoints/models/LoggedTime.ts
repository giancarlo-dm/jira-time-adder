import { LoggTimeTypeEnum } from "../LoggTimeType.enum";
import { Time } from "./Time";

/**
 * A Logged Time reference with a given type and the time in both decimal ({@link BigNumber}) and
 * time ({@link Time}) notation.
 *
 * @since 0.1.0
 */
export interface LoggedTime {

    /**
     * LoggedTime identifier.
     */
    id: number;
    /**
     * The logged time in time notation.
     */
    time: Time;
    /**
     * The logged time in decimal notation.
     */
    decimalTime: string;
    /**
     * The type of this logged time.
     */
    type: LoggTimeTypeEnum;
}
