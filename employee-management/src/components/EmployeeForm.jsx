import { useState } from "react";

function EmployeeForm({ addEmployee }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("IT");
  const [salary, setSalary] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    // Check empty fields
    if (!name || !email || !salary) {
      alert("Please fill all fields");
      return;
    }

    const newEmployee = {
      name: name,
      email: email,
      department: department,
      salary: Number(salary)
    };

    addEmployee(newEmployee);

    // Clear form
    setName("");
    setEmail("");
    setDepartment("IT");
    setSalary("");
  };

  return (
    <div className="form-box">

      <h2>Add New Employee</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Employee Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Employee Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
        </select>

        <input
          type="number"
          placeholder="Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />

        <button type="submit">
          Add Employee
        </button>

      </form>

    </div>
  );
}

export default EmployeeForm;