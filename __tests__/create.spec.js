import { describe } from "node:test";
import DataHandler from "../DataHandler";
import Model from "../Model";

const testFilePath = "test.json";

describe("Add new task", () => {
    test('new task can be added', () => {
        const handler = new DataHandler(testFilePath);
        handler.flush();

        new Model(handler).createNewTask("new task");

        const data = handler.read().find((row) => row.description == "new task");

        expect(data).not.toBeNull();
    });

    test('many new task can be added', () => {
        const handler = new DataHandler(testFilePath);
        handler.flush();

        const existingCount = handler.read().length;

        new Model(handler).createNewTask("new task");
        new Model(handler).createNewTask("new task");
        new Model(handler).createNewTask("new task");

        const newCount = handler.read().length;

        expect(newCount).toEqual(existingCount + 3);
    });

    test('unique ids are assigned while creating new tasks', () => {
        const handler = new DataHandler(testFilePath);
        handler.flush();

        const latestId = new Model(handler).getNewId();

        new Model(handler).createNewTask("new task");

        const data = handler.read().find((row) => row.description == "new task");

        expect(latestId).toEqual(data.id);
    });
})