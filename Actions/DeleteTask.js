import { CLIAction } from "../Lib/CLIAction.js";
import { deleteTaskById } from "../model.js";

/**
 * Class related to deleting task with CLI
 * @inheritdoc
 */
export class DeleteTask extends CLIAction {

    constructor(id) {
        super();

        this.commandPattern = "npm run task-cli delete <task_id>"
        this.helperText = "This action is used to delete an existing task"

        this.taskId = Number(id);
    }

    validate() {
        return Boolean(this.taskId);
    }

    execute() {
        deleteTaskById(this.taskId);

        this.setSuccess("Successfully deleted task")
    }
}