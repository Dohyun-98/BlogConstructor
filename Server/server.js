'use strict';
const express = require('express');
const path = require('path');
const app = express();
const dbcon = require('../lib/dbconnection');
const mysql = require('mysql');
const port = process.env.port || 5000;
const ClientPath = path.join(__dirname,'../Client');


app.use(express.static(path.join(ClientPath,'/public')));


app.get('/',(req,res)=>{
   
    res.sendFile(path.join(ClientPath,'/index.html'));
    const title = dbcon('select title from Mydocument');
    const contents = dbcon('select contents from Mydocument');
})




app.listen(port,function(err){
    if(err) console.log(err);
    console.log(`listening on ${port}`);
})