const express = require('express');
const router = express.Router();
const mysqlconn = require("../database");

//Obtener todos los estudiantes
router.get("/students", (req, res) => {
    const query = `
        CALL getAllStudents();
    `;
    mysqlconn.query(query, (err, rows, fields) => {
        err ? console.log(err) : res.json(rows[0]);
    });
});


//Obtener todas las clases de un estudiante
router.get("/student/:id/classes", (req, res) => {
    const { id } = req.params;
    const query = `
        CALL getAllStudentClasses(?);
    `;
    mysqlconn.query(query, [id], (err, rows, fields) => {
        err ? console.log(err) : res.json(rows[0]);
    });
});

//Obtener todas las tareas de un estudiante en una clase
router.get("/student/:id/tasks/all/:id_class", (req, res) => {
    const { id, id_class } = req.params;
    const query = `
        CALL getAllStudentTasks(?,?);
    `;
    mysqlconn.query(query, [id, id_class], (err, rows, fields) => {
        err ? console.log(err) : res.json(rows[0]);
    });
});

//Obtener todas las tareas NO ENTREGADAS de un estudiante en una clase
router.get("/student/:id/tasks/not_delivered/:id_class", (req, res) => {
    const { id, id_class } = req.params;
    const query = `
        CALL getNotDeliveredStudentTasks(?,?);
    `;
    mysqlconn.query(query, [id, id_class], (err, rows, fields) => {
        err ? console.log(err) : res.json(rows[0]);
    });
});

//Entregar tarea
router.put("/student/:id/submitTask/:id_post", (req, res) => {
    const { id, id_post } = req.params;
    const { file } = req.body;
    const query = `
        CALL updateStudentTaskStatusToDelivered(?,?,?);
    `;
    mysqlconn.query(query, [id, id_post, file], (err, rows, fields) => {
        err ? console.log(err) : res.json({ Status: 'Tarea entregada' });
    });
});

//Entregar tarea con RETRASO
router.put("/student/:id/submitTaskDelayed/:id_post", (req, res) => {
    const { id, id_post } = req.params;
    const { file } = req.body;
    const query = `
        CALL updateStudentTaskToDeliveredWDelay(?,?,?);
    `;
    mysqlconn.query(query, [id, id_post, file], (err, rows, fields) => {
        err ? console.log(err) : res.json({ Status: 'Tarea entregada con retraso' });
    });
});

//Des-Entregar tarea
router.put("/student/:id/UnsubmitTask/:id_post", (req, res) => {
    const { id, id_post } = req.params;
    const query = `
        CALL updateStudentTaskToNotDelivered(?,?);
    `;
    mysqlconn.query(query, [id, id_post], (err, rows, fields) => {
        err ? console.log(err) : res.json({ Status: 'Tarea desentregada' });
    });
});

//Inscribir estudiante en clase
router.post("/student/:id/class", (req, res) => {
    const { id } = req.params;
    const { code } = req.body;
    const query = `
        CALL addStudentClass(?,?);
    `;
    mysqlconn.query(query, [id, code], (err, rows, fields) => {
        err ? console.log(err) : res.json({ Status: 'Estudiante inscrito en la clase' });
    });
});

module.exports = router;