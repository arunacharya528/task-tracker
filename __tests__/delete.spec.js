import { describe } from "node:test";
import DataHandler from "../DataHandler";
import Model from "../Model";

const testFilePath = "test.json";

describe("Delete existing task", () => {
    test('existing task can be deleted', () => {
        const handler = new DataHandler(testFilePath);
        handler.flush();

        new Model(handler).createNewTask("new task");
        const createdData = handler.read().find((row) => row.description == "new task");

        new Model(handler).deleteTaskById(createdData.id);
        const deletedData = handler.read().find((row) => row.id === createdData.id);

        expect(deletedData).toBeUndefined();
    });

    test('deleting non-existing task will throw exception', () => {
        const handler = new DataHandler(testFilePath);
        handler.flush();

        expect(() => {
            new Model(handler).deleteTaskById(1)
        }).toThrow(Error);
    });
})