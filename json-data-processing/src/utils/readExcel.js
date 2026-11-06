
const fs = require("fs");

function readCSV() {

    // Read Excel exported CSV file
    const data = fs.readFileSync(
        "data/employees.xlsx",
        "utf8"
    );

    // Convert CSV text into rows
    const lines = data.trim().split(/\r?\n/);

    // Get column names
    const headers = lines[0].split(",");

    // Convert rows into objects
    const employees = lines.slice(1).map(line => {

        const values = line.split(",");

        const employee = {};

        headers.forEach((header, index) => {
            employee[header.trim()] = values[index].trim();
        });

        employee.id = Number(employee.id);
        employee.salary = Number(employee.salary);

        return employee;
    });

    return employees;
}

module.exports = readCSV;
