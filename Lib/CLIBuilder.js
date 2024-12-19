import { showHelpText } from "./Helper.js";

export class CLIBuilder {

    /**
     * An array of actions
     * @type {Array<{command: string, action: CLIAction}>}
     */
    actions = [];

    static make() {
        return new CLIBuilder();
    }

    /**
     * Method to set command pattern with builder instance
     * @param {string} commandPattern 
     * @returns {CLIBuilder}
     */
    setCommandPattern(commandPattern) {
        this.commandPattern = commandPattern;

        return this;
    }

    /**
     * Method to set helper text with builder instance
     * @param {string} commandPattern 
     * @returns {CLIBuilder}
     */
    setHelperText(helperText) {
        this.helperText = helperText;

        return this;
    }

    /**
     * Append a CLIAction object to the CLIBuilder
     * @param {string} command 
     * @param {CLIAction} cliAction 
     * 
     * @returns {CLIBuilder}
     */
    append(command, cliAction) {
        this.actions.push({
            command,
            action: cliAction
        });

        return this;
    }

    /**
     * Get all available commands to show
     * @returns {JSON}
     */
    getAvailableActions() {
        const actions = this.actions.map((action) => {
            return {
                command: action.command,
                description: action.action.helperText
            };
        })

        return actions.reduce((accumulator, { command, ...x }) => {
            accumulator[command] = x;
            return accumulator
        }, {})
    }

    /**
     * 
     * @param {string} argumentAction Current action passed from cli 
     * 
     * @returns {Boolean} status wether the execution is breaking down
     */
    executeAction(argumentAction) {

        const action = this.actions.find((action) => action.command === argumentAction)?.action;

        if (!action) {
            return false;
        }

        if (!action.validate() || showHelpText()) {
            console.log(action.helperText, "\n")
            console.log("Command: ", action.commandPattern)
            console.log(action.description)

            process.exit();
        }

        action.execute();

        if (!action.successMessage && !action.errorMessage) {
            console.log("WARNING: message is not set for", action.constructor.name)
        }

        if (action.successMessage) {
            console.log("SUCCESS:", action.successMessage)
        }

        if (action.errorMessage) {
            console.log("ERROR:", action.errorMessage)

        }

        return true;
    }
}