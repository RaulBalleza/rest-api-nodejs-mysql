const express = require('express');
const router = express.Router();
const mysqlconn = require("../database");

//Crear nueva clase

//Obtener todas las clases
router.get("/classes", (req, res) => {
    const query = `
        CALL getAllClasses();
    `;
    mysqlconn.query(query, (err, rows, fields) => {
        err ? console.log(err) : res.json(rows[0]);
    });
});


//Obtener una clase
router.get("/class/:id", (req, res) => {
    const { id } = req.params;
    const query = `
        CALL getClass(?);
    `;
    mysqlconn.query(query, [id], (err, rows, fields) => {
        err ? console.log(err) : res.json(rows[0]);
    });
});


//Obtener TODOS los post de una clase
router.get("/class/:id/posts", (req, res) => {
    const { id } = req.params;
    const query = `
        CALL getAllClassPosts(?);
    `;
    mysqlconn.query(query, [id], (err, rows, fields) => {
        err ? console.log(err) : res.json(rows[0]);
    });
});

//Obtener TODOS los estudiantes de una clase
router.get("/class/:id/students", (req, res) => {
    const { id } = req.params;
    const query = `
        CALL getAllClassStudents(?);
    `;
    mysqlconn.query(query, [id], (err, rows, fields) => {
        err ? console.log(err) : res.json(rows[0]);
    });
});


//Obtener TODAS las TAREAS de una clase
router.get("/class/:id/tasks", (req, res) => {
    const { id } = req.params;
    const query = `
        CALL getAllClassTasks(?);
    `;
    mysqlconn.query(query, [id], (err, rows, fields) => {
        err ? console.log(err) : res.json(rows[0]);
    });
});

//Obtener maestro de una clase
router.get("/class/:id/teacher", (req, res) => {
    const { id } = req.params;
    const query = `
        CALL getClassTeacher(?);
    `;
    mysqlconn.query(query, [id], (err, rows, fields) => {
        err ? console.log(err) : res.json(rows[0]);
    });
});

//Actualizar clase
router.put("/class/:id", (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const query = `
        CALL updateClass(?,?,?);
    `;
    mysqlconn.query(query, [id, title, description], (err, rows, fields) => {
        err ? console.log(err) : res.json({ Status: 'Datos de la clase editados' });
    });
});

//Eliminar clase
router.delete("/class/:id", (req, res) => {
    const { id } = req.params;
    const query = "CALL deleteClass(?);";
    mysqlconn.query(query, [id], (err, rows, fields) => {
        err ? console.log(err) : res.json({ Status: 'Clase eliminada' });
    });
})


module.exports = router;