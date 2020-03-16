const mysql = require("mysql");
const mysqlconn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "balleza",
    database: "classroom_test",
});

mysqlconn.connect((err) => { err ? console.log(err) : console.log("Database connected"); });

module.exports= mysqlconn;