import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { LoggTimeTypeEnum } from "../../store";
import { AddTimeForm } from "./AddTimeForm";


describe("AddTimeForm component",  () => {

    const testIds = {
        input: "timeInput",
        addTimeButton: "addTimeButton",
        addBugTimeButton: "addBugTimeButton",
    };

    test("renders an input with two buttons", () => {
        // Arrange
        render(<AddTimeForm />);

        // Assert
        const input: HTMLInputElement = screen.getByTestId(testIds.input);
        const addTimeButton: HTMLButtonElement = screen.getByTestId(testIds.addTimeButton);
        const addBugTimeButton: HTMLButtonElement = screen.getByTestId(testIds.addBugTimeButton);

        expect(input).toBeInTheDocument();
        expect(input).toBeInstanceOf(HTMLInputElement);
        expect(addTimeButton).toBeInTheDocument();
        expect(addTimeButton).toBeInstanceOf(HTMLButtonElement);
        expect(addBugTimeButton).toBeInTheDocument();
        expect(addBugTimeButton).toBeInstanceOf(HTMLButtonElement);
    });

    test("\"Add Time\" button correctly emits input data", () => {
        // Arrange
        let payload: {time: string, loggTimeType: LoggTimeTypeEnum}|undefined = undefined;
        const addTimeTimeHandler = (time: string, loggTimeType: LoggTimeTypeEnum) => {
            payload = {time: time, loggTimeType: loggTimeType};
        };
        render(<AddTimeForm onAddTime={addTimeTimeHandler} />);

        // Act
        const input: HTMLInputElement = screen.getByTestId(testIds.input);
        const addTimeButton: HTMLButtonElement = screen.getByTestId(testIds.addTimeButton);

        input.value = "2.5";
        userEvent.click(addTimeButton);

        // Assert
        expect(payload).toStrictEqual({time: "2.5", loggTimeType: LoggTimeTypeEnum.NORMAL});
    });

    test("\"Add Bug Time\" button correctly emits input data", () => {
        // Arrange
        let payload: {time: string, loggTimeType: LoggTimeTypeEnum}|undefined = undefined;
        const addTimeTimeHandler = (time: string, loggTimeType: LoggTimeTypeEnum) => {
            payload = {time: time, loggTimeType: loggTimeType};
        };
        render(<AddTimeForm onAddTime={addTimeTimeHandler} />);

        // Act
        const input: HTMLInputElement = screen.getByTestId(testIds.input);
        const addBugTimeButton: HTMLButtonElement = screen.getByTestId(testIds.addBugTimeButton);

        input.value = "2.5";
        userEvent.click(addBugTimeButton);

        // Assert
        expect(payload).toStrictEqual({time: "2.5", loggTimeType: LoggTimeTypeEnum.BUG});
    });

    test("shortcut \"Enter\" works correctly and emit \"NORMAL\" time", () => {
        // Arrange
        let payload: {time: string, loggTimeType: LoggTimeTypeEnum}|undefined = undefined;
        const addTimeTimeHandler = (time: string, loggTimeType: LoggTimeTypeEnum) => {
            payload = {time: time, loggTimeType: loggTimeType};
        };
        render(<AddTimeForm onAddTime={addTimeTimeHandler} />);

        // Act
        const input: HTMLInputElement = screen.getByTestId(testIds.input);

        input.value = "2.5";
        fireEvent.keyDown(input, {code: "Enter"});

        // Assert
        expect(payload).toStrictEqual({time: "2.5", loggTimeType: LoggTimeTypeEnum.NORMAL});

    });

    test("shortcut \"CTRL+Enter\" works correctly and emit \"BUG\" time", () => {
        // Arrange
        let payload: {time: string, loggTimeType: LoggTimeTypeEnum}|undefined = undefined;
        const addTimeTimeHandler = (time: string, loggTimeType: LoggTimeTypeEnum) => {
            payload = {time: time, loggTimeType: loggTimeType};
        };
        render(<AddTimeForm onAddTime={addTimeTimeHandler} />);

        // Act
        const input: HTMLInputElement = screen.getByTestId(testIds.input);

        input.value = "2.5";
        fireEvent.keyDown(input, {code: "Enter", ctrlKey: true});

        // Assert
        expect(payload).toStrictEqual({time: "2.5", loggTimeType: LoggTimeTypeEnum.BUG});
    });
});
