const express = require('express');
const router = express.Router();
const mysqlconn = require("../database");

router.get("/", (req, res) => {
    mysqlconn.query("SELECT * FROM employees", (err, rows, fields) => {
        err ? console.log(err) : res.json(rows);
    });
});

router.get("/:id", (req, res) => {
    //req.params contiene los campos de enviados
    const { id } = req.params;
    const query = "SELECT * FROM employees WHERE id = ?";
    mysqlconn.query(query, [id], (err, rows, fields) => {
        err ? console.log(err) : res.json(rows[0]);
    });
});

router.post("/", (req, res) => {
    const { id, name, salary } = req.body;
    const query = `
        CALL addOrEditEmployee(?,?,?);
    `;
    mysqlconn.query(query, [id, name, salary], (err, rows, fields) => {
        err ? console.log(err) : res.json({ Status: 'Empleado guardado' });
    });
});

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { name, salary } = req.body;
    const query = `
        CALL addOrEditEmployee(?,?,?);
    `;
    mysqlconn.query(query, [id, name, salary], (err, rows, fields) => {
        err ? console.log(err) : res.json({ Status: 'Empleado editado' });
    });
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const query = "CALL deleteEmployee(?);";
    mysqlconn.query(query, [id], (err, rows, fields) => {
        err ? console.log(err) : res.json({ Status: 'Empleado eliminado' });
    });
})

module.exports = router;