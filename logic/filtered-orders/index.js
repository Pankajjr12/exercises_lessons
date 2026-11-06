const products = require("../data/orders");

const orders = require("./data/orders");

// Filter Orders Function
function filterOrders(orders, search, status, category) {

    // Convert search text to lowercase
    search = search.toLowerCase().trim();

    // Filter orders
    const filteredOrders = orders.filter((order) => {

        // 1. Search by customer name or email
        const searchMatch =
            search === "" ||
            order.customerName.toLowerCase().includes(search) ||
            order.email.toLowerCase().includes(search);

        // 2. Filter by status
        const statusMatch =
            status === "All" || order.status === status;

        // 3. Filter by category
        const categoryMatch =
            category === "All" || order.category === category;

        // Return orders matching all conditions
        return searchMatch && statusMatch && categoryMatch;
    });

    return filteredOrders;
}


// Test the function
const result = filterOrders(
    orders,
    "",
    "Pending",
    "All"
);

// Print result
console.log(result);