import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { LoggedTime, LoggTimeTypeEnum } from "../../../store";
import { Series } from "./Series";

describe("SeriesItem component", () => {

    const testIds = {
        seriesItem: "SeriesItem_container"
    };

    test("render a time log series with 3 normal items", () => {
        // Arrange
        const times: Array<LoggedTime> = [
            {
                id: 1,
                type: LoggTimeTypeEnum.NORMAL,
                time: {hours: 2, minutes: 30},
                decimalTime: "2.50"
            },
            {
                id: 2,
                type: LoggTimeTypeEnum.NORMAL,
                time: {hours: 1, minutes: 25},
                decimalTime: "1.25"
            },
            {
                id: 3,
                type: LoggTimeTypeEnum.NORMAL,
                time: {hours: 1, minutes: 0},
                decimalTime: "1.00"
            }
        ];
        render(<Series times={times} />);


        // Assert
        const seriesItems: Array<HTMLDivElement> = screen.getAllByTestId(testIds.seriesItem);
        expect(seriesItems).toHaveLength(times.length);
    });

    test("should emit an event with loggedTime payload when clicked on delete button of an item", () => {
        // Arrange
        window.confirm = jest.fn(() => {
            return true;
        });
        const times: Array<LoggedTime> = [
            {
                id: 1,
                type: LoggTimeTypeEnum.NORMAL,
                time: {hours: 2, minutes: 30},
                decimalTime: "2.50"
            },
            {
                id: 2,
                type: LoggTimeTypeEnum.NORMAL,
                time: {hours: 1, minutes: 25},
                decimalTime: "1.25"
            },
            {
                id: 3,
                type: LoggTimeTypeEnum.NORMAL,
                time: {hours: 1, minutes: 0},
                decimalTime: "1.00"
            }
        ];
        let payload: LoggedTime|undefined = undefined;
        const deleteItemHandler = (loggedTime: LoggedTime) => {
            payload = loggedTime;
        };
        render(<Series times={times} onDeleteItem={deleteItemHandler}/>);

        // Act
        const deleteButton: HTMLButtonElement = screen.getAllByTestId<HTMLButtonElement>("SeriesItem_deleteButton")[0];
        userEvent.click(deleteButton);

        // Assert
        expect(payload).toStrictEqual(times[0]);
    });
});
