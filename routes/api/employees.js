const express = require('express');
const router = express.Router();

/*
const path = require('path');
const data = {};
data.employees = require('../../data/employees.json');

router.route('/')
.get((req, res)=>{
    res.json(data.employees);
})
.post((req, res)=>{
    res.json({
        "firstname":req.body.firstname,
        "lastname":req.body.lastname,
    });
})
.put((req, res)=>{
    res.json({
        "firstname":req.body.firstname,
        "lastname":req.body.lastname,
    });
})
.delete((req, res)=>{
    res.json({"id":req.body.id});
})

router.route('/:id')
.get((req, res)=>{
    res.join({"id":req.params.id});
})
*/
const employeesController = require('../../controllers/employeesController');

router.route('/')
.get(employeesController.getAllEmployees)
.post(employeesController.getEmployee)
.put(employeesController.updateEmployee)
.delete(employeesController.deleteEmployee);

router.route('/:id')
.get(employeesController.getEmployee);

module.exports = router;