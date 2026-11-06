const Employee = require("../models/Employee");

// 1. CREATE EMPLOYEE
const createEmployee = async (req, res) => {
    try {
        const employee = await Employee.create(req.body);

        res.status(201).json({
            message: "Employee created successfully",
            data: employee
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};


// 2. GET ALL EMPLOYEES
const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();

        res.status(200).json({
            data: employees
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// 3. GET EMPLOYEE BY ID
const getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);

        if (!employee) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        res.status(200).json({
            data: employee
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};


// 4. UPDATE EMPLOYEE
const updateEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!employee) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        res.status(200).json({
            message: "Employee updated successfully",
            data: employee
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};


// 5. DELETE EMPLOYEE
const deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);

        if (!employee) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        res.status(200).json({
            message: "Employee deleted successfully"
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};


module.exports = {
    createEmployee,
    getEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
};