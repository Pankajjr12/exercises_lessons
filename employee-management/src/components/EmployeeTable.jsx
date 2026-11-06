function EmployeeTable({ employees, deleteEmployee }) {

    return (
      <div className="table-box">
  
        <h2>Employee List</h2>
  
        <table>
  
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>
  
          <tbody>
  
            {employees.length > 0 ? (
  
              employees.map((emp) => (
  
                <tr key={emp.id}>
  
                  <td>{emp.id}</td>
  
                  <td>{emp.name}</td>
  
                  <td>{emp.email}</td>
  
                  <td>{emp.department}</td>
  
                  <td>₹{emp.salary}</td>
  
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteEmployee(emp.id)}
                    >
                      Delete
                    </button>
                  </td>
  
                </tr>
  
              ))
  
            ) : (
  
              <tr>
                <td colSpan="6">
                  No Employees Found
                </td>
              </tr>
  
            )}
  
          </tbody>
  
        </table>
  
      </div>
    );
  }
  
  export default EmployeeTable;