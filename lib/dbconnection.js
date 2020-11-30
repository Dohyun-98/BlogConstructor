const mysql = require('mysql')

function dbcon (sql){
    const connection = mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : '1234',
        database : 'BlogManagement'
    });

    connection.connect();

    connection.query(sql,(error,row,fields)=>{
        if(error) throw error;
        console.log(row);
        return row;
    });
    connection.end();
}
module.exports = dbcon;