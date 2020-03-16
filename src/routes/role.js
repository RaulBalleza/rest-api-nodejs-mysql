const express = require('express');
const router = express.Router();
const mysqlconn = require("../database");

//Obtener todos los roles
router.get("/roles", (req, res) => {
    const query = `
        CALL getAllRoles();
    `;
    mysqlconn.query(query, (err, rows, fields) => {
        err ? console.log(err) : res.json(rows[0]);
    });
});

module.exports = router;