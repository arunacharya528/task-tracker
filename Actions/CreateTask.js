import { CLIAction } from "../Lib/CLIAction.js";
import { createNewTask } from "../model.js";

/**
 * Class related to creating task with CLI
 * @inheritdoc
 */
export class CreateTask extends CLIAction {

    constructor(description) {
        super();

        super.commandPattern = "npm run task-cli add <description of task>"
        super.helperText = "This command is used to add a new task"

        this.taskDescription = description;
    }

    validate() {
        return Boolean(this.taskDescription);
    }

    execute() {
        createNewTask(this.taskDescription);

        this.setSuccess("Successfully created a task");
    }
}