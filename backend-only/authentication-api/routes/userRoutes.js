const express = require("express");

const router = express.Router();

const {
    register,
    login
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

// Register
router.post("/register", register);

// Login
router.post("/login", login);

// Protected route
router.get("/profile", protect, (req, res) => {
    res.status(200).json({
        message: "Welcome! You accessed protected route",
        user: req.user
    });
});

module.exports = router;