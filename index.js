import { CreateTask } from "./Actions/CreateTask.js";
import { DeleteTask } from "./Actions/DeleteTask.js";
import { ListTasks } from "./Actions/ListsTasks.js";
import { MarkDone } from "./Actions/MarkDone.js";
import { MarkInProgress } from "./Actions/MarkInProgress.js";
import { UpdateTask } from "./Actions/UpdateTask.js";
import { CLIBuilder } from "./Lib/CLIBuilder.js";

const cliBuilder = CLIBuilder.make()
    .setHelperText("Welcome to task tracker cli.")
    .setCommandPattern("npm run task-cli <action> <?params...>")
    .append("add", new CreateTask(process.argv[3]))
    .append("list", new ListTasks(process.argv[3]))
    .append("update", new UpdateTask(process.argv[3], process.argv[4]))
    .append("delete", new DeleteTask(process.argv[3]))
    .append("mark-in-progress", new MarkInProgress(process.argv[3]))
    .append("mark-done", new MarkDone(process.argv[3]))

function showHelpSummary() {
    console.log(cliBuilder.helperText, "\n")
    console.log("Pattern:", cliBuilder.commandPattern, "\n")
    console.log("Actions:")
    console.table(cliBuilder.getAvailableActions())
}

var status = false;

const hasActionArgument = Boolean(process.argv[2]);

status = cliBuilder.executeAction(process.argv[2]);

if (!hasActionArgument || !status) {
    showHelpSummary();
}