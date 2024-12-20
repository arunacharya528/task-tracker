import { CLIAction } from "../Lib/CLIAction.js";
import Model from "../Model.js";

/**
 * Class related to marking status of tasks as in-progress
 * @inheritdoc
 */
export class MarkInProgress extends CLIAction {

    constructor(id) {
        super();

        this.commandPattern = "npm run task-cli mark-in-progress <task_id>"
        this.helperText = "This action is used to mark an existing task to be in progress"

        this.taskId = Number(id);
    }

    validate() {
        return Boolean(this.taskId);
    }

    execute() {
        new Model().updateTaskById(this.taskId, { status: 'in-progress' })

        this.setSuccess("Successfully marked a task in-progress")
    }
}