/**
 * Object holding properties related to CLI action
 * @abstract
 */
export class CLIAction {

    /**
     * Property to hold command pattern
     *
     * @abstract
     */
    commandPattern = '';

    /**
     * Property to hold helper text
     *
     * @abstract
     */
    helperText = '';
   
    /**
     * Property to hold description
     *
     * @abstract
     */
    description = '';

    /**
    * Method to validate a CLI action
    *
    * @abstract
    * @returns {Boolean} response wether validation is successful or not
    */
    validate() {
        return false;
    }

    /**
    * Method to hold executable codes
    *
    * @abstract
    */
    execute() {
        // 
    }

    /**
    * Method to set success message for CLI
    *
    * @abstract
    * 
    * @prop {string} message Success message 
    */
    setSuccess(message) {
        this.successMessage = message;
    }

    /**
    * Method to set error message for CLI
    *
    * @abstract
    * 
    * @prop {string} message error message 
    */
    setError(message) {
        this.errorMessage = message;
    }
}