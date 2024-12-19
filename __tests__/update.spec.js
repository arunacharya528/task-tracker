import { describe } from "node:test";
import DataHandler from "../DataHandler";
import Model from "../Model";

const testFilePath = "test.json";

describe("Update existing task", () => {
    test('task details can be updated', () => {
        const handler = new DataHandler(testFilePath);
        handler.flush();

        new Model(handler).createNewTask("new task");
        const createdData = handler.read().find((row) => row.description == "new task");

        new Model(handler).updateTaskById(createdData.id, { description: "new description", status: "random status" });
        const updatedData = handler.read().find((row) => row.id === createdData.id);

        expect(updatedData.description).toEqual("new description");
        expect(updatedData.status).toEqual("random status");
    });

    test('updating non-existing task will throw exception', () => {
        const handler = new DataHandler(testFilePath);
        handler.flush();

        expect(() => {
            new Model(handler).updateTaskById(1, { description: "new description", status: "random status" })
        }).toThrow(Error);
    });

    test('if task description is updated, updated time is recorded', () => {
        const handler = new DataHandler(testFilePath);
        handler.flush();

        new Model(handler).createNewTask("new task");
        const createdData = handler.read().find((row) => row.description == "new task");

        expect(createdData.updatedAt).toBeUndefined();

        new Model(handler).updateTaskById(createdData.id, { description: "new description", status: "random status" });
        const updatedData = handler.read().find((row) => row.id === createdData.id);

        expect(updatedData.updatedAt).toBeDefined();
    });
})