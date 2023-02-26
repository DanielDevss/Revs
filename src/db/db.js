const mysql = require('mysql2');
require('dotenv').config();

let conn = mysql.createConnection({
    host        :   process.env.HOST_DB,
    database    :   process.env.NAME_DB,
    user        :   process.env.USER_DB,
    password    :   process.env.PASS_DB,
});

conn.connect(function (err) {
    if(err){
        console.log(`Error database: ${err.stack}`);
        return;
    }
    console.log(`Database connect success`);
});




module.exports = conn;