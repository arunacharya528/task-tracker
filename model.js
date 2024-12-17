import { append, read, write } from "./data-handler.js";

export function getNewId() {
    const data = read();

    const allIds = data.map((row) => row.id ?? null);

    return (Math.max(allIds) ?? 0) + 1;
}

export function createNewTask(taskDescription) {
    append(
        {
            id: getNewId(),
            description: taskDescription,
            status: "todo",
            createdAt: Date.now()
        }
    );
}