import mysql from 'mysql2'

let conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "brute",
    port: 3306,
})

export default conn;