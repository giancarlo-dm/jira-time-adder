import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { LoggedTime, LoggTimeTypeEnum } from "../../../store";
import { SeriesItem } from "./SeriesItem";

describe("SeriesItem component",  () => {

    const testIds = {
        container: "SeriesItem_container",
        text: "SeriesItem_text",
        deleteButton: "SeriesItem_deleteButton"
    };

    test("renders an \"NORMAL\" item with correct style, text and delete button", () => {
        // Arrange
        const loggedTime: LoggedTime = {
            id: 1,
            type: LoggTimeTypeEnum.NORMAL,
            time: {hours: 2, minutes: 30},
            decimalTime: "2.50"
        };
        render(<SeriesItem loggedTime={loggedTime} />);

        // Assert
        const container: HTMLElement = screen.getByTestId(testIds.container);
        const text: HTMLElement = screen.getByTestId(testIds.text);
        const deleteButton: HTMLButtonElement = screen.getByTestId(testIds.deleteButton);

        expect(container).toHaveClass("normal", {exact: false});
        expect(text).toHaveTextContent(/^02:30 \(2.50\)$/);
        expect(deleteButton).toBeInstanceOf(HTMLButtonElement);
    });

    test("renders an \"BUG\" item with correct style, text and delete button", () => {
        // Arrange
        const loggedTime: LoggedTime = {
            id: 1,
            type: LoggTimeTypeEnum.BUG,
            time: {hours: 2, minutes: 30},
            decimalTime: "2.50"
        };
        render(<SeriesItem loggedTime={loggedTime} />);

        // Assert
        const container: HTMLElement = screen.getByTestId(testIds.container);
        const text: HTMLElement = screen.getByTestId(testIds.text);
        const deleteButton: HTMLButtonElement = screen.getByTestId(testIds.deleteButton);

        expect(container).toHaveClass("bug", {exact: false});
        expect(text).toHaveTextContent(/^02:30 \(2.50\)$/);
        expect(deleteButton).toBeInstanceOf(HTMLButtonElement);
    });

    test("should emit an event on delete button passing void if confirmed", () => {
        // Arrange
        window.confirm = jest.fn(() => {
            return true;
        });

        const loggedTime: LoggedTime = {
            id: 1,
            type: LoggTimeTypeEnum.NORMAL,
            time: {hours: 2, minutes: 30},
            decimalTime: "2.50"
        };
        let payload: Array<any>|undefined = undefined;
        const deleteHandler = (...args: Array<any>) => {
            payload = args;
        };
        render(<SeriesItem loggedTime={loggedTime} onDelete={deleteHandler}/>);

        // Act
        const deleteButton: HTMLButtonElement = screen.getByTestId(testIds.deleteButton);
        userEvent.click(deleteButton);

        // Assert
        expect(payload).toStrictEqual([]);
    });

    test("should not emit an event on delete button if not confirmed", () => {
        // Arrange
        window.confirm = jest.fn(() => {
            return false;
        });

        const loggedTime: LoggedTime = {
            id: 1,
            type: LoggTimeTypeEnum.NORMAL,
            time: {hours: 2, minutes: 30},
            decimalTime: "2.50"
        };
        let payload: Array<any>|undefined = undefined;
        const deleteHandler = (...args: Array<any>) => {
            payload = args;
        };
        render(<SeriesItem loggedTime={loggedTime} onDelete={deleteHandler}/>);

        // Act
        const deleteButton: HTMLButtonElement = screen.getByTestId(testIds.deleteButton);
        userEvent.click(deleteButton);

        // Assert
        expect(payload).toStrictEqual(undefined);
    });
});
