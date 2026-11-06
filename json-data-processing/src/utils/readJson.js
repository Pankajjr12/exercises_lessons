const fs = require("fs");

function readJSON() {
    const data = fs.readFileSync(
        "data/employees.json",
        "utf8"
    );

    return JSON.parse(data);
}

module.exports = readJSON;