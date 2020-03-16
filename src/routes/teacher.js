const express = require('express');
const router = express.Router();
const mysqlconn = require("../database");

//Obtener TODOS los maestros
router.get("/teachers", (req, res) => {
    const query = `
        CALL getAllTeachers();
    `;
    mysqlconn.query(query, (err, rows, fields) => {
        err ? console.log(err) : res.json(rows[0]);
    });
});

//Obtener clases de un maestro
router.get("/teacher/:id/classes", (req, res) => {
    //req.params contiene los campos de enviados
    const { id } = req.params;
    const query = `
    CALL getAllTeacherClasses(?);
    `;
    mysqlconn.query(query, [id], (err, rows, fields) => {
        err ? console.log(err) : res.json(rows[0]);
    });
});

//Obtener UN maestro
router.get("/teacher/:id", (req, res) => {
    //req.params contiene los campos de enviados
    const { id } = req.params;
    const query = `
    CALL getTeacher(?);
    `;
    mysqlconn.query(query, [id], (err, rows, fields) => {
        err ? console.log(err) : res.json(rows[0]);
    });
});



module.exports = router;