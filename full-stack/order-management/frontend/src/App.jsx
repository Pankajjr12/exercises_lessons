
import { useEffect, useState } from "react";
import "./App.css";

const API = "http://localhost:5000/api/orders";

function App() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("All");
    const [category, setCategory] = useState("All");
    const [sort, setSort] = useState("");

    const [page, setPage] = useState(1);

    const limit = 5;

    // GET orders
    const getOrders = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(API);

            if (!response.ok) {
                throw new Error("Failed to fetch orders");
            }

            const data = await response.json();

            setOrders(data);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getOrders();
    }, []);

    // UPDATE STATUS
    const updateStatus = async (id, newStatus) => {
        try {
            const response = await fetch(
                `${API}/${id}/status`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        status: newStatus
                    })
                }
            );

            if (!response.ok) {
                throw new Error("Status update failed");
            }

            const updatedOrder = await response.json();

            setOrders(prev =>
                prev.map(order =>
                    order.id === id ? updatedOrder : order
                )
            );

        } catch (err) {
            alert(err.message);
        }
    };

    // DELETE ORDER
    const deleteOrder = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this order?"
        );

        if (!confirmDelete) return;

        try {
            const response = await fetch(
                `${API}/${id}`,
                {
                    method: "DELETE"
                }
            );

            if (!response.ok) {
                throw new Error("Delete failed");
            }

            setOrders(prev =>
                prev.filter(order => order.id !== id)
            );

        } catch (err) {
            alert(err.message);
        }
    };

    // SEARCH
    let filteredOrders = orders.filter(order => {
        return (
            order.customer.toLowerCase().includes(search.toLowerCase()) ||
            order.email.toLowerCase().includes(search.toLowerCase())
        );
    });

    // STATUS FILTER
    if (status !== "All") {
        filteredOrders = filteredOrders.filter(
            order => order.status === status
        );
    }

    // CATEGORY FILTER
    if (category !== "All") {
        filteredOrders = filteredOrders.filter(
            order => order.category === category
        );
    }

    // SORTING
    if (sort === "low") {
        filteredOrders.sort((a, b) => a.amount - b.amount);
    }

    if (sort === "high") {
        filteredOrders.sort((a, b) => b.amount - a.amount);
    }

    // PAGINATION
    const totalPages = Math.ceil(
        filteredOrders.length / limit
    );

    const startIndex = (page - 1) * limit;

    const currentOrders = filteredOrders.slice(
        startIndex,
        startIndex + limit
    );

    // DASHBOARD
    const totalRevenue = orders.reduce(
        (total, order) => total + order.amount,
        0
    );

    return (
        <div className="container">

            <h1>Order Management Dashboard</h1>

            {/* DASHBOARD */}
            <div className="dashboard">

                <div className="card">
                    <h3>Total Orders</h3>
                    <h2>{orders.length}</h2>
                </div>

                <div className="card">
                    <h3>Total Revenue</h3>
                    <h2>₹{totalRevenue.toLocaleString("en-IN")}</h2>
                </div>

            </div>

            {/* SEARCH AND FILTER */}
            <div className="filters">

                <input
                    type="text"
                    placeholder="Search customer or email"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                />

                <select
                    value={status}
                    onChange={(e) => {
                        setStatus(e.target.value);
                        setPage(1);
                    }}
                >
                    <option value="All">All Status</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Pending">Pending</option>
                    <option value="Cancelled">Cancelled</option>
                </select>

                <select
                    value={category}
                    onChange={(e) => {
                        setCategory(e.target.value);
                        setPage(1);
                    }}
                >
                    <option value="All">All Categories</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Fashion">Fashion</option>
                </select>

                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="">Sort Amount</option>
                    <option value="low">Low to High</option>
                    <option value="high">High to Low</option>
                </select>

            </div>

            {/* LOADING */}
            {loading && <h3>Loading orders...</h3>}

            {/* ERROR */}
            {!loading && error && (
                <div className="error">
                    {error}
                    <button onClick={getOrders}>Retry</button>
                </div>
            )}

            {/* ORDER TABLE */}
            {!loading && !error && (
                <>
                    {currentOrders.length === 0 ? (
                        <h3>No orders found</h3>
                    ) : (

                        <div className="table-container">

                            <table>

                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Customer</th>
                                        <th>Email</th>
                                        <th>Product</th>
                                        <th>Category</th>
                                        <th>Amount</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {currentOrders.map(order => (

                                        <tr key={order.id}>

                                            <td>{order.id}</td>

                                            <td>{order.customer}</td>

                                            <td>{order.email}</td>

                                            <td>{order.product}</td>

                                            <td>{order.category}</td>

                                            <td>
                                                ₹{order.amount.toLocaleString("en-IN")}
                                            </td>

                                            <td>{order.date}</td>

                                            <td>
                                                <select
                                                    value={order.status}
                                                    onChange={(e) =>
                                                        updateStatus(
                                                            order.id,
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option value="Delivered">
                                                        Delivered
                                                    </option>

                                                    <option value="Pending">
                                                        Pending
                                                    </option>

                                                    <option value="Cancelled">
                                                        Cancelled
                                                    </option>

                                                </select>
                                            </td>

                                            <td>
                                                <button
                                                    className="delete-btn"
                                                    onClick={() =>
                                                        deleteOrder(order.id)
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>
                    )}

                    {/* PAGINATION */}
                    {totalPages > 0 && (
                        <div className="pagination">

                            <button
                                disabled={page === 1}
                                onClick={() => setPage(page - 1)}
                            >
                                Previous
                            </button>

                            <span>
                                Page {page} of {totalPages}
                            </span>

                            <button
                                disabled={page === totalPages}
                                onClick={() => setPage(page + 1)}
                            >
                                Next
                            </button>

                        </div>
                    )}

                </>
            )}

        </div>
    );
}

export default App;
