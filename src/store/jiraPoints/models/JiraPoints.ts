import { LoggedTime } from "./LoggedTime";
import { Time } from "./Time";

export interface JiraPoints {

    loggedTimes: Array<LoggedTime>;
    bugsLoggedTimes: Array<LoggedTime>;
    totalTimeSpent: Time;
    totalBugsTimeSpent: Time;
    totalPointsSpent: string;
    totalBugsPointsSpent: string;
}
