import { CLIAction } from "../Lib/CLIAction.js";
import { updateTaskStatusById } from "../model.js";

/**
 * Class related to marking status of tasks as done
 * @inheritdoc
 */
export class MarkDone extends CLIAction {

    constructor(id) {
        super();

        this.commandPattern = "npm run task-cli mark-done <task_id>"
        this.helperText = "This action is used to mark an existing task to be done"

        this.taskId = Number(id);
    }

    validate() {
        return Boolean(this.taskId);
    }

    execute() {
        updateTaskStatusById(this.taskId, 'done');

        this.setSuccess("Successfully marked a task done")
    }
}