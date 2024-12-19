import { append, read, write } from "./data-handler.js";

export function getNewId() {
    const data = read();

    if (data.length === 0) {
        return 1;
    }

    const allIds = data.map((row) => row.id ?? 0);

    return (Math.max(...allIds) ?? 0) + 1;
}

export function getAllTasks(status) {
    const data = read();

    return data
        // list by status if status is provided else list all
        .filter((row) => Boolean(status) ? row.status === status : true)
        // formatted time data
        .map((row) => {
            return {
                ...row, ...{
                    createdAt: new Date(row.createdAt).toUTCString(),
                    updatedAt: row.updatedAt ? new Date(row.updatedAt).toUTCString() : null,
                }
            }
        })
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

export function getTaskById(id) {
    const data = read();

    return data.find((row) => row.id === id);
}

export function updateTaskById(id, taskDescription) {
    const data = read();

    const selectedTask = getTaskById(id);

    if (!selectedTask) {
        throw new Error("The selected task does not exist");
    }

    selectedTask.description = taskDescription;
    selectedTask.updatedAt = Date.now();

    const tasksExceptSelectedTask = data.filter((row) => row.id !== id);

    write([...tasksExceptSelectedTask, ...[selectedTask]]);
}

export function updateTaskStatusById(id, status) {
    const data = read();

    const selectedTask = getTaskById(id);

    if (!selectedTask) {
        throw new Error("The selected task does not exist");
    }

    selectedTask.status = status;
    selectedTask.updatedAt = Date.now();

    const tasksExceptSelectedTask = data.filter((row) => row.id !== id);

    write([...tasksExceptSelectedTask, ...[selectedTask]]);
}

export function deleteTaskById(id) {
    const data = read();

    const selectedTask = getTaskById(id);

    if (!selectedTask) {
        throw new Error("The selected task does not exist");
    }

    const remainingTasks = data.filter((row) => row.id !== id);

    return write(remainingTasks);
}