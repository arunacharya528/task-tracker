import { createNewTask, deleteTaskById, getAllTasks, updateTaskById, updateTaskStatusById } from "./model.js";

try {
    // 2nd argument is action
    switch (process.argv[2]) {
        case "add":
            // 3rd argument for 'add' action is task description
            createNewTask(process.argv[3]);
            break;

        case "update":
            // 3rd argument for 'update' action is id and 4th is new description
            var id = process.argv[3];
            var newDescription = process.argv[4];


            updateTaskById(id, newDescription);
            break;
        case "delete":
            // 3rd argument for 'delete' action is id
            var id = Number(process.argv[3]);

            deleteTaskById(id);
            break;

        case "list":
            // 3rd argument for 'list' action is status for filtering
            var status = process.argv[3];

            getAllTasks(status);
            break;

        case "mark-in-progress":
            // 3rd argument for "mark-in-progress" action is id
            var status = "in-progress";
            var id = Number(process.argv[3]);

            updateTaskStatusById(id, status);
            break;

        case "mark-done":
            // 3rd argument for  "mark-done" action is id
            var status = "done";
            var id = Number(process.argv[3]);

            updateTaskStatusById(id, status);
            break;

        default:
            console.log("Command not found")

            break;
    }
} catch (error) {
    console.log(error)
}