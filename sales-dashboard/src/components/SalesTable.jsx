function SalesTable({ sales }) {

    return (
      <div className="table-container">
  
        <table>
  
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
  
          <tbody>
  
            {sales.length > 0 ? (
  
              sales.map((item) => (
  
                <tr key={item.id}>
  
                  <td>{item.id}</td>
  
                  <td>{item.customer}</td>
  
                  <td>{item.product}</td>
  
                  <td>{item.category}</td>
  
                  <td>
                    ₹{item.amount.toLocaleString("en-IN")}
                  </td>
  
                  <td>
                    <span className={`status ${item.status.toLowerCase()}`}>
                      {item.status}
                    </span>
                  </td>
  
                  <td>{item.date}</td>
  
                </tr>
  
              ))
  
            ) : (
  
              <tr>
                <td colSpan="7" className="empty">
                  No transactions found!
                </td>
              </tr>
  
            )}
  
          </tbody>
  
        </table>
  
      </div>
    );
  }
  
  export default SalesTable;