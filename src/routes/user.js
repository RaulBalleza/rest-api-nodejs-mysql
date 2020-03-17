const express = require('express');
const router = express.Router();
const mysqlconn = require("../database");

//Crear nuevo usuario

//Obtener TODOS los usuarios
router.get("/users", (req, res) => {
    const query = `
        CALL getAllUsers();
    `;
    mysqlconn.query(query, (err, rows, fields) => {
        err ? console.log(err) : res.json(rows[0]);
    });
});

//Obtener UN usuario
router.get("/user/:id", (req, res) => {
    //req.params contiene los campos de enviados
    const { id } = req.params;
    const query = `
    CALL getUser(?);
    `;
    mysqlconn.query(query, [id], (err, rows, fields) => {
        err ? console.log(err) : res.json(rows[0]);
    });
});

//Actualizar datos de un usuario
router.put("/user/:id", (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email } = req.body;
    const query = `
        CALL updateUserDetails(?,?,?,?);
    `;
    mysqlconn.query(query, [id, first_name, last_name, email], (err, rows, fields) => {
        err ? console.log(err) : res.json({ Status: 'Usuario editado' });
    });
});

//Actualizar constraseña de un usuario
router.put("/user/:id/password", (req, res) => {
    const { id } = req.params;
    const { password } = req.body;
    const query = `
        CALL updateUserPassword(?,?);
    `;
    mysqlconn.query(query, [id, password], (err, rows, fields) => {
        err ? console.log(err) : res.json({ Status: 'Contraseña del usuario editada' });
    });
});


//Eliminar usuario
router.delete("/user/:id", (req, res) => {
    const { id } = req.params;
    const query = "CALL deleteUser(?);";
    mysqlconn.query(query, [id], (err, rows, fields) => {
        err ? console.log(err) : res.json({ Status: 'Usuario eliminado' });
    });
})

//Inscribir usuario a la clase

module.exports = router;