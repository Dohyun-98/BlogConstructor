const mysql = require('mysql')

async function dbcon (sql){
    const connection = mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : '1234',
        database : 'BlogManagement'
    });

   await connection.connect();

   await connection.query(sql,(error,row,fields)=>{
        if(error) throw error;
        console.log(row);
        return row;
    });
   await connection.end();
}
module.exports = dbcon;