const express = require('express');
const router = express.Router();
const mysqlconn = require("../database");

//Crear nuevo post

//Obtener todos los post (y tareas)
router.get("/posts", (req, res) => {
    const query = `
        CALL getAllPosts();
    `;
    mysqlconn.query(query, (err, rows, fields) => {
        err ? console.log(err) : res.json(rows[0]);
    });
});


//Obtener un post
router.get("/post/:id", (req, res) => {
    const { id } = req.params;
    const query = `
        CALL getPost(?);
    `;
    mysqlconn.query(query, [id], (err, rows, fields) => {
        err ? console.log(err) : res.json(rows[0]);
    });
});

//Obtener tipos de post
router.get("/post_types", (req, res) => {
    const query = `
        CALL getAllPostTypes();
    `;
    mysqlconn.query(query, (err, rows, fields) => {
        err ? console.log(err) : res.json(rows[0]);
    });
});

//Actualizar post

//Eliminar post
router.delete("/post/:id", (req, res) => {
    const { id } = req.params;
    const query = "CALL deletePost(?);";
    mysqlconn.query(query, [id], (err, rows, fields) => {
        err ? console.log(err) : res.json({ Status: 'Post eliminada' });
    });
})

module.exports = router;