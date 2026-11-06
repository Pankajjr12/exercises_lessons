import { useState, useEffect } from "react";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeTable from "./components/EmployeeTable";
import "./App.css";

function App() {
  const [employees, setEmployees] = useState([]);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("All");

  const [department, setDepartment] = useState("All");

  const [sortOrder, setSortOrder] = useState("asc");

  // Load employee data from JSON
  useEffect(() => {
    fetch("/employees.json")
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => console.log(error));
  }, []);

  // Add employee
  const addEmployee = (employee) => {
    const newEmployee = {
      ...employee,
      id: Date.now(),
    };

    setEmployees([...employees, newEmployee]);
  };

  // Delete employee
  const deleteEmployee = (id) => {
    const updatedEmployees = employees.filter((emp) => emp.id !== id);

    setEmployees(updatedEmployees);
  };

  // Sort employees by salary
  const sortSalary = () => {
    const sortedEmployees = [...employees].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.salary - b.salary;
      } else {
        return b.salary - a.salary;
      }
    });

    setEmployees(sortedEmployees);

    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Search and filter employees
  const filteredEmployees = employees.filter((emp) => {
    const matchName = emp.name.toLowerCase().includes(search.toLowerCase());

    const matchDepartment =
      department === "All" || emp.department === department;

    const matchStatus = status === "All" || emp.status === status;

    return matchName && matchDepartment && matchStatus;
  });

  return (
    <div className="container">
      <h1>Employee Management Dashboard</h1>

      {/* Employee count */}
      <div className="count-box">Total Employees: {employees.length}</div>

      {/* Add Employee Form */}
      <EmployeeForm addEmployee={addEmployee} />

      {/* Search and Filter */}
      <div className="filter-box">
        <input
          type="text"
          placeholder="Search employee by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="All">All Departments</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
        </select>

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <button onClick={sortSalary}>
          Sort Salary {sortOrder === "asc" ? "↑" : "↓"}
        </button>
      </div>

      {/* Employee Table */}
      <EmployeeTable
        employees={filteredEmployees}
        deleteEmployee={deleteEmployee}
      />
    </div>
  );
}

export default App;
