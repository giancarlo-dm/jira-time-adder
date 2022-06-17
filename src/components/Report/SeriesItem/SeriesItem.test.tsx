import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";

import {
    JiraPoints, jiraPointsReducer, LoggedTime, LoggTimeTypeEnum, TimeHelper
} from "../../../store";
import { SeriesItem } from "./SeriesItem";

describe("SeriesItem component", () => {

    const testIds = {
        container: "SeriesItem_container",
        text: "SeriesItem_text",
        deleteButton: "SeriesItem_deleteButton"
    };

    let jiraPointsState: JiraPoints;
    let store: EnhancedStore;

    const renderWithStore = (component: JSX.Element) => {
        return (
            <Provider store={store}>
                {component}
            </Provider>
        );
    };

    beforeEach(() => {
        jiraPointsState = {
            loggedTimes: [
                {
                    id: 1,
                    type: LoggTimeTypeEnum.NORMAL,
                    time: {hours: 2, minutes: 30},
                    decimalTime: "2.50"
                }
            ],
            totalPointsSpent: "0.0",
            totalTimeSpent: TimeHelper.create(4, 45),
            bugsLoggedTimes: [
                {
                    id: 1,
                    type: LoggTimeTypeEnum.BUG,
                    time: {hours: 2, minutes: 30},
                    decimalTime: "2.50"
                }
            ],
            totalBugsPointsSpent: "0.0",
            totalBugsTimeSpent: TimeHelper.create(0, 0)
        };

        store = configureStore({
            reducer: {
                jiraPoints: jiraPointsReducer
            },
            preloadedState: {
                jiraPoints: jiraPointsState
            }
        });
    });

    test("renders an \"NORMAL\" item with correct style, text and delete button", () => {
        // Arrange
        const loggedTime: LoggedTime = jiraPointsState.loggedTimes[0];
        render(renderWithStore(<SeriesItem loggedTime={loggedTime} />));

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
        const loggedTime: LoggedTime = jiraPointsState.bugsLoggedTimes[0];
        render(renderWithStore(<SeriesItem loggedTime={loggedTime} />));

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

        const loggedTime: LoggedTime = jiraPointsState.loggedTimes[0];
        let payload: Array<any> | undefined = undefined;
        const deleteHandler = (...args: Array<any>) => {
            payload = args;
        };
        render(renderWithStore(<SeriesItem loggedTime={loggedTime} onDelete={deleteHandler} />));

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
        let payload: Array<any> | undefined = undefined;
        const deleteHandler = (...args: Array<any>) => {
            payload = args;
        };
        render(renderWithStore(<SeriesItem loggedTime={loggedTime} onDelete={deleteHandler} />));

        // Act
        const deleteButton: HTMLButtonElement = screen.getByTestId(testIds.deleteButton);
        userEvent.click(deleteButton);

        // Assert
        expect(payload).toStrictEqual(undefined);
    });

    test("should delete the \"NORMAL\" loggedTime on the store", () => {
        // Arrange
        window.confirm = jest.fn(() => {
            return true;
        });

        const loggedTime: LoggedTime = jiraPointsState.loggedTimes[0];
        render(renderWithStore(<SeriesItem loggedTime={loggedTime} />));

        // Act
        const deleteButton: HTMLButtonElement = screen.getByTestId(testIds.deleteButton);
        userEvent.click(deleteButton);

        // Assert
        const storeState: { jiraPoints: JiraPoints } = store.getState();
        expect(storeState.jiraPoints.loggedTimes).toStrictEqual([]);
    });

    test("should delete the \"BUG\" loggedTime on the store", () => {
        // Arrange
        window.confirm = jest.fn(() => {
            return true;
        });

        const loggedTime: LoggedTime = jiraPointsState.bugsLoggedTimes[0];
        render(renderWithStore(<SeriesItem loggedTime={loggedTime} />));

        // Act
        const deleteButton: HTMLButtonElement = screen.getByTestId(testIds.deleteButton);
        userEvent.click(deleteButton);

        // Assert
        const storeState: { jiraPoints: JiraPoints } = store.getState();
        expect(storeState.jiraPoints.bugsLoggedTimes).toStrictEqual([]);
    });
});
