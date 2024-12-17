import { read, write } from "./data-handler.js";

let data = read();

data = [{ "id": "1", "title": "Some name", "in_progress": false, "is_completed": false }];

write(data);