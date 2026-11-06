const express = require("express");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Database connection
connectDB();

// Employee routes
app.use("/api/employees", require("./routes/employeeRoutes"));

// Home route
app.get("/", (req, res) => {
    res.send("Employee CRUD API is Running");
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});