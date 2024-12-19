import DataHandler from "../DataHandler";
import Model from "../Model";

const testFilePath = "test.json";

function populateTestData() {
    const data = [
        {
            "id": 1,
            "description": "new task",
            "status": "todo",
            "createdAt": 1734601336970
        },
        {
            "id": 2,
            "description": "new task",
            "status": "in-progress",
            "createdAt": 1734601336970
        },
        {
            "id": 3,
            "description": "new task",
            "status": "done",
            "createdAt": 1734601336970
        }
    ];

    const handler = new DataHandler(testFilePath);
    handler.flush();
    handler.write(data);
}

describe("List all tasks", () => {
    test('every saved tasks can be retrieved', () => {
        populateTestData();
        
        const handler = new DataHandler(testFilePath);

        const tasks = new Model(handler).getAllTasks();

        expect(tasks.length).toEqual(3);
    });
    
    test('tasks can be retrieved by status', () => {
        populateTestData();

        const handler = new DataHandler(testFilePath);

        const todoTasks = new Model(handler).getAllTasks("todo");
        const inProgressTasks = new Model(handler).getAllTasks("in-progress");
        const doneTasks = new Model(handler).getAllTasks("done");

        expect(todoTasks.length).toEqual(1);
        expect(inProgressTasks.length).toEqual(1);
        expect(doneTasks.length).toEqual(1);
    });
})