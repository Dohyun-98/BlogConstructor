'use strict';
const express = require('express');
const path = require('path');
const app = express();
const ejs = require('ejs');
const mysql = require('mysql');


const port = process.env.port || 5000;
const ClientPath = path.join(__dirname,'../Client');

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '1234',
    database : 'BlogManagement'
});


app.use(express.static(path.join(ClientPath,'/public')));
app.set('view engine','ejs');



app.get('/',(req,res)=>{
    
    connection.query('select * from mydocument',(err,rows)=>{
        if(err){
            console.log(err);
        }else{
        res.render(path.join(ClientPath,'index.ejs'),{data:rows})
        }
    });  
});

app.get('/member/myinfo' ,(req,res)=>{
    res.render(path.join(ClientPath,'member/myinfo.ejs'))
});
app.get('/member/sign-up-info' ,(req,res)=>{
    res.render(path.join(ClientPath,'member/sign-up-info.ejs'))
});
app.get('/notice/detail' ,(req,res)=>{
    res.render(path.join(ClientPath,'notice/detail.ejs'))
});
app.get('/notice/list' ,(req,res)=>{
    res.render(path.join(ClientPath,'notice/list.ejs'))
});
app.get('/document/detail' ,(req,res)=>{
    res.render(path.join(ClientPath,'document/detail.ejs'))
});
app.get('/document/list' ,(req,res)=>{
    res.render(path.join(ClientPath,'document/list.ejs'))
});


app.listen(port,function(err){
    if(err) console.log(err);
    console.log(`listening on ${port}`);
})


