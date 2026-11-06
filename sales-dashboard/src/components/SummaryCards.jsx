function SummaryCards({ sales }) {

    const totalRevenue = sales
      .filter(item => item.status === "Completed")
      .reduce((total, item) => total + item.amount, 0);
  
    const totalOrders = sales.length;
  
    const completedOrders = sales.filter(
      item => item.status === "Completed"
    ).length;
  
    const pendingOrders = sales.filter(
      item => item.status === "Pending"
    ).length;
  
    const cards = [
      {
        title: "Total Revenue",
        value: `₹${totalRevenue.toLocaleString("en-IN")}`,
        icon: "💰"
      },
      {
        title: "Total Orders",
        value: totalOrders,
        icon: "📦"
      },
      {
        title: "Completed Orders",
        value: completedOrders,
        icon: "✅"
      },
      {
        title: "Pending Orders",
        value: pendingOrders,
        icon: "⏳"
      }
    ];
  
    return (
      <div className="summary-grid">
  
        {cards.map((card, index) => (
          <div className="summary-card" key={index}>
  
            <div className="card-icon">
              {card.icon}
            </div>
  
            <h3>{card.title}</h3>
  
            <h2>{card.value}</h2>
  
          </div>
        ))}
  
      </div>
    );
  }
  
  export default SummaryCards;