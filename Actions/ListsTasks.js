import { CLIAction } from "../Lib/CLIAction.js";
import Model from "../Model.js";

/**
 * Class related to listing all the tasks with CLI
 * @inheritdoc
 */
export class ListTasks extends CLIAction {

    constructor(status) {
        super();

        super.commandPattern = "npm run task-cli list <?status>"
        super.helperText = "This command is used to list all tasks as well as by status."
        super.description = "\nAvailable statuses:\n1. todo\n2. in-progress\n3. done"

        this.status = status;
    }

    validate() {
        return true;
    }

    execute() {
        const tasks = new Model().getAllTasks(this.status);

        console.table(tasks);

        this.setSuccess("Listed all tasks");
    }
}