import DataHandler from "./DataHandler.js";

/**
 * Class containing methods supporting repository pattern to store data
 */
export default class Model {

    /**
     * 
     * @param {DataHandler} dataHandler 
     */
    constructor(dataHandler = null) {
        this.dataHandler = dataHandler ?? new DataHandler()
    }

    /**
     * Get latest ID from database
     * @returns {number}
     */
    getNewId() {
        const data = this.dataHandler.read();

        if (data.length === 0) {
            return 1;
        }

        const allIds = data.map((row) => row.id ?? 0);

        return (Math.max(...allIds) ?? 0) + 1;
    }

    /**
     * Structure of formatted task
     * @typedef {{id:number,description:string,status:string,createdAt:string,updatedAt:string|null}} FormattedTask
     */

    /**
     * Get all formatted tasks
     * @param {string} status 
     * @returns {Array<FormattedTask>}
     */
    getAllTasks(status) {
        const data = this.dataHandler.read();

        return data
            // list by status if status is provided else list all
            .filter((row) => Boolean(status) ? row.status === status : true)
            // formatted time data
            .map((row) => {
                return {
                    ...row, ...{
                        createdAt: new Date(row.createdAt).toUTCString(),
                        updatedAt: row.updatedAt ? new Date(row.updatedAt).toUTCString() : null,
                    }
                }
            })
    }

    /**
     * Create a new task
     * @param {string} taskDescription 
     */
    createNewTask(taskDescription) {
        this.dataHandler.append(
            {
                id: this.getNewId(),
                description: taskDescription,
                status: "todo",
                createdAt: Date.now()
            }
        );
    }

    /**
     * Retrieve a task by its id
     * @param {number} id 
     * @returns {import("./DataHandler.js").Task}
     */
    getTaskById(id) {
        const data = this.dataHandler.read();

        return data.find((row) => row.id === id);
    }

    /**
     * Update task details by its id
     * @param {number} id 
     * @param {{description?:string,status?:string}} updatingDetail 
     */
    updateTaskById(id, updatingDetail) {
        const selectedTask = this.getTaskById(id);

        if (!selectedTask) {
            throw new Error("The selected task does not exist");
        }

        if (updatingDetail.description) {
            selectedTask.description = updatingDetail.description;
        }
        
        if (updatingDetail.status) {
            selectedTask.status = updatingDetail.status;
        }

        selectedTask.updatedAt = Date.now();

        this.deleteTaskById(selectedTask.id)

        this.dataHandler.write([...this.dataHandler.read(), ...[selectedTask]]);
    }

    /**
     * Delete a task by its id
     * @param {number} id 
     */
    deleteTaskById(id) {
        const data = this.dataHandler.read();

        const selectedTask = this.getTaskById(id);

        if (!selectedTask) {
            throw new Error("The selected task does not exist");
        }

        const remainingTasks = data.filter((row) => row.id !== id);

        this.dataHandler.write(remainingTasks);
    }
}
