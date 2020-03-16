const express = require('express');
const router = express.Router();
const mysqlconn = require("../database");

//Crear nueva tarea

//Obtener todas las tareas
router.get("/tasks", (req, res) => {
    const query = `
        CALL getAllTasks();
    `;
    mysqlconn.query(query, (err, rows, fields) => {
        err ? console.log(err) : res.json(rows[0]);
    });
});

//Obtener una tarea
router.get("/task/:id", (req, res) => {
    const { id } = req.params;
    const query = `
    CALL getTask(?);
    `;
    mysqlconn.query(query, [id], (err, rows, fields) => {
        err ? console.log(err) : res.json(rows[0]);
    });
});


//Actualizar tarea
router.put("/task/:id", (req, res) => {
    const { id } = req.params;
    const { title, description, value, due_date, file } = req.body;
    const query = `
        CALL updateTask(?,?,?,?,?,?);
    `;
    mysqlconn.query(query, [id, title, description, value, due_date, file], (err, rows, fields) => {
        err ? console.log(err) : res.json({ Status: 'Detalles de la tarea editados' });
    });
});


//Eliminar tarea
router.delete("/task/:id", (req, res) => {
    const { id } = req.params;
    const query = "CALL deleteTask(?);";
    mysqlconn.query(query, [id], (err, rows, fields) => {
        err ? console.log(err) : res.json({ Status: 'Tarea eliminada' });
    });
})
module.exports = router;