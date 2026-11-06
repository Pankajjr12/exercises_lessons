
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/orders", require("./routes/orderRoutes"));

// Error handling
app.use((err, req, res, next) => {
    console.log(err);

    res.status(err.status || 500).json({
        message: err.message || "Server error"
    });
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("MongoDB Connected");

        app.listen(5000, () => {
            console.log("Server running on port 5000");
        });
    })
    .catch((err) => {
        console.log("Database error:", err);
    });
