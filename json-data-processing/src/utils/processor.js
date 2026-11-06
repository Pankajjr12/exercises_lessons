
function processData(employees) {

    // 1. Find duplicate records
    const seen = new Set();

    const duplicates = employees.filter(emp => {

        const key = `${emp.name}-${emp.salary}`;

        if (seen.has(key)) {
            return true;
        }

        seen.add(key);

        return false;
    });


    // 2. Group employees by category
    const grouped = employees.reduce((result, emp) => {

        if (!result[emp.category]) {
            result[emp.category] = [];
        }

        result[emp.category].push(emp);

        return result;

    }, {});


    // 3. Calculate total salary
    const total = employees.reduce((sum, emp) => {

        return sum + emp.salary;

    }, 0);


    // 4. Calculate average salary
    const average = employees.length
        ? total / employees.length
        : 0;


    // 5. Find highest salary
    const highest = employees.length
        ? employees.reduce((a, b) =>
            a.salary > b.salary ? a : b
        )
        : null;


    // 6. Find lowest salary
    const lowest = employees.length
        ? employees.reduce((a, b) =>
            a.salary < b.salary ? a : b
        )
        : null;


    // 7. Search employee by name
    const search = employees.find(emp =>

        emp.name.toLowerCase() === "sarah"

    );


    // 8. Filter employees by salary
    const filtered = employees.filter(emp =>

        emp.salary > 45000

    );


    // 9. Convert data into a different structure
    const converted = employees.map(emp => {

        return {
            employeeId: emp.id,
            employeeName: emp.name,
            department: emp.category,
            annualSalary: emp.salary
        };

    });


    // Return all results
    return {

        duplicates,
        grouped,
        total,
        average,
        highest,
        lowest,
        search,
        filtered,
        converted

    };

}

module.exports = processData;
