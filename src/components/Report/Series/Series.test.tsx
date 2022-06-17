import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";

import {
    JiraPoints, jiraPointsReducer, LoggedTime, LoggTimeTypeEnum, TimeHelper
} from "../../../store";
import { Series } from "./Series";

describe("SeriesItem component", () => {

    const testIds = {
        seriesItem: "SeriesItem_container"
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
            ],
            totalPointsSpent: "1.2",
            totalTimeSpent: TimeHelper.create(4, 45),
            bugsLoggedTimes: [],
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

    test("render a time log series with 3 normal items", () => {
        // Arrange
        render(renderWithStore(<Series type={LoggTimeTypeEnum.NORMAL} />));

        // Assert
        const seriesItems: Array<HTMLDivElement> = screen.getAllByTestId(testIds.seriesItem);
        expect(seriesItems).toHaveLength(jiraPointsState.loggedTimes.length);
    });

    test("should emit an event with loggedTime payload when clicked on delete button of an item", () => {
        // Arrange
        window.confirm = jest.fn(() => {
            return true;
        });
        let payload: LoggedTime | undefined = undefined;
        const deleteItemHandler = (loggedTime: LoggedTime) => {
            payload = loggedTime;
        };
        render(renderWithStore(<Series type={LoggTimeTypeEnum.NORMAL} onDeleteItem={deleteItemHandler} />));

        // Act
        const deleteButton: HTMLButtonElement = screen.getAllByTestId<HTMLButtonElement>("SeriesItem_deleteButton")[0];
        userEvent.click(deleteButton);

        // Assert
        expect(payload).toStrictEqual(jiraPointsState.loggedTimes[0]);
    });
});
