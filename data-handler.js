import fs from 'fs';
const filePath = './data.json';
const encoding = "utf8"

export function read() {
    if (fs.existsSync(filePath)) {
        return JSON.parse(fs.readFileSync(filePath, encoding));
    }

    return [];
}

export function write(data) {
    fs.writeFileSync(filePath, JSON.stringify(data), encoding);
}

export function append(newData) {
    const oldData = read();

    const data = [...oldData, ...[newData]];

    write(data);
}