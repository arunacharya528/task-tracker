import { CLIAction } from "../Lib/CLIAction.js";
import Model from "../Model.js";

/**
 * Class related to updating description of task
 * @inheritdoc
 */
export class UpdateTask extends CLIAction {

    constructor(id, description) {
        super();

        this.commandPattern = "npm run task-cli update <task_id> <description>"
        this.helperText = "This action is used to update description of existing task"

        this.taskId = Number(id);
        this.taskDescription = description;
    }

    validate() {
        return Boolean(this.taskId) && Boolean(this.taskDescription);
    }

    execute() {
        new Model().updateTaskById(this.taskId, { description: this.taskDescription })

        this.setSuccess("Successfully updated task description")
    }
}