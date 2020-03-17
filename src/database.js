const mysql = require("mysql");
const mysqlconn = mysql.createConnection({
    host: "localhost",
    user: "laravel",
    password: "laravel_saas",
    database: "classroom_test",
});

mysqlconn.connect((err) => { err ? console.log(err) : console.log("Database connected"); });

module.exports= mysqlconn;
