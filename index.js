import { createNewTask } from "./model.js";

// 2nd argument is action
switch (process.argv[2]) {
    case "add":
        // 3rd argument for 'add' action is task description
        createNewTask(process.argv[3]);

        break;

    default:
        console.log("Command not found")

        break;
}