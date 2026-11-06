
const fs = require("fs");

const readCSV = require("./src/csv");
const readJSON = require("./src/json");
const processData = require("./src/processor");


// 1. Get input format from terminal
const format = process.argv[2] || "json";

let employees;


// 2. Read CSV or JSON
if (format === "xlsx") {

    employees = readCSV();

} else if (format === "json") {

    employees = readJSON();

} else {

    throw new Error("Please use csv or json");

}


// 3. Process data
const result = processData(employees);


// 4. Display results
console.log("\n========== DATA PROCESSING RESULTS ==========");

console.log("\n1. All Employees:");
console.log(employees);

console.log("\n2. Duplicate Records:");
console.log(result.duplicates);

console.log("\n3. Grouped By Category:");
console.log(result.grouped);

console.log("\n4. Total Salary:");
console.log(result.total);

console.log("\n5. Average Salary:");
console.log(result.average);

console.log("\n6. Highest Salary:");
console.log(result.highest);

console.log("\n7. Lowest Salary:");
console.log(result.lowest);

console.log("\n8. Search Employee:");
console.log(result.search);

console.log("\n9. Filtered Employees:");
console.log(result.filtered);

console.log("\n10. Converted Data:");
console.log(result.converted);


// 5. Save converted data into output.json
fs.writeFileSync(
    "output.json",
    JSON.stringify(result.converted, null, 2)
);

console.log("\nOutput saved successfully!");

console.log("\n========== PROCESS COMPLETED ==========");
