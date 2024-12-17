import { createNewTask, updateTaskById } from "./model.js";

try {
    // 2nd argument is action
    switch (process.argv[2]) {
        case "add":
            // 3rd argument for 'add' action is task description
            createNewTask(process.argv[3]);
            break;

        case "update":
            // 3rd argument for 'update' action is id and 4th is new description
            const id = process.argv[3];
            const newDescription = process.argv[4];


            updateTaskById(id, newDescription);
            break;

        default:
            console.log("Command not found")

            break;
    }
} catch (error) {
    console.log(error)
}