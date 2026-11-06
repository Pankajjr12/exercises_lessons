const express = require("express");

const router = express.Router();

const {
    createEmployee,
    getEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
} = require("../controllers/employeeController");


// CREATE
router.post("/", createEmployee);

// GET ALL
router.get("/", getEmployees);

// GET BY ID
router.get("/:id", getEmployeeById);

// UPDATE
router.put("/:id", updateEmployee);

// DELETE
router.delete("/:id", deleteEmployee);


module.exports = router;