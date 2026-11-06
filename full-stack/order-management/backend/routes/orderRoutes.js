
const express = require("express");
const router = express.Router();

const Order = require("../models/Order");

// GET all orders
router.get("/", async (req, res, next) => {
    try {
        const orders = await Order.find().sort({ id: 1 });

        res.json(orders);

    } catch (err) {
        next(err);
    }
});


// GET single order
router.get("/:id", async (req, res, next) => {
    try {
        const order = await Order.findOne({
            id: Number(req.params.id)
        });

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        res.json(order);

    } catch (err) {
        next(err);
    }
});


// POST create order
router.post("/", async (req, res, next) => {
    try {
        const order = new Order(req.body);

        const savedOrder = await order.save();

        res.status(201).json(savedOrder);

    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({
                message: "Order ID already exists"
            });
        }

        if (err.name === "ValidationError") {
            return res.status(400).json({
                message: err.message
            });
        }

        next(err);
    }
});


// PUT update complete order
router.put("/:id", async (req, res, next) => {
    try {
        const order = await Order.findOneAndUpdate(
            { id: Number(req.params.id) },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        res.json(order);

    } catch (err) {
        next(err);
    }
});


// PATCH update status
router.patch("/:id/status", async (req, res, next) => {
    try {
        const { status } = req.body;

        if (!["Delivered", "Pending", "Cancelled"].includes(status)) {
            return res.status(400).json({
                message: "Invalid status"
            });
        }

        const order = await Order.findOneAndUpdate(
            { id: Number(req.params.id) },
            { status },
            {
                new: true,
                runValidators: true
            }
        );

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        res.json(order);

    } catch (err) {
        next(err);
    }
});


// DELETE order
router.delete("/:id", async (req, res, next) => {
    try {
        const order = await Order.findOneAndDelete({
            id: Number(req.params.id)
        });

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        res.json({
            message: "Order deleted successfully"
        });

    } catch (err) {
        next(err);
    }
});

module.exports = router;
