import fs from 'fs';

/**
 * Structure of task
 * @typedef {{id:number,description:string,status:string,createdAt:number,updatedAt?:number}} Task
 */

/**
 * Class to handle data from json
 */
export default class DataHandler {
    constructor(filePath = "./data.json") {
        this.filePath = filePath;
        this.encoding = "utf8";
    }

    /**
     * Gets data from JSON file
     * @returns {Array<Task>}
     */
    read() {
        if (fs.existsSync(this.filePath)) {
            return JSON.parse(fs.readFileSync(this.filePath, this.encoding));
        }

        return [];
    }

    /**
     * Writes data into the JSON file
     * @param {Array<Task>} data 
     */
    write(data) {
        fs.writeFileSync(this.filePath, JSON.stringify(data), this.encoding);
    }

    /**
     * Append a new task into the JSON file
     * @param {Task} newData 
     */
    append(newData) {
        const oldData = this.read();

        const data = [...oldData, ...[newData]];

        this.write(data);
    }

    /**
     * Clear the json file
     */
    flush(){
        this.write([]);
    }
    
    /**
     * Clear the json file
     * @param {Array<Task>} data collection of tasks to be populated
     */
    setData(data){
        this.write(data);
    }
}